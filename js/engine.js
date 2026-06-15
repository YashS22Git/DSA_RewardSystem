// ============================================================
//  DSA QUEST — Gamification Engine
//  Handles: XP, Levels, Streaks, Badges, Progress, Persistence
// ============================================================

const Engine = (() => {

  // =================== STORAGE KEYS ===================
  const KEYS = {
    profile:    'dsaquest_profile',
    progress:   'dsaquest_progress',
    badges:     'dsaquest_badges',
    streak:     'dsaquest_streak',
    heatmap:    'dsaquest_heatmap',
    squad:      'dsaquest_squad',
    squadMembers: 'dsaquest_squad_members',
    xpLog:      'dsaquest_xp_log',       // { date: xp } per day
    speedCheck: 'dsaquest_speed_check',  // for speed_runner badge
  };

  // =================== DEFAULT STATE ===================
  const DEFAULT_PROFILE = {
    name: 'Warrior',
    avatar: '⚔️',
    xp: 0,
    level: 1,
    joinedAt: new Date().toISOString(),
  };

  const DEFAULT_STREAK = {
    current: 0,
    longest: 0,
    lastActive: null,
    milestones: [],   // [3, 7, 30] achieved
  };

  // =================== LOAD / SAVE ===================
  function load(key, def) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : (def !== undefined ? JSON.parse(JSON.stringify(def)) : null);
    } catch { return def !== undefined ? JSON.parse(JSON.stringify(def)) : null; }
  }

  let syncTimeout = null;
  function queueSync() {
    if (typeof Auth === 'undefined' || !Auth.getUser()) return;
    if (syncTimeout) clearTimeout(syncTimeout);
    syncTimeout = setTimeout(async () => {
      try {
        const token = await Auth.getToken();
        if (!token) return;
        
        const payload = {
          profile: getProfile(),
          progress: getProgress(),
          badges: getBadges(),
          streak: getStreak(),
          heatmap: getHeatmap(),
          xpLog: getXpLog(),
        };
        
        await fetch('/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn("Cloud sync error:", err);
      }
    }, 1500);
  }

  function save(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); }
    catch (e) { console.warn('Storage error:', e); }
    queueSync();
  }

  // =================== PROFILE ===================
  function getProfile() { return load(KEYS.profile, DEFAULT_PROFILE); }
  function saveProfile(p) { save(KEYS.profile, p); }

  function updateProfile(updates) {
    const p = getProfile();
    Object.assign(p, updates);
    saveProfile(p);
    return p;
  }

  // =================== PROGRESS ===================
  function getProgress() { return load(KEYS.progress, {}); }

  function isCompleted(subtopicId) {
    return !!getProgress()[subtopicId];
  }

  function getCompletedCount() {
    return Object.keys(getProgress()).length;
  }

  function getCompletedIds() {
    return Object.keys(getProgress());
  }

  // =================== LEVEL SYSTEM ===================
  function getLevelForXP(xp) {
    let current = DSA_DATA.levels[0];
    for (const lvl of DSA_DATA.levels) {
      if (xp >= lvl.minXp) current = lvl;
      else break;
    }
    return current;
  }

  function getNextLevel(xp) {
    const levels = DSA_DATA.levels;
    for (let i = 0; i < levels.length - 1; i++) {
      if (xp < levels[i + 1].minXp) return levels[i + 1];
    }
    return null; // Max level
  }

  function getLevelProgress(xp) {
    const current = getLevelForXP(xp);
    const next = getNextLevel(xp);
    if (!next) return { pct: 100, current, next: null };
    const range = next.minXp - current.minXp;
    const earned = xp - current.minXp;
    return { pct: Math.round((earned / range) * 100), current, next };
  }

  // =================== STREAK ===================
  function getStreak() { return load(KEYS.streak, DEFAULT_STREAK); }

  function _todayStr() {
    return new Date().toISOString().split('T')[0];
  }

  function _yesterdayStr() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  }

  function updateStreak() {
    const streak = getStreak();
    const today = _todayStr();
    const yesterday = _yesterdayStr();

    if (streak.lastActive === today) return streak; // Already counted today

    const wasBreak = streak.lastActive && streak.lastActive !== yesterday;
    const isComeback = wasBreak && streak.current > 0;

    if (wasBreak) {
      // Streak broken
      streak.current = 1;
    } else {
      streak.current += 1;
    }

    streak.longest = Math.max(streak.longest, streak.current);
    streak.lastActive = today;

    save(KEYS.streak, streak);
    return { streak, isComeback, wasBreak };
  }

  function getStreakMilestoneBonusXP(streak) {
    const milestones = [
      { days: 3, xp: 50 },
      { days: 7, xp: 150 },
      { days: 30, xp: 500 },
    ];
    for (const m of milestones) {
      if (streak.current === m.days && !streak.milestones.includes(m.days)) {
        return m;
      }
    }
    return null;
  }

  // =================== HEATMAP ===================
  function getHeatmap() { return load(KEYS.heatmap, {}); }

  function recordHeatmap(count = 1) {
    const hm = getHeatmap();
    const today = _todayStr();
    hm[today] = (hm[today] || 0) + count;
    save(KEYS.heatmap, hm);
  }

  // =================== XP LOG (for speed_runner badge) ===================
  function getXpLog() { return load(KEYS.xpLog, {}); }

  function logXP(amount) {
    const log = getXpLog();
    const today = _todayStr();
    log[today] = (log[today] || 0) + amount;
    save(KEYS.xpLog, log);
  }

  function getXpLast3Days() {
    const log = getXpLog();
    let total = 0;
    for (let i = 0; i < 3; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      total += log[key] || 0;
    }
    return total;
  }

  // =================== BADGES ===================
  function getBadges() { return load(KEYS.badges, {}); }

  function awardBadge(badgeId) {
    const badges = getBadges();
    if (badges[badgeId]) return false; // Already has it
    badges[badgeId] = new Date().toISOString();
    save(KEYS.badges, badges);
    return true;
  }

  function hasBadge(badgeId) {
    return !!getBadges()[badgeId];
  }

  // Compute extra conditions for badge checks
  function computeExtra(profile, streak, completedIds) {
    const progress = getProgress();
    const total = DSA_DATA.totalSubtopics;
    const completed = completedIds.length;
    const hour = new Date().getHours();

    // Chapter completions
    const chapterDone = {};
    for (const ch of DSA_DATA.chapters) {
      const allIds = ch.days_data.flatMap(d => d.subtopics.map(s => s.id));
      chapterDone[ch.id] = allIds.every(id => !!progress[id]);
    }

    return {
      arrays_done:    chapterDone['arrays'],
      strings_done:   chapterDone['strings'],
      graphs_done:    chapterDone['graphs'],
      dp_done:        chapterDone['dynamic_programming'],
      trees_done:     chapterDone['trees'],
      half_done:      completed >= total / 2,
      all_done:       completed >= total,
      speed_runner:   getXpLast3Days() >= 500,
      night_owl:      hour >= 0 && hour < 5,
      early_bird:     hour >= 4 && hour < 7,
      comeback_kid:   false, // handled separately
      mock_slayer:    !!progress['fb_3'],
      perfect_week:   isPerfectWeek(),
      top3:           false, // social feature
      all_badges:     false, // checked after
    };
  }

  function isPerfectWeek() {
    const hm = getHeatmap();
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      if (!hm[key] || hm[key] < 1) return false;
    }
    return true;
  }

  function checkAndAwardBadges(profile, streakData) {
    const badges = getBadges();
    const completedIds = getCompletedIds();
    const completed = completedIds.length;
    const streak = streakData || getStreak();
    const extra = computeExtra(profile, streak, completedIds);

    // Check all_badges
    const nonLegendBadges = DSA_DATA.badges.filter(b => b.id !== 'legend');
    extra.all_badges = nonLegendBadges.every(b => !!badges[b.id]);

    const newlyUnlocked = [];
    for (const badge of DSA_DATA.badges) {
      if (!badges[badge.id]) {
        if (badge.condition(completed, profile.xp, streak.current, extra)) {
          awardBadge(badge.id);
          newlyUnlocked.push(badge);
        }
      }
    }
    return newlyUnlocked;
  }

  // =================== CORE: COMPLETE SUBTOPIC ===================
  function completeSubtopic(subtopicId) {
    const progress = getProgress();
    if (progress[subtopicId]) return null; // Already done

    const subtopic = DSA_DATA.allSubtopics.find(s => s.id === subtopicId);
    if (!subtopic) return null;

    // Record completion
    progress[subtopicId] = new Date().toISOString();
    save(KEYS.progress, progress);

    // Award XP
    const profile = getProfile();
    const prevLevel = getLevelForXP(profile.xp);
    profile.xp += subtopic.xp;
    const newLevel = getLevelForXP(profile.xp);
    profile.level = newLevel.level;
    saveProfile(profile);

    // Log XP (for speed_runner)
    logXP(subtopic.xp);

    // Update heatmap
    recordHeatmap(1);

    // Update streak
    const streakResult = updateStreak();
    const streak = getStreak();

    // Streak milestone bonus XP
    let bonusXP = 0;
    const milestone = getStreakMilestoneBonusXP(streak);
    if (milestone) {
      profile.xp += milestone.xp;
      bonusXP = milestone.xp;
      streak.milestones.push(milestone.days);
      save(KEYS.streak, streak);
      saveProfile(profile);
    }

    // Check badges
    const newBadges = checkAndAwardBadges(profile, streak);

    const leveledUp = newLevel.level > prevLevel.level;

    return {
      subtopic,
      xpEarned: subtopic.xp,
      bonusXP,
      profile,
      streak,
      leveledUp,
      prevLevel,
      newLevel,
      newBadges,
      streakMilestone: milestone,
      isComeback: streakResult?.isComeback || false,
    };
  }

  // Uncomplete a subtopic (for toggling)
  function uncompleteSubtopic(subtopicId) {
    const progress = getProgress();
    if (!progress[subtopicId]) return null;

    const subtopic = DSA_DATA.allSubtopics.find(s => s.id === subtopicId);
    if (!subtopic) return null;

    delete progress[subtopicId];
    save(KEYS.progress, progress);

    // Recalculate stats (heatmap, streak, xpLog, badges, profile) to stay in sync!
    recalculateStats();

    const profile = getProfile();
    return { subtopic, xpRemoved: subtopic.xp, profile };
  }

  // Recalculates streak, heatmap, xpLog and badges based on progress timestamps
  function recalculateStats() {
    const progress = getProgress();
    const dates = Object.values(progress).map(d => d.split('T')[0]);

    // 1. Rebuild Heatmap
    const hm = {};
    dates.forEach(d => {
      hm[d] = (hm[d] || 0) + 1;
    });
    save(KEYS.heatmap, hm);

    // 2. Rebuild XP Log
    const log = {};
    Object.entries(progress).forEach(([subtopicId, timestamp]) => {
      const subtopic = DSA_DATA.allSubtopics.find(s => s.id === subtopicId);
      if (subtopic) {
        const date = timestamp.split('T')[0];
        log[date] = (log[date] || 0) + subtopic.xp;
      }
    });
    save(KEYS.xpLog, log);

    // 3. Rebuild Streak
    const activeDates = Array.from(new Set(dates)).sort();
    const streak = load(KEYS.streak, DEFAULT_STREAK);
    
    if (activeDates.length === 0) {
      streak.current = 0;
      streak.lastActive = null;
      save(KEYS.streak, streak);
    } else {
      function getNextDayStr(dateStr) {
        const d = new Date(dateStr);
        d.setDate(d.getDate() + 1);
        return d.toISOString().split('T')[0];
      }

      let tempStreak = 1;
      let longestStreak = streak.longest || 0;
      longestStreak = Math.max(longestStreak, 1);
      
      for (let i = 1; i < activeDates.length; i++) {
        const prev = activeDates[i-1];
        const curr = activeDates[i];
        if (curr === getNextDayStr(prev)) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
        longestStreak = Math.max(longestStreak, tempStreak);
      }

      const today = _todayStr();
      const yesterday = _yesterdayStr();
      const lastActive = activeDates[activeDates.length - 1];
      let currentStreak = 0;

      if (lastActive === today || lastActive === yesterday) {
        let temp = 1;
        let idx = activeDates.length - 1;
        while (idx > 0) {
          const prev = activeDates[idx - 1];
          const curr = activeDates[idx];
          if (curr === getNextDayStr(prev)) {
            temp++;
            idx--;
          } else {
            break;
          }
        }
        currentStreak = temp;
      }

      streak.current = currentStreak;
      streak.longest = Math.max(longestStreak, streak.current);
      streak.lastActive = lastActive;
      save(KEYS.streak, streak);
    }

    // 4. Rebuild Profile XP and Level
    const profile = getProfile();
    let totalXp = 0;
    Object.keys(progress).forEach(subtopicId => {
      const subtopic = DSA_DATA.allSubtopics.find(s => s.id === subtopicId);
      if (subtopic) {
        totalXp += subtopic.xp;
      }
    });

    // Handle milestones
    const filteredMilestones = [];
    const milestonesList = [
      { days: 3, xp: 50 },
      { days: 7, xp: 150 },
      { days: 30, xp: 500 },
    ];
    let milestoneBonus = 0;
    (streak.milestones || []).forEach(mDay => {
      const m = milestonesList.find(mil => mil.days === mDay);
      if (mDay <= streak.longest) {
        filteredMilestones.push(mDay);
        if (m) milestoneBonus += m.xp;
      }
    });
    streak.milestones = filteredMilestones;
    save(KEYS.streak, streak);

    profile.xp = totalXp + milestoneBonus;
    profile.level = getLevelForXP(profile.xp).level;
    saveProfile(profile);

    // 5. Rebuild Badges
    const badges = getBadges();
    const completedCount = Object.keys(progress).length;
    const extra = computeExtra(profile, streak, Object.keys(progress));

    const updatedBadges = {};
    for (const badge of DSA_DATA.badges) {
      if (badge.id === 'legend') continue;
      
      const isTimeOrSpecialBased = ['night_owl', 'early_bird', 'comeback_kid', 'lb_crusher', 'mock_slayer'].includes(badge.id);
      
      if (badges[badge.id]) {
        if (isTimeOrSpecialBased || badge.condition(completedCount, profile.xp, streak.current, extra)) {
          updatedBadges[badge.id] = badges[badge.id];
        }
      } else {
        if (badge.condition(completedCount, profile.xp, streak.current, extra)) {
          updatedBadges[badge.id] = new Date().toISOString();
        }
      }
    }
    
    // Legend check
    const nonLegendBadges = DSA_DATA.badges.filter(b => b.id !== 'legend');
    extra.all_badges = nonLegendBadges.every(b => !!updatedBadges[b.id]);
    if (badges['legend']) {
      if (extra.all_badges) {
        updatedBadges['legend'] = badges['legend'];
      }
    } else if (extra.all_badges) {
      updatedBadges['legend'] = new Date().toISOString();
    }
    save(KEYS.badges, updatedBadges);
  }

  // =================== CHAPTER PROGRESS ===================
  function getChapterProgress(chapterId) {
    const chapter = DSA_DATA.chapters.find(c => c.id === chapterId);
    if (!chapter) return { done: 0, total: 0, pct: 0 };
    const allIds = chapter.days_data.flatMap(d => d.subtopics.map(s => s.id));
    const progress = getProgress();
    const done = allIds.filter(id => !!progress[id]).length;
    return { done, total: allIds.length, pct: Math.round((done / allIds.length) * 100) };
  }

  // =================== SQUAD ===================
  function getSquad() { return load(KEYS.squad, null); }
  function saveSquad(squad) { save(KEYS.squad, squad); }

  function generateSquadCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }

  function createSquad(name) {
    const squad = { code: generateSquadCode(), name, createdAt: new Date().toISOString() };
    saveSquad(squad);
    return squad;
  }

  function joinSquad(code) {
    const squad = { code: code.toUpperCase(), name: `Squad ${code}`, joinedAt: new Date().toISOString() };
    saveSquad(squad);
    return squad;
  }

  // =================== STATS SUMMARY ===================
  function getSummary() {
    const profile = getProfile();
    const streak = getStreak();
    const progress = getProgress();
    const badges = getBadges();
    const completedCount = Object.keys(progress).length;
    const levelProgress = getLevelProgress(profile.xp);

    return {
      profile,
      streak,
      completedCount,
      totalSubtopics: DSA_DATA.totalSubtopics,
      pctComplete: Math.round((completedCount / DSA_DATA.totalSubtopics) * 100),
      levelProgress,
      badgeCount: Object.keys(badges).length,
      totalBadges: DSA_DATA.badges.length,
    };
  }

  // =================== RESET (dev) ===================
  function reset() {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
  }

  // =================== PUBLIC API ===================
  return {
    getProfile, saveProfile, updateProfile,
    getProgress, isCompleted, getCompletedCount, getCompletedIds,
    getLevelForXP, getNextLevel, getLevelProgress,
    getStreak, updateStreak,
    getHeatmap, recordHeatmap,
    getBadges, hasBadge, awardBadge, checkAndAwardBadges,
    completeSubtopic, uncompleteSubtopic,
    getChapterProgress,
    getSquad, saveSquad, createSquad, joinSquad, generateSquadCode,
    getSummary, reset,
    todayStr: _todayStr,
  };
})();

