# X Community Note Hide

A Chrome extension that automatically hides posts with community notes in your X (formerly Twitter) timeline.

## Features

- Automatically detects posts with community notes
- Hides community-noted posts from your timeline
- Works in real-time as you scroll
- Lightweight and non-intrusive

## Installation

### Manual Installation

1. **Download or clone this repository**
   ```bash
   git clone <repository-url>
   cd "X Community Note Hide"
   ```

2. **Open Chrome Extensions page**
   - Open Google Chrome
   - Navigate to `chrome://extensions/`
   - Or go to Menu → Extensions → Manage Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the extension**
   - Click "Load unpacked"
   - Select the folder containing this extension

5. **Optional: Create Extension Icons**
   - The extension references icon files (`icon16.png`, `icon48.png`, `icon128.png`)
   - You can create these icons or the extension will work without them (you'll see a default icon)

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

## Development

To modify or extend the extension:

1. Edit `content.js` to change the detection logic
2. Edit `manifest.json` to update permissions or settings
3. After changes, reload the extension in `chrome://extensions/`

## Publishing to GitHub

If you want to publish this extension to GitHub:

1. **Create a new repository on GitHub**
   - Go to [GitHub.com](https://github.com) and sign in
   - Click the "+" icon in the top-right corner → "New repository"
   - Name your repository (e.g., "x-community-note-hide")
   - Choose public or private
   - **Don't** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

2. **Connect your local repository to GitHub**
   ```bash
   cd "/Users/kalvintousant/Desktop/X Community Note Hide"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
   
   Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

3. **For subsequent updates**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```

**Note**: The repository is already initialized with git and has an initial commit ready.

## License

This project is open source and available for personal use.
