// X Community Note Hide Extension
// Automatically hides posts that have community notes

(function() {
    'use strict';

  // Function to check if a post has a community note
  // Uses multiple detection methods with fallbacks for robustness
  function hasCommunityNote(article) {
    if (!article) return false;

    // Priority 1: Specific data-testid selectors (most reliable)
    // X commonly uses these data-testid values for community notes
    const specificSelectors = [
      '[data-testid="communityNote"]',
      '[data-testid="community-note"]',
      '[data-testid*="communityNote" i]',
      '[data-testid*="community-note" i]',
      '[data-testid*="note-" i]',
      '[data-testid*="-note" i]'
    ];

    for (const selector of specificSelectors) {
      try {
        const element = article.querySelector(selector);
        if (element) {
          console.log('[X Community Note Hider] Detected via data-testid:', selector);
          return true;
        }
      } catch (e) {
        // Invalid selector, continue to next
      }
    }

    // Priority 2: Check for Community Notes badge/icon indicators
    // Look for specific structural patterns X uses for notes
    const badgeSelectors = [
      'svg[aria-label*="note" i]',
      'svg[aria-label*="context" i]',
      '[role="img"][aria-label*="note" i]',
      '[role="img"][aria-label*="context" i]'
    ];

    for (const selector of badgeSelectors) {
      try {
        const element = article.querySelector(selector);
        if (element) {
          const label = element.getAttribute('aria-label') || '';
          // Verify it's specifically about community notes/context
          if (/community.*note|note.*community|readers.*context|added.*context/i.test(label)) {
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
    const articleText = article.textContent || '';
    const notePatterns = [
      /readers\s+added\s+context/i,           // Primary X pattern
      /context\s+they\s+thought\s+people\s+might\s+want\s+to\s+know/i,
      /community\s+note/i,
      /community\s+notes/i,
      /communitynotes/i,
      /note\s+by\s+the\s+community/i,
      /community\s+context/i,
      /readers.*added.*context/i,              // Flexible spacing
      /added\s+context/i                       // Shorter variant
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
      '[aria-label*="added context" i]',
      '[aria-label*="community context" i]'
    ];

    for (const selector of ariaSelectors) {
      try {
        if (article.querySelector(selector)) {
          console.log('[X Community Note Hider] Detected via aria-label:', selector);
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

    // Priority 6: Fallback - check all elements with data-testid attributes
    // This helps catch new attributes X might add in the future
    const allTestIdElements = article.querySelectorAll('[data-testid]');
    for (const element of allTestIdElements) {
      const testId = element.getAttribute('data-testid') || '';
      const text = element.textContent || '';
      const ariaLabel = element.getAttribute('aria-label') || '';
      
      // Check for note-related keywords in any of these
      const combined = testId + ' ' + text + ' ' + ariaLabel;
      if (/community.*note|note.*community|readers.*context|added.*context/i.test(combined)) {
        // Additional verification: ensure it's not a false positive
        if (testId.toLowerCase().includes('note') || text.toLowerCase().includes('context')) {
          console.log('[X Community Note Hider] Detected via fallback selector:', testId);
          return true;
        }
      }
    }

    return false;
  }

  // Function to hide a post
  function hidePost(article) {
    if (article && !article.dataset.communityNoteHidden) {
      article.dataset.communityNoteHidden = 'true';
      article.style.display = 'none';
      console.log('Hid post with community note');
    }
  }

  // Function to process existing posts
  function processPosts() {
    // Select all article elements (posts in X timeline, profile pages, etc.)
    // Only check posts that haven't been checked yet to improve performance
    const articles = document.querySelectorAll('article[data-testid="tweet"]:not([data-note-checked])');
    
    articles.forEach(article => {
      // Mark as checked to avoid re-processing
      article.setAttribute('data-note-checked', 'true');
      
      if (!article.dataset.communityNoteHidden && hasCommunityNote(article)) {
        hidePost(article);
      }
    });
  }

  // MutationObserver to watch for new posts
  function observeTimeline() {
    const observer = new MutationObserver((mutations) => {
      let shouldCheck = false;

      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          shouldCheck = true;
        }
      });

      if (shouldCheck) {
        // Debounce the check to avoid excessive processing
        setTimeout(processPosts, 100);
      }
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    console.log('X Community Note Hider: Extension active');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      processPosts();
      observeTimeline();
      // Run again after delays to catch posts that load later (profile pages, etc.)
      setTimeout(processPosts, 500);
      setTimeout(processPosts, 1500);
    });
  } else {
    processPosts();
    observeTimeline();
    // Run again after delays
    setTimeout(processPosts, 500);
    setTimeout(processPosts, 1500);
  }

  // Also run periodically as a fallback (especially for profile pages)
  setInterval(processPosts, 2000);
})();