# X Community Note Hider

A Chrome extension that automatically hides posts with community notes in your X (formerly Twitter) timeline.

## Features

- ✅ Automatically detects posts with community notes
- ✅ Hides community-noted posts from your timeline
- ✅ Works in real-time as you scroll
- ✅ Lightweight and non-intrusive
- ✅ **Customizable settings** - Enable/disable, whitelist accounts, and more
- ✅ **Settings page** - Beautiful options UI for customization
- ✅ **Manifest V3 compliant** - Ready for Chrome Web Store

## Installation

### Option 1: Download from GitHub Releases (Recommended)

1. **Download the extension**
   - Go to [Releases](../../releases) (or the latest release)
   - Download `X-Community-Note-Hider-v1.0.0.zip`

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

- **MutationObserver**: Watches for new posts as you scroll
- **Community Note Detection**: Identifies posts with community notes through various indicators:
  - Text content mentioning "Community Note"
  - Elements with note-related data attributes
  - Links to community notes pages

## Usage

Once installed, the extension works automatically. No configuration needed!

Just visit X.com or Twitter.com, and any posts with community notes will be automatically hidden from your timeline.

**Want to customize?** Right-click the extension icon → "Options" to access settings.

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

The extension includes customizable settings:

- **Enable/Disable**: Turn the extension on or off completely
- **Note Type Filter**: Choose to hide all notes or only helpful notes
- **Whitelist Accounts**: Add usernames to always show, even with community notes

To access settings:
1. Right-click the extension icon in Chrome
2. Select "Options" (or go to `chrome://extensions/` → find "X Community Note Hider" → click "Options")

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
