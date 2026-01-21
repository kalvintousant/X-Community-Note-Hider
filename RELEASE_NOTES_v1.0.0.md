# X Community Note Hider v1.0.0

## 🎉 First Release!

Chrome extension that automatically hides posts with community notes on X (formerly Twitter).

## ✨ Features

- ✅ **Automatically detects and hides posts with community notes** - No manual intervention needed
- ✅ **Works across all X.com pages** - Timeline, profile pages, and search results
- ✅ **Real-time detection** - Hides posts as you scroll
- ✅ **Privacy-focused** - No data collection or tracking, runs entirely locally
- ✅ **Lightweight** - Minimal performance impact
- ✅ **Customizable settings** - Enable/disable, whitelist accounts, and more
- ✅ **Settings page** - Beautiful options UI for customization
- ✅ **Manifest V3 compliant** - Ready for Chrome Web Store

## ⚙️ Customization Options

- **Enable/Disable Toggle** - Turn the extension on or off completely
- **Account Whitelist** - Always show posts from specific accounts, even with community notes
- **Note Type Filter** - Choose to hide all notes or only helpful notes (prepared for future)

Access settings by right-clicking the extension icon → "Options" or via Chrome Extensions page.

## 🚀 Installation

1. Download the `X-Community-Note-Hider-v1.0.0.zip` file above
2. Extract the ZIP file to a folder on your computer
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode" (toggle in the top-right corner)
5. Click "Load unpacked"
6. Select the extracted folder
7. Done! Right-click the extension icon → "Options" to customize settings

## 📋 How It Works

The extension monitors your X timeline and automatically hides any posts that have community notes attached. It uses priority-based detection with multiple fallback methods:

- **Priority 1**: Specific data-testid selectors (most reliable)
- **Priority 2**: Badge/icon indicators
- **Priority 3**: Text pattern matching (e.g., "Readers added context")
- **Priority 4**: ARIA label matching
- **Priority 5**: Link detection for community notes pages
- **Priority 6**: Fallback selectors for future-proofing

## 🔧 What's Included

- **manifest.json** - Extension configuration (Manifest V3)
- **content.js** - Core extension logic with settings support
- **options.html** - Settings page UI
- **options.js** - Settings management
- **LICENSE** - MIT License

## ⚠️ Requirements

- Google Chrome (or Chromium-based browser)
- X.com account (optional - works without logging in)

## 📝 Notes

- The extension works entirely in your browser - no external connections
- No data is collected or sent to any server
- Only affects X.com and Twitter.com pages

## 🐛 Troubleshooting

If posts with community notes aren't being hidden:

1. Make sure the extension is enabled in `chrome://extensions/`
2. Refresh the X.com page
3. Check the browser console (F12) for any error messages
4. Reload the extension if needed

## 📄 License

This project is licensed under the MIT License.

## 🙏 Thanks

Thank you for using X Community Note Hider! If you encounter any issues or have suggestions, please open an issue on GitHub.
