// X Community Note Hider - Optimized
// Works on timeline, profile pages, and search results
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(function() {
  'use strict';

  // Multiple indicators for community notes (case-insensitive patterns)
  const NOTE_PATTERNS = [
      /readers\s+added\s+context/i,
      /community\s+note/i,
      /community\s+notes/i,
      /communitynote/i,
      /context\s+they\s+thought\s+people\s+might\s+want\s+to\s+know/i,
      /note\s+by\s+the\s+community/i
  ];

  function hasCommunityNote(tweet) {
      // Get all text content from the tweet (case-insensitive)
      const text = tweet.innerText || tweet.textContent || '';
      
      // Check if any pattern matches
      if (NOTE_PATTERNS.some(pattern => pattern.test(text))) {
          return true;
      }

      // Also check for community notes links
      const links = tweet.querySelectorAll('a[href]');
      for (const link of links) {
          const href = link.getAttribute('href') || '';
          if (/communitynotes|community-note/i.test(href)) {
              return true;
          }
      }

      // Check for data attributes that might indicate notes
      const noteElements = tweet.querySelectorAll('[data-testid*="note" i], [aria-label*="note" i], [aria-label*="context" i]');
      for (const elem of noteElements) {
          const label = elem.getAttribute('aria-label') || '';
          const testId = elem.getAttribute('data-testid') || '';
          if (/community.*note|note.*community|readers.*context|added.*context/i.test(label + testId)) {
              return true;
          }
      }

      return false;
  }

  function processTweets() {
      // Select all tweets that haven't been checked yet
      // This works on timeline, profile pages, and search results
      const tweets = document.querySelectorAll('article[data-testid="tweet"]:not([data-note-checked])');

      tweets.forEach(tweet => {
          // Mark as checked immediately to avoid re-processing
          tweet.setAttribute('data-note-checked', 'true');

          // Check if this tweet has a community note
          if (hasCommunityNote(tweet)) {
              tweet.style.display = 'none';
              tweet.setAttribute('data-community-note-hidden', 'true');
              console.log('🚫 Hidden a tweet with Community Note');
          }
      });
  }

  // Run immediately on page load
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
          processTweets();
      });
  } else {
      processTweets();
  }

  // Also run after a short delay to catch posts that load slightly after DOMContentLoaded
  setTimeout(processTweets, 500);
  setTimeout(processTweets, 1500);

  // Set up observer for dynamic content (infinite scroll, profile pages, etc.)
  const observer = new MutationObserver((mutations) => {
      // Check if any new nodes were added
      let hasNewNodes = false;
      for (const mutation of mutations) {
          if (mutation.addedNodes.length > 0) {
              hasNewNodes = true;
              break;
          }
      }
      
      if (hasNewNodes) {
          // Debounce to avoid excessive processing
          setTimeout(processTweets, 100);
      }
  });

  // Start observing the entire document for changes
  observer.observe(document.body, {
      childList: true,
      subtree: true
  });

  // Also check periodically as a fallback (especially for profile pages)
  setInterval(processTweets, 2000);

})();