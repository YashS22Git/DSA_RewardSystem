// ============================================================
//  DSA QUEST — Authentication & Sync Helper
//  Handles Firebase Auth, redirects, token fetching, & initial sync
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyDk1w3sSHwY5BVkkV6_iX6UxrdQI_EplQM",
  authDomain: "ai-tmp-986a4.firebaseapp.com",
  projectId: "ai-tmp-986a4",
  storageBucket: "ai-tmp-986a4.firebasestorage.app",
  messagingSenderId: "192102360334",
  appId: "1:192102360334:web:5edf30dfe8d38246cd235f",
  measurementId: "G-DD5JXJ0Q0Y"
};

// Initialize Firebase if loaded
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
} else {
  console.error("Firebase SDK not loaded. Ensure Firebase CDN script tags are present.");
}

const Auth = (() => {
  let isInitialized = false;
  let currentUser = null;
  let idToken = null;

  // CSS injection for Loading Overlay
  const style = document.createElement('style');
  style.textContent = `
    .auth-loading-overlay {
      position: fixed;
      inset: 0;
      background: #070b14;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #f1f5f9;
      font-family: 'Inter', sans-serif;
      transition: opacity 0.4s ease, visibility 0.4s ease;
    }
    .auth-loading-overlay.fade-out {
      opacity: 0;
      visibility: hidden;
    }
    .auth-spinner-container {
      position: relative;
      width: 100px;
      height: 100px;
      margin-bottom: 24px;
    }
    .auth-spinner {
      box-sizing: border-box;
      position: absolute;
      width: 100%; height: 100%;
      border: 3px solid transparent;
      border-top-color: #00d4ff;
      border-radius: 50%;
      animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    }
    .auth-spinner-inner {
      box-sizing: border-box;
      position: absolute;
      inset: 12px;
      border: 3px solid transparent;
      border-top-color: #7c3aed;
      border-radius: 50%;
      animation: spin-reverse 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    }
    .auth-spinner-icon {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      animation: pulse-icon 1.5s ease-in-out infinite;
    }
    .auth-loading-text {
      font-family: 'Orbitron', sans-serif;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      background: linear-gradient(135deg, #a855f7, #00d4ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }
    .auth-loading-sub {
      font-size: 13px;
      color: #94a3b8;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes spin-reverse {
      0% { transform: rotate(360deg); }
      100% { transform: rotate(0deg); }
    }
    @keyframes pulse-icon {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(0,212,255,0.4)); }
      50% { transform: scale(1.15); filter: drop-shadow(0 0 15px rgba(124,58,237,0.7)); }
    }
  `;
  document.head.appendChild(style);

  // Loading Overlay DOM Injection
  let overlayEl = null;

  function showLoading(title = "Authenticating...", sub = "Consulting the scrolls of wisdom...") {
    if (!overlayEl) {
      overlayEl = document.createElement('div');
      overlayEl.className = 'auth-loading-overlay';
      overlayEl.innerHTML = `
        <div class="auth-spinner-container">
          <div class="auth-spinner"></div>
          <div class="auth-spinner-inner"></div>
          <div class="auth-spinner-icon">🛡️</div>
        </div>
        <div class="auth-loading-text" id="auth-loading-title">${title}</div>
        <div class="auth-loading-sub" id="auth-loading-sub">${sub}</div>
      `;
      document.body.appendChild(overlayEl);
    } else {
      document.getElementById('auth-loading-title').textContent = title;
      document.getElementById('auth-loading-sub').textContent = sub;
      overlayEl.classList.remove('fade-out');
    }
  }

  function hideLoading() {
    if (overlayEl) {
      overlayEl.classList.add('fade-out');
      // Remove from DOM after transition
      setTimeout(() => {
        if (overlayEl && overlayEl.parentNode) {
          overlayEl.parentNode.removeChild(overlayEl);
          overlayEl = null;
        }
      }, 400);
    }
  }

  // Setup Auth State Listener on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    // Determine page state
    const isLoginPage = window.location.pathname.endsWith('login.html');
    showLoading("Authenticating Warrior...", "Scanning placement database...");

    firebase.auth().onAuthStateChanged(async (user) => {
      currentUser = user;
      isInitialized = true;

      if (user) {
        try {
          idToken = await user.getIdToken();
          
          if (isLoginPage) {
            // Logged in user on login.html -> redirect to dashboard
            window.location.href = "index.html";
            return;
          }

          // Fetch user data from MongoDB via Netlify function
          showLoading("Syncing Quest Logs...", "Downloading your levels, XP, and badges...");
          const res = await fetch('/api/progress', {
            headers: {
              'Authorization': `Bearer ${idToken}`
            }
          });

          if (!res.ok) {
            throw new Error(`Sync error: ${res.statusText}`);
          }

          const cloudData = await res.json();
          if (cloudData) {
            // Write cloud data directly to localStorage as local cache
            localStorage.setItem('dsaquest_profile', JSON.stringify(cloudData.profile));
            localStorage.setItem('dsaquest_progress', JSON.stringify(cloudData.progress || {}));
            localStorage.setItem('dsaquest_badges', JSON.stringify(cloudData.badges || {}));
            localStorage.setItem('dsaquest_streak', JSON.stringify(cloudData.streak));
            localStorage.setItem('dsaquest_heatmap', JSON.stringify(cloudData.heatmap || {}));
            localStorage.setItem('dsaquest_xp_log', JSON.stringify(cloudData.xpLog || {}));
            localStorage.setItem('dsaquest_squad', JSON.stringify(cloudData.squad || null));
          }

          // Trigger custom event to notify engine/pages that data is loaded
          document.dispatchEvent(new CustomEvent('dsaquest_ready', { detail: { user, idToken } }));
          hideLoading();
        } catch (err) {
          console.error("Cloud synchronization failed:", err);
          // Fall back to offline localStorage if sync fails
          document.dispatchEvent(new CustomEvent('dsaquest_ready', { detail: { user, idToken, offline: true } }));
          hideLoading();
        }
      } else {
        // No user logged in
        if (!isLoginPage) {
          window.location.href = "login.html";
        } else {
          hideLoading();
        }
      }
    });
  });

  // API wrappers
  const login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signup = async (email, password, displayName) => {
    const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
    // Set display name in firebase user profile
    await cred.user.updateProfile({ displayName });
    
    // Sync initial profile setup to backend
    const token = await cred.user.getIdToken();
    const initProfile = {
      name: displayName,
      avatar: '⚔️',
      xp: 0,
      level: 1,
      joinedAt: new Date().toISOString()
    };
    
    await fetch('/api/progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ profile: initProfile })
    });
    
    return cred;
  };

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const logout = () => {
    showLoading("Signing Out...", "Saving final quest records...");
    return firebase.auth().signOut().then(() => {
      // Clear localStorage cache on logout
      localStorage.clear();
      window.location.href = "login.html";
    });
  };

  const getToken = async () => {
    if (!currentUser) return null;
    return await currentUser.getIdToken();
  };

  return {
    login,
    signup,
    loginWithGoogle,
    logout,
    getToken,
    getUser: () => currentUser,
    showLoading,
    hideLoading
  };
})();