// =================== TOAST NOTIFICATION SYSTEM ===================
const Toast = {
  show(type, icon, title, msg, duration = 4000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        ${msg ? `<div class="toast-msg">${msg}</div>` : ''}
      </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },
  xp(amount, bonus = 0) {
    this.show('xp', '⚡', `+${amount} XP${bonus ? ' + ' + bonus + ' Bonus!' : ''}`, 'Keep grinding, warrior!');
  },
  badge(badge) {
    this.show('badge', badge.icon, `Badge Unlocked: ${badge.name}`, badge.desc, 5000);
  },
  levelUp(newLevel) {
    this.show('level', '🚀', `LEVEL UP! You're now Level ${newLevel.level}`, newLevel.title, 6000);
  },
  streak(days, bonus = 0) {
    this.show('streak', '🔥', `${days}-Day Streak!`, bonus ? `+${bonus} bonus XP awarded!` : 'Keep it up!');
  },
  info(msg) {
    this.show('xp', 'ℹ️', msg, '', 3000);
  },
};

// =================== LEVEL-UP OVERLAY ===================
const LevelUpOverlay = {
  show(newLevel) {
    let overlay = document.getElementById('levelup-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'levelup-overlay';
      overlay.innerHTML = `
        <div class="levelup-card">
          <div class="levelup-emoji">🚀</div>
          <div class="levelup-title">LEVEL UP!</div>
          <div class="levelup-level" id="levelup-num"></div>
          <div class="levelup-sub" id="levelup-title-text"></div>
          <button class="btn btn-primary btn-lg" style="margin-top:24px" onclick="LevelUpOverlay.hide()">Continue Quest ⚔️</button>
        </div>
      `;
      document.body.appendChild(overlay);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) LevelUpOverlay.hide(); });
    }
    document.getElementById('levelup-num').textContent = `Level ${newLevel.level}`;
    document.getElementById('levelup-title-text').textContent = newLevel.title;
    overlay.classList.add('show');
    // Auto-hide after 8s
    setTimeout(() => LevelUpOverlay.hide(), 8000);
  },
  hide() {
    const overlay = document.getElementById('levelup-overlay');
    if (overlay) overlay.classList.remove('show');
  }
};

