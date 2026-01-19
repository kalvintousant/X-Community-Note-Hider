// X Community Note Hider - Optimized
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(function() {
    'use strict';

    // The specific text X uses in the header of the note
    const INDICATORS = [
        "Readers added context", 
        "context they thought people might want to know"
    ];

    function processTweets() {
        // Only select tweets that haven't been checked yet to save memory
        const tweets = document.querySelectorAll('article[data-testid="tweet"]:not([data-note-checked])');

        tweets.forEach(tweet => {
            // Mark as checked immediately so we don't look at it again
            tweet.setAttribute('data-note-checked', 'true');

            // 1. Get the text content
            const text = tweet.innerText;

            // 2. Check if the "Readers added context" string exists
            const hasNote = INDICATORS.some(phrase => text.includes(phrase));

            // 3. Hide if found
            if (hasNote) {
                tweet.style.display = 'none';
                console.log('🚫 Hidden a tweet with Community Note');
            }
        });
    }

    // Run immediately on page load
    processTweets();

    // Set up the observer for infinite scrolling
    const observer = new MutationObserver((mutations) => {
        // We don't need complex logic here; just run the check 
        // when new items are added.
        processTweets();
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
