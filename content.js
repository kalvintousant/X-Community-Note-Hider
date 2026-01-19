// X Community Note Hide Extension
// Automatically hides posts that have community notes

(function() {
  'use strict';

  // Function to check if a post has a community note
  function hasCommunityNote(article) {
    if (!article) return false;

    // Community notes on X are typically indicated by:
    // 1. Elements with data-testid containing "note" or similar
    // 2. Text content mentioning "Community Note" or variations
    // 3. Links to community notes pages
    // 4. Specific SVG icons or labels related to notes
    
    // Get all text content from the article
    const articleText = article.textContent || '';
    
    // Look for "Community Note" text variations (case-insensitive)
    const notePatterns = [
      /community\s*note/i,
      /communitynotes/i,
      /note\s*by\s*the\s*community/i,
      /community\s*context/i
    ];

    for (const pattern of notePatterns) {
      if (pattern.test(articleText)) {
        return true;
      }
    }

    // Check for elements with note-related data attributes
    const noteSelectors = [
      '[data-testid*="note" i]',
      '[data-testid*="community-note" i]',
      '[aria-label*="community note" i]',
      '[aria-label*="community note" i]'
    ];

    for (const selector of noteSelectors) {
      try {
        if (article.querySelector(selector)) {
          return true;
        }
      } catch (e) {
        // Invalid selector, skip
      }
    }

    // Check for links to community notes pages
    const communityNoteLinks = article.querySelectorAll('a[href]');
    for (const link of communityNoteLinks) {
      const href = link.getAttribute('href') || '';
      if (/communitynotes|community-note/i.test(href)) {
        return true;
      }
    }

    // Check for specific note containers or badges
    // Look for common patterns in the article structure (more targeted search)
    const potentialNoteElements = article.querySelectorAll([
      '[data-testid]',
      '[aria-label]',
      'span',
      'div'
    ].join(','));

    for (const element of potentialNoteElements) {
      const elementText = element.textContent || '';
      const ariaLabel = element.getAttribute('aria-label') || '';
      const dataTestId = element.getAttribute('data-testid') || '';
      const combinedText = elementText + ' ' + ariaLabel + ' ' + dataTestId;
      
      // Check if element contains community note indicators
      for (const pattern of notePatterns) {
        if (pattern.test(combinedText)) {
          return true;
        }
      }
      
      // Early exit if we find a strong indicator
      if (/community.*note/i.test(combinedText) || /note.*community/i.test(combinedText)) {
        return true;
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
    // Select all article elements (posts in X timeline)
    const articles = document.querySelectorAll('article[data-testid="tweet"]');
    
    articles.forEach(article => {
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

    console.log('X Community Note Hide: Extension active');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      processPosts();
      observeTimeline();
    });
  } else {
    processPosts();
    observeTimeline();
  }

  // Also run periodically as a fallback
  setInterval(processPosts, 2000);
})();
