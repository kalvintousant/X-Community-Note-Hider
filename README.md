# X Community Note Hider

<div align="center">

**A Chrome extension that automatically hides posts with community notes from your X (formerly Twitter) timeline**

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/kalvintousant/X-Community-Note-Hider/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange.svg)](https://developer.chrome.com/docs/extensions/mv3/)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-yellow.svg)](https://chrome.google.com/webstore)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [How It Works](#how-it-works)
- [Privacy & Security](#privacy--security)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

X Community Note Hider is a lightweight Chrome extension designed to enhance your X (formerly Twitter) browsing experience by automatically hiding posts that contain community notes. The extension operates seamlessly in the background, providing a cleaner timeline without manual intervention.

### Key Benefits

- **Automatic Detection**: Intelligently identifies and hides posts with community notes
- **Real-time Processing**: Works as you scroll, handling dynamically loaded content
- **Customizable**: Extensive settings to tailor the extension to your preferences
- **Privacy-Focused**: All processing happens locally; no data collection or external connections
- **Non-Intrusive**: Lightweight implementation that doesn't impact page performance

---

## ✨ Features

### Core Functionality

| Feature | Description |
|---------|-------------|
| **Community Note Detection** | Automatically detects and hides posts containing community notes using multiple detection methods |
| **Proposed Note Detection** | Identifies and hides posts where you're asked to rate proposed community notes |
| **Real-time Processing** | Processes new posts as they load, including dynamically loaded content |
| **Async Loading Support** | Re-checks posts periodically to catch community notes that load after initial render |
| **Whitelist Support** | Configure specific accounts to always show, even with community notes |

### Enhanced Features (v1.1+)

| Feature | Description |
|---------|-------------|
| **Search Prioritization** | Automatically reorders search results to show accounts you follow first |
| **Quick Settings Access** | Click the extension icon to instantly open the settings page |
| **Dark Theme UI** | Beautiful settings interface matching X's design aesthetic |

### Technical Features

- ✅ Manifest V3 compliant
- ✅ Chrome Web Store ready
- ✅ Cross-device settings sync
- ✅ Optimized performance with minimal resource usage
- ✅ Comprehensive error handling

---

## 📦 Installation

### Method 1: Chrome Web Store (Recommended)

*Coming soon - Extension pending Chrome Web Store approval*

### Method 2: Manual Installation from GitHub

1. **Download the Latest Release**
   ```bash
   # Navigate to the Releases page
   https://github.com/kalvintousant/X-Community-Note-Hider/releases
   ```
   - Download the latest `X-Community-Note-Hider-v*.zip` file

2. **Extract the Archive**
   - Extract the ZIP file to a location of your choice
   - Note the folder path for the next step

3. **Install in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in the top-right corner)
   - Click **Load unpacked**
   - Select the extracted folder
   - The extension will be installed and ready to use

### Method 3: Development Installation

For developers who want to modify or contribute:

```bash
# Clone the repository
git clone https://github.com/kalvintousant/X-Community-Note-Hider.git
cd X-Community-Note-Hider

# Load in Chrome
# Follow steps 3 from Method 2 above
```

---

## 🚀 Usage

### Getting Started

Once installed, the extension works automatically with no configuration required:

1. **Visit X.com or Twitter.com**
2. **Browse your timeline** - Posts with community notes will be automatically hidden
3. **Customize settings** (optional) - Click the extension icon or access options via right-click menu

### Accessing Settings

You can access the extension settings in three ways:

1. **Extension Icon** (Recommended): Click the extension icon in your Chrome toolbar
2. **Right-Click Menu**: Right-click the extension icon → Select "Options"
3. **Extensions Page**: Navigate to `chrome://extensions/` → Find "X Community Note Hider" → Click "Options"

---

## ⚙️ Configuration

The extension provides comprehensive settings to customize your experience:

### General Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Enable Extension** | Master toggle to enable/disable all functionality | Enabled |
| **Hide Proposed Notes** | Hide posts where you're asked to rate proposed community notes | Enabled |
| **Prioritize Followed in Search** | Show accounts you follow at the top of search results | Enabled |
| **Note Type Filter** | Choose to hide all notes or only helpful notes | All Notes |

### Account Management

- **Whitelist Accounts**: Add specific usernames (without @) to always show, even if they have community notes
  - Useful for trusted accounts you want to see regardless of notes
  - Supports multiple accounts
  - Settings sync across devices via Chrome sync

### Settings Sync

All settings are automatically synced across your Chrome browsers using Chrome's built-in sync functionality, ensuring a consistent experience across devices.

---

## 🔧 How It Works

### Architecture

The extension uses a multi-layered detection system to identify and process community notes:

#### 1. Content Script Injection
- Injected into X.com and Twitter.com pages
- Runs at `document_idle` to ensure page stability
- Monitors DOM changes in real-time

#### 2. Detection Methods

**Community Note Detection:**
- Text pattern matching for "Community Note" and "Readers added context"
- Data attribute analysis (`data-testid` selectors)
- Link analysis for community notes pages
- Structural pattern recognition for note containers
- ARIA label inspection

**Proposed Note Detection:**
- Button text analysis ("Helpful", "Not helpful")
- Rating UI element identification
- Text pattern matching for rating requests
- Data attribute inspection

**Search Enhancement:**
- URL-based search page detection
- "Following" indicator identification
- DOM reordering for result prioritization

#### 3. Processing Pipeline

```
Page Load → Settings Load → Initial Scan → MutationObserver Setup
    ↓
New Post Detected → Check Whitelist → Detect Notes → Hide if Needed
    ↓
Periodic Re-check → Async Note Detection → Update Display
```

#### 4. Performance Optimization

- **Debouncing**: Prevents excessive processing during rapid DOM changes
- **Selective Re-checking**: Only re-processes posts that haven't been checked recently
- **Efficient Selectors**: Optimized DOM queries to minimize performance impact
- **Lazy Processing**: Processes posts as they become visible

---

## 🔒 Privacy & Security

### Privacy Commitment

This extension is designed with privacy as a core principle:

- ✅ **Local Processing Only**: All detection and processing happens entirely in your browser
- ✅ **No Data Collection**: The extension does not collect, store, or transmit any personal data
- ✅ **No External Connections**: No network requests are made to external servers
- ✅ **No Tracking**: No analytics, tracking pixels, or user behavior monitoring
- ✅ **Open Source**: Full source code available for inspection

### Permissions

The extension requires minimal permissions:

| Permission | Purpose | Required |
|------------|---------|----------|
| `storage` | Store user settings and preferences | Yes |
| `host_permissions` | Access X.com and Twitter.com to inject content scripts | Yes |

### Data Storage

- Settings are stored locally using `chrome.storage.sync`
- Data is encrypted and synced via Chrome's secure sync service
- No data is shared with third parties

---

## 🐛 Troubleshooting

### Common Issues

#### Posts with Community Notes Still Visible

**Possible Causes:**
1. Extension is disabled
2. Settings not loaded yet
3. X has changed their HTML structure
4. Account is whitelisted

**Solutions:**
1. Verify extension is enabled in `chrome://extensions/`
2. Refresh the X/Twitter page
3. Check browser console (F12) for error messages
4. Review whitelist settings
5. Try disabling and re-enabling the extension

#### Search Prioritization Not Working

**Possible Causes:**
1. Feature is disabled in settings
2. Not on a search results page
3. No followed accounts in results

**Solutions:**
1. Verify "Prioritize Followed in Search" is enabled
2. Ensure you're on a search results page (`/search` or `/hashtag`)
3. Check that you're following accounts that appear in results

#### Settings Not Saving

**Possible Causes:**
1. Chrome sync disabled
2. Storage quota exceeded
3. Extension permissions issue

**Solutions:**
1. Check Chrome sync status in `chrome://settings/syncSetup`
2. Clear browser storage if needed
3. Reinstall the extension

### Debug Mode

To enable detailed logging:

1. Open browser console (F12)
2. Look for messages prefixed with `[X Community Note Hider]`
3. These logs provide insight into detection and processing

### Reporting Issues

If you encounter issues not covered here:

1. Check the [Issues](../../issues) page for similar problems
2. Create a new issue with:
   - Chrome version
   - Extension version
   - Steps to reproduce
   - Console error messages (if any)

---

## 💻 Development

### Prerequisites

- Google Chrome (latest version)
- Basic knowledge of JavaScript and Chrome Extension APIs
- Git (for cloning the repository)

### Project Structure

```
X-Community-Note-Hider/
├── manifest.json          # Extension manifest (Manifest V3)
├── content.js            # Main content script for note detection
├── background.js         # Service worker for extension icon handling
├── options.html         # Settings page HTML
├── options.js           # Settings page logic
├── README.md            # This file
└── LICENSE              # MIT License
```

### Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/kalvintousant/X-Community-Note-Hider.git
   cd X-Community-Note-Hider
   ```

2. **Load in Chrome**
   - Follow installation Method 3 above
   - Changes will require extension reload

3. **Making Changes**
   - Edit source files as needed
   - Reload extension in `chrome://extensions/`
   - Test changes on X.com

### Key Files

| File | Purpose |
|------|---------|
| `content.js` | Core detection and hiding logic |
| `background.js` | Extension icon click handler |
| `options.html/js` | Settings page interface |
| `manifest.json` | Extension configuration |

### Code Style

- Follow existing code structure and patterns
- Use JSDoc comments for functions
- Maintain consistent naming conventions
- Add comments for complex logic

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute

1. **Report Bugs**: Open an issue describing the problem
2. **Suggest Features**: Share ideas for improvements
3. **Submit Pull Requests**: Fix bugs or add features
4. **Improve Documentation**: Enhance README or add examples
5. **Test**: Test new versions and report issues

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code of Conduct

- Be respectful and constructive
- Focus on the code, not the person
- Help others learn and improve

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### What This Means

- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ✅ No liability or warranty

---

## 📞 Support

### Getting Help

- **Documentation**: Check this README and code comments
- **Issues**: Browse or create an [issue](../../issues)
- **Releases**: Check [releases](../../releases) for version history

### Version Information

- **Current Version**: 1.1.0
- **Manifest Version**: V3
- **Chrome Minimum**: Latest stable version

---

<div align="center">

**Made with ❤️ for the X community**

[Report Bug](../../issues) · [Request Feature](../../issues) · [View Changelog](../../releases)

</div>