// =================== SHARED NAV BUILDER ===================
function buildNav(activePage) {
  const navItems = [
    { id: 'dashboard',   label: 'Dashboard',   icon: '🏠', href: 'index.html' },
    { id: 'roadmap',     label: 'Roadmap',      icon: '🗺️', href: 'roadmap.html' },
    { id: 'leaderboard', label: 'Leaderboard',  icon: '🏆', href: 'leaderboard.html' },
    { id: 'badges',      label: 'Badges',       icon: '🎖️', href: 'badges.html' },
    { id: 'streak',      label: 'Streak',       icon: '🔥', href: 'streak.html' },
    { id: 'profile',     label: 'Profile',      icon: '👤', href: 'profile.html' },
    { id: 'squad',       label: 'Squad',        icon: '⚔️', href: 'squad.html' },
  ];

  const summary = Engine.getSummary();
  const levelColor = summary.levelProgress.current.color;

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon">🗡️</div>
        <div>
          <div class="logo-text">DSA Quest</div>
          <div class="logo-sub">Placement Tracker</div>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-label">Navigation</div>
        ${navItems.map(item => `
          <a href="${item.href}" class="nav-link ${activePage === item.id ? 'active' : ''}">
            <span class="nav-icon">${item.icon}</span>
            ${item.label}
            ${item.id === 'badges' ? `<span class="nav-badge">${summary.badgeCount}</span>` : ''}
          </a>
        `).join('')}
      </nav>
      <div class="sidebar-footer">
        <a href="profile.html" class="sidebar-player-card" style="text-decoration:none">
          <div class="player-avatar">
            ${summary.profile.avatar}
            <div class="online-dot"></div>
          </div>
          <div class="player-info">
            <div class="player-name">${summary.profile.name}</div>
            <div class="player-level" style="color:${levelColor}">Lv.${summary.levelProgress.current.level} ${summary.levelProgress.current.title}</div>
          </div>
        </a>
      </div>
    </aside>
    <!-- Mobile menu button -->
    <button class="mobile-menu-btn" id="mobile-menu-btn" onclick="toggleMobileMenu()">☰</button>
    <!-- Level-up overlay placeholder -->
    <div id="levelup-overlay">
      <div class="levelup-card">
        <div class="levelup-emoji">🚀</div>
        <div class="levelup-title">LEVEL UP!</div>
        <div class="levelup-level" id="levelup-num"></div>
        <div class="levelup-sub" id="levelup-title-text"></div>
        <button class="btn btn-primary btn-lg" style="margin-top:24px" onclick="LevelUpOverlay.hide()">Continue Quest ⚔️</button>
      </div>
    </div>
    <div id="toast-container"></div>
  `;
}

function toggleMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('mobile-open');
}

// =================== DIFFICULTY LABEL ===================
function diffLabel(d) {
  const map = { easy: 'Easy', medium: 'Medium', hard: 'Hard', boss: 'Boss' };
  return map[d] || d;
}

function diffClass(d) {
  const map = { easy: 'difficulty-easy', medium: 'difficulty-medium', hard: 'difficulty-hard', boss: 'difficulty-boss' };
  return map[d] || '';
}
