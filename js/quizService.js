const COOLDOWN_MS   = 10 * 60 * 1000; // 10 min
const MAX_ATTEMPTS  = 3;
const LOCK_MS       = 24 * 60 * 60 * 1000; // 24 hrs
const KEY = 'dsaquest_quiz_attempts';

const QuizEngine = (() => {

  const getAttempts = () => JSON.parse(localStorage.getItem(KEY) || '{}');
  const saveAttempts = (data) => localStorage.setItem(KEY, JSON.stringify(data));

  function canAttemptQuiz(topicId) {
    const all = getAttempts();
    const record = all[topicId];
    if (!record) return { allowed: true, attemptsLeft: MAX_ATTEMPTS };

    const { count, lastFailed, locked } = record;

    if (locked) {
      const remaining = LOCK_MS - (Date.now() - lastFailed);
      if (remaining > 0) {
        return { allowed: false, reason: 'locked', remainingMs: remaining, attemptsLeft: 0 };
      } else {
        delete all[topicId];
        saveAttempts(all);
        return { allowed: true, attemptsLeft: MAX_ATTEMPTS };
      }
    }

    if (count > 0) {
      const cooldown = COOLDOWN_MS - (Date.now() - lastFailed);
      if (cooldown > 0) {
        return { allowed: false, reason: 'cooldown', remainingMs: cooldown, attemptsLeft: MAX_ATTEMPTS - count };
      }
    }

    return { allowed: true, attemptsLeft: MAX_ATTEMPTS - count };
  }

  function recordFailedAttempt(topicId) {
    const all = getAttempts();
    const prev = all[topicId] || { count: 0 };
    const count = prev.count + 1;

    all[topicId] = {
      count,
      lastFailed: Date.now(),
      locked: count >= MAX_ATTEMPTS
    };

    saveAttempts(all);
    return { attemptsLeft: MAX_ATTEMPTS - count, locked: count >= MAX_ATTEMPTS };
  }

  function recordPass(topicId) {
    const all = getAttempts();
    delete all[topicId];
    saveAttempts(all);
  }

  // Active quiz state
  let currentTopicId = null;
  let questions = [];
  let currentQ = 0;
  let selected = null;
  let answers = [];
  let phase = 'quiz'; // 'quiz' | 'result'
  let score = 0;
  let showExplain = false;
  let onPassCallback = null;
  let topicName = '';
  let topicXp = 0;
  
  let timerInterval = null;

  function initQuiz(topicId, tName, xp, onPass) {
    const category = QUIZ_MAPPING[topicId];
    if (!category || !QUIZ_BANK[category]) {
      // No quiz available, directly pass
      if (onPass) onPass();
      return false; 
    }

    const check = canAttemptQuiz(topicId);
    if (!check.allowed) {
      showCooldownModal(topicId, check);
      return false;
    }

    currentTopicId = topicId;
    topicName = tName;
    topicXp = xp;
    questions = QUIZ_BANK[category];
    currentQ = 0;
    selected = null;
    answers = [];
    phase = 'quiz';
    score = 0;
    showExplain = false;
    onPassCallback = onPass;

    renderQuizModal();
    return true;
  }

  function selectAnswer(idx) {
    if (selected !== null) return;
    selected = idx;
    showExplain = true;
    renderQuizModal();
  }

  function nextQuestion() {
    answers.push(selected);
    showExplain = false;

    if (currentQ + 1 < questions.length) {
      selected = null;
      currentQ++;
    } else {
      score = answers.filter((ans, i) => ans === questions[i].answer).length;
      phase = 'result';
      
      if (score >= 2) {
        recordPass(currentTopicId);
      } else {
        const result = recordFailedAttempt(currentTopicId);
        if (result.locked) {
            // Check handled on next open
        }
      }
    }
    renderQuizModal();
  }

  function resetQuiz() {
    currentQ = 0;
    selected = null;
    answers = [];
    phase = 'quiz';
    score = 0;
    showExplain = false;
    renderQuizModal();
  }

  function closeQuiz() {
    const overlay = document.getElementById('quiz-modal-overlay');
    if (overlay) overlay.style.display = 'none';
    if (timerInterval) clearInterval(timerInterval);
  }

  function renderQuizModal() {
    let overlay = document.getElementById('quiz-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'quiz-modal-overlay';
      overlay.className = 'modal-overlay';
      document.body.appendChild(overlay);
    }
    overlay.style.display = 'flex';

    let contentHtml = '';

    if (phase === 'result') {
      const passed = score >= 2;
      contentHtml = `
        <div class="modal-box">
          <div class="result-icon">${passed ? '🎉' : '😓'}</div>
          <h3>${passed ? 'Quiz Passed!' : 'Quiz Failed'}</h3>
          <p class="score">${score} / ${questions.length} correct</p>
          
          ${passed ? `
            <p class="xp-earned">+${topicXp} XP Earned!</p>
            <button class="btn-primary" id="quiz-claim-btn" style="width: 100%; margin-top: 15px;">Claim Reward 🏆</button>
          ` : `
            <p style="margin-bottom: 20px;">You need 2/3 to pass. Review the topic and try again.</p>
            <button class="btn-secondary" id="quiz-retry-btn" style="width: 100%; margin-bottom: 10px;">Retry Quiz</button>
            <button class="btn-ghost" id="quiz-close-btn" style="width: 100%;">Study More First</button>
          `}
        </div>
      `;
    } else {
      const q = questions[currentQ];
      const progress = ((currentQ) / questions.length) * 100;
      
      let optionsHtml = q.options.map((opt, i) => {
        let cls = 'option-btn';
        if (selected !== null) {
          if (i === q.answer) cls += ' correct';
          else if (i === selected) cls += ' wrong';
          else cls += ' disabled';
        }
        return `
          <button class="${cls}" onclick="QuizEngine.selectAnswer(${i})">
            <span class="option-letter">${['A','B','C','D'][i]}</span>
            ${opt}
          </button>
        `;
      }).join('');

      let explanationHtml = '';
      if (showExplain) {
        const isCorrect = selected === q.answer;
        explanationHtml = `
          <div class="explanation ${isCorrect ? 'correct' : 'wrong'}">
            <strong>${isCorrect ? '✅ Correct!' : '❌ Wrong!'}</strong>
            <p>${q.explanation}</p>
          </div>
        `;
      }

      contentHtml = `
        <div class="modal-box">
          <div class="quiz-header">
            <span class="quiz-topic-label">⚔️ ${topicName}</span>
            <span class="quiz-counter">${currentQ + 1} / ${questions.length}</span>
          </div>
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width: ${progress}%"></div>
          </div>
          <p class="quiz-question">${q.q}</p>
          <div class="quiz-options">
            ${optionsHtml}
          </div>
          ${explanationHtml}
          ${selected !== null ? `
            <button class="btn-primary next-btn" onclick="QuizEngine.nextQuestion()">
              ${currentQ + 1 === questions.length ? 'See Result →' : 'Next →'}
            </button>
          ` : ''}
          <div style="text-align: center; margin-top: 15px;">
             <button class="btn-ghost" onclick="QuizEngine.closeQuiz()">Cancel</button>
          </div>
        </div>
      `;
    }

    overlay.innerHTML = contentHtml;

    if (phase === 'result') {
      const passed = score >= 2;
      if (passed) {
        document.getElementById('quiz-claim-btn').onclick = () => {
          if (onPassCallback) onPassCallback();
          closeQuiz();
        };
      } else {
        document.getElementById('quiz-retry-btn').onclick = resetQuiz;
        document.getElementById('quiz-close-btn').onclick = closeQuiz;
      }
    }
  }

  function showCooldownModal(topicId, check) {
    let overlay = document.getElementById('quiz-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'quiz-modal-overlay';
      overlay.className = 'modal-overlay';
      document.body.appendChild(overlay);
    }
    overlay.style.display = 'flex';
    
    const updateTimerUI = (remainingMs) => {
      const totalSec = Math.ceil(remainingMs / 1000);
      const hrs  = Math.floor(totalSec / 3600);
      const mins = Math.floor((totalSec % 3600) / 60);
      const secs = totalSec % 60;
      let fmt = '';
      if (hrs > 0) fmt = `${hrs}h ${mins}m`;
      else if (mins > 0) fmt = `${mins}m ${secs}s`;
      else fmt = `${secs}s`;
      
      const timeEl = document.getElementById('quiz-cooldown-time');
      if (timeEl) timeEl.innerText = fmt;
    };

    let left = check.remainingMs;

    const render = () => {
      overlay.innerHTML = `
        <div class="modal-box">
          <h3>⚔️ Quiz Locked</h3>
          <div class="cooldown-box" style="margin-top: 15px; margin-bottom: 15px;">
            ${check.reason === 'locked' 
              ? `<p>🔒 Topic locked for 24 hours after 3 failed attempts</p>` 
              : `<p>⏳ Retry available in <strong id="quiz-cooldown-time">...</strong></p>`}
            ${check.attemptsLeft > 0 && check.reason !== 'locked' 
              ? `<p style="margin-top: 5px; color: #888;">${check.attemptsLeft} attempt(s) remaining before 24hr lock</p>` : ''}
          </div>
          <button class="btn-primary" style="width: 100%;" onclick="QuizEngine.closeQuiz()">Close</button>
        </div>
      `;
      if (check.reason !== 'locked') updateTimerUI(left);
    };

    render();

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      left -= 1000;
      if (left <= 0) {
        clearInterval(timerInterval);
        closeQuiz();
      } else {
        updateTimerUI(left);
      }
    }, 1000);
  }

  return {
    canAttemptQuiz,
    initQuiz,
    selectAnswer,
    nextQuestion,
    closeQuiz
  };

})();
