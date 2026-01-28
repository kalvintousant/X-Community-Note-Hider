# X Community Note Hider v1.1.0 Release Notes

## 🎉 New Features

### Search Enhancement
- **Prioritize Followed Accounts in Search**: Automatically reorders search results to show accounts you follow at the top
  - Detects when you're on a search results page
  - Identifies followed accounts using "Following" indicators
  - Reorders results in real-time as new results load
  - Can be toggled on/off in settings (enabled by default)

### Extension Icon Click
- **Quick Settings Access**: Click the extension icon in your Chrome toolbar to instantly open the settings page
  - No need to right-click or navigate through Chrome's extension menu
  - Convenient one-click access to all settings

## 🎨 Improvements

### UI/UX Enhancements
- **Dark Theme**: Updated options page to match X's black color scheme
  - Professional dark-themed interface
  - Better visual consistency with X's design
  - Improved toggle alignment and layout

### Technical Improvements
- **Background Service Worker**: Added service worker for extension icon click handling
- **Enhanced Search Detection**: Improved search page detection and result processing
- **Better Async Loading**: Enhanced support for dynamically loaded search results
- **Code Organization**: Improved code structure with better comments and documentation

## 📦 Installation

1. **Download the ZIP file** from the [Releases page](https://github.com/kalvintousant/X-Community-Note-Hider/releases)
2. **Extract the ZIP file** to a location of your choice
3. **Install in Chrome**:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select the extracted folder

## 🔄 Updating from v1.0.0

If you're updating from v1.0.0:

1. Remove the old extension from Chrome (`chrome://extensions/` → Remove)
2. Download and install v1.1.0 using the steps above
3. Your settings will be preserved (synced via Chrome sync)

## 📝 Full Changelog

### Added
- Search result prioritization feature
- Extension icon click handler
- Background service worker
- Dark theme for options page
- New setting: "Prioritize Followed Accounts in Search"

### Changed
- Updated manifest.json to v1.1.0
- Improved options page styling
- Enhanced search page detection
- Better async loading support

### Technical
- Added `background.js` service worker
- Improved code organization and documentation
- Enhanced error handling

## 🐛 Bug Fixes

- Fixed toggle alignment issues in options page
- Improved search result detection reliability
- Better handling of edge cases in search reordering

## 📚 Documentation

- Updated README with comprehensive documentation
- Added detailed feature descriptions
- Enhanced troubleshooting guide
- Improved installation instructions

## 🔗 Links

- [GitHub Repository](https://github.com/kalvintousant/X-Community-Note-Hider)
- [Issues](https://github.com/kalvintousant/X-Community-Note-Hider/issues)
- [Previous Release (v1.0.0)](https://github.com/kalvintousant/X-Community-Note-Hider/releases/tag/v1.0.0)

---

**Thank you for using X Community Note Hider!** 🚀

If you encounter any issues or have suggestions, please [open an issue](https://github.com/kalvintousant/X-Community-Note-Hider/issues) on GitHub.
