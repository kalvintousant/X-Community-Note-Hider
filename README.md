# X Community Note Hider

A Chrome extension that automatically hides posts with community notes in your X (formerly Twitter) timeline.

## Features

### Core Features
- ✅ Automatically detects posts with community notes
- ✅ **Detects proposed community notes** - Hides posts where you're asked to rate a proposed note
- ✅ Hides community-noted posts from your timeline
- ✅ Works in real-time as you scroll
- ✅ Handles async-loaded notes - Re-checks posts as community notes load
- ✅ Lightweight and non-intrusive
- ✅ **Customizable settings** - Enable/disable, whitelist accounts, hide proposed notes, and more
- ✅ **Settings page** - Beautiful dark-themed options UI matching X's design
- ✅ **Manifest V3 compliant** - Ready for Chrome Web Store

### v1.1 Features
- ✅ **Prioritize Followed Accounts in Search** - Automatically shows accounts you follow at the top of search results
- ✅ **Extension Icon Click** - Click the extension icon in the toolbar to quickly open settings

## Installation

### Option 1: Download from GitHub Releases (Recommended)

1. **Download the extension**
   - Go to [Releases](../../releases) (or the latest release)
   - Download `X-Community-Note-Hider-v1.1.0.zip` (or latest version)

2. **Extract the ZIP file**

3. **Install in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select the extracted folder

### Option 2: Clone from GitHub

1. **Clone this repository**
   ```bash
   git clone https://github.com/kalvintousant/X-Community-Note-Hider.git
   cd X-Community-Note-Hider
   ```

2. **Install in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select the cloned folder

## How It Works

The extension monitors your X timeline and automatically hides any posts that have community notes attached. It uses:

- **MutationObserver**: Watches for new posts as you scroll and detects changes within existing posts
- **Community Note Detection**: Identifies posts with community notes through multiple detection methods:
  - Text content mentioning "Community Note" or "Readers added context"
  - Elements with note-related data attributes
  - Links to community notes pages
  - Structural patterns X uses for note containers
- **Proposed Note Detection**: Detects posts where you're asked to rate a proposed community note:
  - Identifies "Helpful" and "Not helpful" rating buttons
  - Text patterns indicating note rating requests
  - Rating-related UI elements
- **Async Loading Support**: Re-checks posts periodically to catch community notes that load after the initial page render
- **Search Enhancement (v1.1)**: Automatically reorders search results to prioritize accounts you follow:
  - Detects when you're on a search results page
  - Identifies followed accounts using "Following" indicators
  - Reorders results in real-time as new results load

## Usage

Once installed, the extension works automatically. No configuration needed!

Just visit X.com or Twitter.com, and any posts with community notes will be automatically hidden from your timeline.

**Want to customize?** Click the extension icon in your toolbar or right-click → "Options" to access settings.

## Troubleshooting

If posts with community notes aren't being hidden:

1. Make sure the extension is enabled in Chrome
2. Refresh the X/Twitter page
3. Check the browser console (F12) for any error messages
4. X may have changed their HTML structure - the extension may need updates

## Privacy

This extension:
- ✅ Only runs on X.com and Twitter.com
- ✅ Doesn't collect or send any data
- ✅ Works entirely locally in your browser
- ✅ No external connections or tracking

## Settings

The extension includes customizable settings with a dark-themed UI matching X's design:

- **Enable/Disable**: Turn the extension on or off completely
- **Hide Proposed Community Notes**: Toggle to hide posts where you're asked to rate a proposed community note (enabled by default)
- **Prioritize Followed Accounts in Search (v1.1)**: Toggle to show accounts you follow at the top of search results (enabled by default)
- **Note Type Filter**: Choose to hide all notes or only helpful notes
- **Whitelist Accounts**: Add usernames to always show, even with community notes

To access settings:
1. **Click the extension icon** in your Chrome toolbar (v1.1), or
2. Right-click the extension icon → "Options", or
3. Go to `chrome://extensions/` → find "X Community Note Hider" → click "Options"

## Development

To modify or extend the extension:

1. Edit `content.js` to change the detection logic
2. Edit `manifest.json` to update permissions or settings
3. Edit `options.html` and `options.js` to customize the settings page
4. After changes, reload the extension in `chrome://extensions/`

## Technical Details

- **Manifest Version**: V3 (required for new Chrome extensions)
- **Permissions**: Uses `storage` for settings and `host_permissions` for X.com/Twitter.com
- **Storage**: Settings are synced across devices via `chrome.storage.sync`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
