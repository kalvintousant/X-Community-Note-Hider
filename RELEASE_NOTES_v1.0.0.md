# X Community Note Hider v1.0.0

## 🎉 First Release!

Chrome extension that automatically hides posts with community notes on X (formerly Twitter).

## ✨ Features

- ✅ **Automatically detects and hides posts with community notes** - No manual intervention needed
- ✅ **Works across all X.com pages** - Timeline, profile pages, and search results
- ✅ **Real-time detection** - Hides posts as you scroll
- ✅ **Privacy-focused** - No data collection or tracking, runs entirely locally
- ✅ **Lightweight** - Minimal performance impact

## 🚀 Installation

1. Download the `X-Community-Note-Hide-v1.0.0.zip` file above
2. Extract the ZIP file to a folder on your computer
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode" (toggle in the top-right corner)
5. Click "Load unpacked"
6. Select the extracted folder
7. Done! The extension will automatically work on X.com

## 📋 How It Works

The extension monitors your X timeline and automatically hides any posts that have community notes attached. It uses multiple detection methods:

- Text pattern matching (e.g., "Readers added context")
- Data attribute detection
- Link detection for community notes pages

## 🔧 What's Included

- **manifest.json** - Extension configuration
- **content.js** - Core extension logic
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
