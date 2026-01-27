// X Community Note Hider Extension
// Automatically hides posts that have community notes

(function() {
  'use strict';

  // ============================================================================
  // Constants
  // ============================================================================
  
  const defaultSettings = {
    enabled: true,
    noteTypeFilter: 'all',
    whitelistedAccounts: [],
    hideProposedNotes: true
  };

  // Timing constants (in milliseconds)
  const TIMING = {
    INITIAL_DELAY: 100,
    FIRST_RECHECK: 500,
    SECOND_RECHECK: 1500,
    MUTATION_DEBOUNCE: 100,
    MUTATION_DELAY: 1000,
    RECHECK_INTERVAL: 2000,
    RECHECK_THRESHOLD: 2000,
    RECHECK_MAX_AGE: 30000,
    PERIODIC_RECHECK: 10000,
    PERIODIC_THRESHOLD: 10000
  };

  // ============================================================================
  // State Management
  // ============================================================================
  
  let settings = {...defaultSettings};
  let settingsLoaded = false;

  // ============================================================================
  // Settings Management
  // ============================================================================
  
  /**
   * Load settings from chrome.storage
   * @returns {Promise<void>}
   */
  function loadSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(defaultSettings, (result) => {
        settings = {...defaultSettings, ...result};
        settingsLoaded = true;
        resolve();
      });
    });
  }

  // Get username from a tweet/article
  function getUsernameFromArticle(article) {
    try {
      // Try to find the username link in the article
      const usernameLink = article.querySelector('a[href*="/"]');
      if (usernameLink) {
        const href = usernameLink.getAttribute('href') || '';
        const match = href.match(/\/([a-z0-9_]{1,15})$/i);
        if (match) {
          return match[1].toLowerCase();
        }
      }
      
      // Alternative: try to get from data-testid="User-Name" area
      const userNameArea = article.querySelector('[data-testid="User-Name"]');
      if (userNameArea) {
        const links = userNameArea.querySelectorAll('a[href*="/"]');
        for (const link of links) {
          const href = link.getAttribute('href') || '';
          const match = href.match(/\/([a-z0-9_]{1,15})$/i);
          if (match) {
            return match[1].toLowerCase();
          }
        }
      }
    } catch (e) {
      // Ignore errors
    }
    return null;
  }

  // Check if account is whitelisted
  function isAccountWhitelisted(article) {
    if (!settings.whitelistedAccounts || settings.whitelistedAccounts.length === 0) {
      return false;
    }
    
    const username = getUsernameFromArticle(article);
    if (!username) {
      return false;
    }
    
    return settings.whitelistedAccounts.includes(username.toLowerCase());
  }

  // ============================================================================
  // Community Note Detection
  // ============================================================================
  
  /**
   * Check if a post has a proposed community note (being voted on)
   * @param {HTMLElement} article - The article element to check
   * @returns {boolean}
   */
  function hasProposedCommunityNote(article) {
    if (!article) return false;

    const articleText = article.textContent || '';
    
    // Priority 1: Check for the presence of both "Helpful" and "Not helpful" buttons
    // This is a strong indicator of a proposed note being rated
    // Optimize: Only query interactive elements, not all buttons/links
    const interactiveElements = article.querySelectorAll('button[aria-label], [role="button"][aria-label], button:not([aria-label])');
    let hasHelpfulButton = false;
    let hasNotHelpfulButton = false;
    
    for (const button of interactiveElements) {
      const text = (button.textContent || '').toLowerCase().trim();
      const label = (button.getAttribute('aria-label') || '').toLowerCase();
      const combined = text + ' ' + label;
      
      // Check for "helpful" button (but not "not helpful")
      if ((text === 'helpful' || /^helpful\s/i.test(text) || /helpful/i.test(label)) && 
          !/not\s+helpful/i.test(combined)) {
        hasHelpfulButton = true;
      }
      
      // Check for "not helpful" button
      if (/not\s+helpful|not helpful/i.test(combined)) {
        hasNotHelpfulButton = true;
      }
    }
    
    // If both buttons are present, it's almost certainly a proposed note
    if (hasHelpfulButton && hasNotHelpfulButton) {
      // Additional verification: check if there's note-related context
      const contextText = articleText.toLowerCase();
      if (contextText.includes('community') || 
          contextText.includes('note') || 
          contextText.includes('context') ||
          contextText.includes('readers added') ||
          contextText.includes('rate')) {
        console.log('[X Community Note Hider] Detected proposed note via Helpful/Not Helpful buttons');
        return true;
      }
    }

    // Priority 2: Check for text patterns indicating a proposed note that needs rating
    const proposedNotePatterns = [
      /rate\s+this\s+note/i,
      /rate\s+the\s+note/i,
      /vote\s+on\s+this\s+note/i,
      /is\s+this\s+note\s+helpful/i,
      /community\s+note\s+proposal/i,
      /proposed\s+community\s+note/i,
      /rate.*note.*helpful/i,
      /helpful.*not\s+helpful/i,  // Both buttons present
      /not\s+helpful.*helpful/i
    ];

    for (const pattern of proposedNotePatterns) {
      if (pattern.test(articleText)) {
        // Additional verification: check if it's in context of a note
        const contextText = articleText.toLowerCase();
        if (contextText.includes('community') || 
            contextText.includes('note') || 
            contextText.includes('context') ||
            contextText.includes('readers added')) {
          console.log('[X Community Note Hider] Detected proposed note via text:', pattern.source);
          return true;
        }
      }
    }

    // Priority 3: Check for buttons/links related to rating notes
    const ratingSelectors = [
      'button[aria-label*="helpful" i]',
      'button[aria-label*="not helpful" i]',
      'button[aria-label*="rate" i]',
      'a[href*="rate" i]',
      '[role="button"][aria-label*="helpful" i]',
      '[role="button"][aria-label*="rate" i]'
    ];

    for (const selector of ratingSelectors) {
      try {
        const elements = article.querySelectorAll(selector);
        for (const element of elements) {
          const label = element.getAttribute('aria-label') || '';
          const text = element.textContent || '';
          // Verify it's about rating a note
          if (/rate.*note|helpful.*note|note.*helpful|rate.*community/i.test(label + ' ' + text)) {
            console.log('[X Community Note Hider] Detected proposed note via rating button:', label);
            return true;
          }
        }
      } catch (e) {
        // Invalid selector, continue
      }
    }

    // Priority 4: Check for data attributes related to note rating
    const ratingElements = article.querySelectorAll('[data-testid*="rate" i], [data-testid*="helpful" i]');
    for (const element of ratingElements) {
      const testId = element.getAttribute('data-testid') || '';
      const text = element.textContent || '';
      const label = element.getAttribute('aria-label') || '';
      const combined = testId + ' ' + text + ' ' + label;
      
      // More specific check - must be related to notes
      if (/rate.*note|helpful.*note|note.*rate|community.*note.*rate/i.test(combined)) {
        console.log('[X Community Note Hider] Detected proposed note via data-testid:', testId);
        return true;
      }
    }

    return false;
  }

  /**
   * Check if a post has a community note
   * Uses multiple detection methods with fallbacks for robustness
   * @param {HTMLElement} article - The article element to check
   * @returns {boolean}
   */
  function hasCommunityNote(article) {
    if (!article) return false;

    // Priority 1: Specific data-testid selectors (most reliable)
    // X commonly uses these data-testid values for community notes
    const specificSelectors = [
      '[data-testid="communityNote"]',
      '[data-testid="community-note"]',
      '[data-testid*="communityNote" i]',
      '[data-testid*="community-note" i]',
      '[data-testid*="note" i]' // More general fallback for note-related elements
    ];

    for (const selector of specificSelectors) {
      try {
        const element = article.querySelector(selector);
        if (element) {
          // Additional verification for the more general selector
          if (selector.includes('[data-testid*="note" i]')) {
            const testId = element.getAttribute('data-testid') || '';
            const text = (element.textContent || '').toLowerCase();
            // Only match if it's actually about community notes
            if (!/community|readers.*added.*context/i.test(testId + ' ' + text)) {
              continue;
            }
          }
          console.log('[X Community Note Hider] Detected via data-testid:', selector);
          return true;
        }
      } catch (e) {
        // Invalid selector, continue to next
      }
    }

    // Priority 2: Check for Community Notes badge/icon indicators
    // Look for specific structural patterns X uses for notes
    // MUST be specific to avoid false positives from other UI elements
    const badgeSelectors = [
      'svg[aria-label*="community note" i]',
      'svg[aria-label*="readers added context" i]',
      '[role="img"][aria-label*="community note" i]',
      '[role="img"][aria-label*="readers added context" i]',
      // Additional patterns for newer X UI
      'svg[aria-label*="note" i]',
      '[role="img"][aria-label*="note" i]'
    ];

    for (const selector of badgeSelectors) {
      try {
        const element = article.querySelector(selector);
        if (element) {
          const label = element.getAttribute('aria-label') || '';
          // Additional verification: ensure it's specifically about community notes
          if (/community.*note|readers.*added.*context/i.test(label)) {
            console.log('[X Community Note Hider] Detected via badge:', label);
            return true;
          }
        }
      } catch (e) {
        // Invalid selector, continue
      }
    }

    // Priority 3: Text pattern matching (works across X's UI changes)
    // These are the actual text strings X displays for community notes
    // Only match the EXACT phrases X uses, not general usage
    const articleText = article.textContent || '';
    const notePatterns = [
      /readers\s+added\s+context/i,           // Primary X pattern - must be exact
      /context\s+they\s+thought\s+people\s+might\s+want\s+to\s+know/i,
      /^community\s+note/i,                   // Must start with "community note"
      /^community\s+notes/i,
      /communitynote/i,                       // One word variant
      /note\s+by\s+the\s+community/i,
      // Additional patterns for various X UI variations
      /\bcommunity\s+note\b/i,
      /\bcommunity\s+notes\b/i
    ];

    for (const pattern of notePatterns) {
      if (pattern.test(articleText)) {
        console.log('[X Community Note Hider] Detected via text pattern:', pattern.source);
        return true;
      }
    }

    // Priority 4: ARIA label matching
    const ariaSelectors = [
      '[aria-label*="community note" i]',
      '[aria-label*="readers added context" i]',
      // More general pattern with verification
      '[aria-label*="note" i]'
    ];

    for (const selector of ariaSelectors) {
      try {
        const elements = article.querySelectorAll(selector);
        for (const element of elements) {
          const label = element.getAttribute('aria-label') || '';
          // For the more general selector, verify it's about community notes
          if (selector.includes('[aria-label*="note" i]') && 
              !/community.*note|readers.*added.*context/i.test(label)) {
            continue;
          }
          console.log('[X Community Note Hider] Detected via aria-label:', selector, label);
          return true;
        }
      } catch (e) {
        // Invalid selector, continue
      }
    }

    // Priority 5: Links to community notes pages
    const communityNoteLinks = article.querySelectorAll('a[href]');
    for (const link of communityNoteLinks) {
      const href = link.getAttribute('href') || '';
      if (/communitynotes|community-note|\/i\/communitynotes/i.test(href)) {
        console.log('[X Community Note Hider] Detected via link:', href);
        return true;
      }
    }

    // Priority 6: Check for specific div/section structures X uses for notes
    // X often wraps community notes in specific containers
    const structuralSelectors = [
      'div[class*="note" i]',
      'section[class*="note" i]',
      'div[class*="community" i]'
    ];
    
    for (const selector of structuralSelectors) {
      try {
        const elements = article.querySelectorAll(selector);
        for (const element of elements) {
          const className = element.getAttribute('class') || '';
          const text = element.textContent || '';
          // Verify it's actually a community note container
          if (/community.*note|readers.*added.*context/i.test(className + ' ' + text)) {
            console.log('[X Community Note Hider] Detected via structure:', selector);
            return true;
          }
        }
      } catch (e) {
        // Invalid selector, continue
      }
    }

    // Priority 7: Fallback - check all elements with data-testid attributes
    // This helps catch new attributes X might add in the future
    // MUST be very strict to avoid false positives
    const allTestIdElements = article.querySelectorAll('[data-testid]');
    for (const element of allTestIdElements) {
      const testId = element.getAttribute('data-testid') || '';
      const text = element.textContent || '';
      const ariaLabel = element.getAttribute('aria-label') || '';
      
      // Only check if testId specifically mentions community notes
      // This prevents false positives from other "note" related features
      if (/community.*note|communitynote/i.test(testId)) {
        // Additional verification: check for actual community note text
        const combined = text + ' ' + ariaLabel;
        if (/readers\s+added\s+context|community\s+note|context\s+they\s+thought/i.test(combined)) {
          console.log('[X Community Note Hider] Detected via fallback selector:', testId);
          return true;
        }
      }
    }

    return false;
  }

  // ============================================================================
  // Post Hiding Logic
  // ============================================================================
  
  /**
   * Hide a post that has a community note
   * @param {HTMLElement} article - The article element to hide
   */
  function hidePost(article) {
    if (article && !article.dataset.communityNoteHidden) {
      article.dataset.communityNoteHidden = 'true';
      article.style.display = 'none';
      console.log('[X Community Note Hider] Hid post with community note');
    }
  }

  /**
   * Check if post should be hidden based on settings
   * @param {HTMLElement} article - The article element to check
   * @returns {boolean}
   */
  function shouldHidePost(article) {
    // Wait for settings to load
    if (!settingsLoaded) {
      return false;
    }

    // Check if extension is enabled
    if (!settings.enabled) {
      return false;
    }

    // Check if account is whitelisted
    if (isAccountWhitelisted(article)) {
      return false;
    }

    // Check if post has a proposed community note (being voted on)
    if (hasProposedCommunityNote(article)) {
      // Only hide if the setting is enabled (defaults to true)
      if (settings.hideProposedNotes !== false) {
        return true;
      }
      // If proposed notes shouldn't be hidden, continue to check for regular notes
    }

    // Check if post has community note
    if (!hasCommunityNote(article)) {
      return false;
    }

    // Note type filtering would go here if X exposes helpful/not helpful data
    // For now, all notes are treated the same
    
    return true;
  }

  // ============================================================================
  // Post Processing
  // ============================================================================
  
  /**
   * Process existing posts to check for community notes
   */
  function processPosts() {
    // Wait for settings to load
    if (!settingsLoaded) {
      return;
    }

    // Check if extension is enabled
    if (!settings.enabled) {
      // If disabled, show all previously hidden posts
      const hiddenPosts = document.querySelectorAll('article[data-community-note-hidden="true"]');
      hiddenPosts.forEach(article => {
        article.style.display = '';
        article.removeAttribute('data-community-note-hidden');
        article.removeAttribute('data-note-checked');
      });
      return;
    }

    // Select all article elements (posts in X timeline, profile pages, etc.)
    // Check both new posts and previously checked posts (to catch async-loaded notes)
    const allArticles = document.querySelectorAll('article[data-testid="tweet"]');
    const uncheckedArticles = document.querySelectorAll('article[data-testid="tweet"]:not([data-note-checked])');
    
    // First, process unchecked articles
    uncheckedArticles.forEach(article => {
      // Mark as checked
      article.setAttribute('data-note-checked', 'true');
      article.setAttribute('data-note-check-time', Date.now().toString());
      
      // Check if post should be hidden based on settings
      if (shouldHidePost(article)) {
        hidePost(article);
      } else {
        // Make sure post is visible if it shouldn't be hidden
        if (article.dataset.communityNoteHidden) {
          article.style.display = '';
          article.removeAttribute('data-community-note-hidden');
        }
      }
    });
    
    // Re-check previously checked articles that are still visible
    // This catches community notes that load asynchronously
    const now = Date.now();
    allArticles.forEach(article => {
      if (article.dataset.communityNoteHidden === 'true') {
        // Already hidden, skip
        return;
      }
      
      const checkTime = parseInt(article.getAttribute('data-note-check-time') || '0');
      const timeSinceCheck = now - checkTime;
      
      // Re-check if it's been more than threshold since last check
      // This allows time for async community notes to load
      if (checkTime > 0 && 
          timeSinceCheck > TIMING.RECHECK_THRESHOLD && 
          timeSinceCheck < TIMING.RECHECK_MAX_AGE) {
        // Update check time
        article.setAttribute('data-note-check-time', now.toString());
        
        // Re-check if post should be hidden
        if (shouldHidePost(article)) {
          hidePost(article);
        }
      }
    });
  }

  // ============================================================================
  // Mutation Observer
  // ============================================================================
  
  /**
   * Set up MutationObserver to watch for new posts and changes within posts
   */
  function observeTimeline() {
    const observer = new MutationObserver((mutations) => {
      let shouldCheck = false;

      mutations.forEach((mutation) => {
        // Check for new nodes (new posts)
        if (mutation.addedNodes.length > 0) {
          shouldCheck = true;
        }
        
        // Also check for changes within existing articles
        // This catches community notes that load asynchronously
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          // Check if the mutation is within an article element
          let target = mutation.target;
          while (target && target !== document.body) {
            if (target.tagName === 'ARTICLE' && target.getAttribute('data-testid') === 'tweet') {
              shouldCheck = true;
              // Reset the check time so it gets re-checked
              const checkTime = target.getAttribute('data-note-check-time');
              if (checkTime) {
                target.setAttribute('data-note-check-time', '0');
              }
              break;
            }
            target = target.parentElement;
          }
        }
      });

      if (shouldCheck) {
        // Debounce the check to avoid excessive processing
        setTimeout(processPosts, TIMING.MUTATION_DEBOUNCE);
        // Also check again after a delay to catch async-loaded notes
        setTimeout(processPosts, TIMING.MUTATION_DELAY);
      }
    });

    // Start observing the document body for changes
    // Watch both childList (new nodes) and subtree (changes within nodes)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-testid', 'aria-label', 'class'] // Watch for relevant attribute changes
    });

    console.log('X Community Note Hider: Extension active');
  }

  // ============================================================================
  // Initialization
  // ============================================================================
  
  /**
   * Initialize the extension
   */
  async function initialize() {
    // Load settings first
    await loadSettings();
    
    // Process posts and set up observer
    processPosts();
    observeTimeline();
    
    // Run again after delays to catch posts that load later (profile pages, etc.)
    setTimeout(processPosts, TIMING.FIRST_RECHECK);
    setTimeout(processPosts, TIMING.SECOND_RECHECK);
  }

  // Listen for settings changes from options page
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync') {
      loadSettings().then(() => {
        // Reprocess all posts with new settings
        setTimeout(() => {
          document.querySelectorAll('article[data-testid="tweet"]').forEach(article => {
            article.removeAttribute('data-note-checked');
          });
          processPosts();
        }, TIMING.INITIAL_DELAY);
      });
    }
  });

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  // Also run periodically as a fallback (especially for profile pages)
  // This ensures we catch community notes that load very late
  setInterval(processPosts, TIMING.RECHECK_INTERVAL);
  
  // Additional periodic check with longer interval for posts that might have been missed
  // Re-check all visible posts every 10 seconds to catch very late-loading notes
  setInterval(() => {
    if (!settingsLoaded || !settings.enabled) return;
    
    const allArticles = document.querySelectorAll('article[data-testid="tweet"]');
    allArticles.forEach(article => {
      // Only re-check visible posts that haven't been checked recently
      if (article.dataset.communityNoteHidden !== 'true' && 
          article.style.display !== 'none') {
        const checkTime = parseInt(article.getAttribute('data-note-check-time') || '0');
        const timeSinceCheck = Date.now() - checkTime;
        
        // Re-check if it's been more than threshold since last check
        if (timeSinceCheck > TIMING.PERIODIC_THRESHOLD) {
          article.setAttribute('data-note-check-time', '0'); // Force re-check
        }
      }
    });
    processPosts();
  }, TIMING.PERIODIC_RECHECK);
})();