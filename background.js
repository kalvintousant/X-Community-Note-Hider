// Background service worker for X Community Note Hider
// Handles extension icon clicks to open options page

chrome.action.onClicked.addListener((tab) => {
  // Open the options page
  chrome.runtime.openOptionsPage();
});
