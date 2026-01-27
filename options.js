// Options page script for X Community Note Hider
// Handles settings storage and UI interactions

(function() {
  'use strict';

  // Default settings
  const defaultSettings = {
    enabled: true,
    noteTypeFilter: 'all', // 'all' or 'helpful'
    whitelistedAccounts: [],
    hideProposedNotes: true
  };

  // DOM elements
  const enableExtension = document.getElementById('enableExtension');
  const noteTypeFilter = document.getElementById('noteTypeFilter');
  const hideProposedNotes = document.getElementById('hideProposedNotes');
  const whitelistInput = document.getElementById('whitelistInput');
  const addWhitelistBtn = document.getElementById('addWhitelistBtn');
  const whitelistList = document.getElementById('whitelistList');
  const statusMessage = document.getElementById('statusMessage');

  // Load settings from chrome.storage
  function loadSettings() {
    chrome.storage.sync.get(defaultSettings, (settings) => {
      // Update UI with loaded settings
      enableExtension.checked = settings.enabled;
      noteTypeFilter.value = settings.noteTypeFilter || 'all';
      hideProposedNotes.checked = settings.hideProposedNotes !== false; // Default to true
      updateWhitelistDisplay(settings.whitelistedAccounts || []);
    });
  }

  // Save settings to chrome.storage
  function saveSettings(settings) {
    chrome.storage.sync.set(settings, () => {
      showStatus('Settings saved!', 'success');
      // Content scripts will automatically reload via chrome.storage.onChanged listener
    });
  }

  // Update whitelist display
  function updateWhitelistDisplay(accounts) {
    if (accounts.length === 0) {
      whitelistList.innerHTML = '<div class="empty-state">No whitelisted accounts</div>';
      return;
    }

    whitelistList.innerHTML = accounts.map(account => `
      <div class="whitelist-item">
        <span>@${account}</span>
        <button onclick="removeWhitelist('${account}')">Remove</button>
      </div>
    `).join('');
  }

  // Add account to whitelist
  function addToWhitelist() {
    const username = whitelistInput.value.trim().toLowerCase();
    
    // Remove @ if present
    const cleanUsername = username.replace(/^@/, '');
    
    if (!cleanUsername) {
      showStatus('Please enter a username', 'error');
      return;
    }

    // Validate username (alphanumeric, underscore, 1-15 chars like X)
    if (!/^[a-z0-9_]{1,15}$/i.test(cleanUsername)) {
      showStatus('Invalid username format', 'error');
      return;
    }

    chrome.storage.sync.get(defaultSettings, (settings) => {
      const whitelisted = settings.whitelistedAccounts || [];
      
      if (whitelisted.includes(cleanUsername)) {
        showStatus('Account already whitelisted', 'error');
        return;
      }

      whitelisted.push(cleanUsername);
      saveSettings({whitelistedAccounts: whitelisted});
      whitelistInput.value = '';
      updateWhitelistDisplay(whitelisted);
    });
  }

  // Remove account from whitelist (needs to be global for onclick)
  window.removeWhitelist = function(username) {
    chrome.storage.sync.get(defaultSettings, (settings) => {
      const whitelisted = (settings.whitelistedAccounts || []).filter(acc => acc !== username);
      saveSettings({whitelistedAccounts: whitelisted});
      updateWhitelistDisplay(whitelisted);
    });
  };

  // Show status message
  function showStatus(message, type = 'success') {
    statusMessage.textContent = message;
    statusMessage.className = `status ${type}`;
    
    setTimeout(() => {
      statusMessage.className = 'status';
    }, 3000);
  }

  // Event listeners
  enableExtension.addEventListener('change', (e) => {
    saveSettings({enabled: e.target.checked});
  });

  noteTypeFilter.addEventListener('change', (e) => {
    saveSettings({noteTypeFilter: e.target.value});
  });

  hideProposedNotes.addEventListener('change', (e) => {
    saveSettings({hideProposedNotes: e.target.checked});
  });

  addWhitelistBtn.addEventListener('click', addToWhitelist);

  whitelistInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addToWhitelist();
    }
  });

  // Load settings on page load
  loadSettings();
})();
