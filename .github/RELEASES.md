# Creating GitHub Releases for Distribution

## What Developers Typically Do

Most developers use this workflow:

1. **Code stays in GitHub** (not just local)
   - All code is pushed to GitHub repo
   - Multiple developers can collaborate
   - Version history is tracked

2. **Distribute via Releases**
   - Create "Releases" on GitHub
   - Attach ZIP files for easy download
   - Users download and install manually

3. **Optional: Chrome Web Store**
   - Publish to Chrome Web Store for easier installation
   - Still keep code in GitHub for version control

## How to Create a GitHub Release

### Step 1: Prepare the ZIP file

```bash
cd "/Users/kalvintousant/Desktop/X Community Note Hide"
zip -r X-Community-Note-Hide-v1.0.0.zip . -x "*.git*" -x ".DS_Store" -x "*.md" -x ".github/*"
```

### Step 2: Create Release on GitHub

1. Go to your GitHub repository: https://github.com/kalvintousant/X-Community-Note-Hide
2. Click **"Releases"** on the right sidebar
3. Click **"Create a new release"**
4. Fill in:
   - **Tag version**: `v1.0.0` (must match version in manifest.json)
   - **Release title**: `X Community Note Hide v1.0.0`
   - **Description**: 
     ```
     ## Features
     - Automatically hides posts with community notes
     - Works on timeline, profile pages, and search results
     - Real-time detection as you scroll
     
     ## Installation
     1. Download the ZIP file below
     2. Extract it
     3. Go to chrome://extensions/
     4. Enable Developer mode
     5. Click "Load unpacked" and select the extracted folder
     ```
5. Drag and drop your ZIP file to attach it
6. Click **"Publish release"**

### Step 3: Update README with Release Link

The release will be available at:
`https://github.com/kalvintousant/X-Community-Note-Hide/releases`

## Typical Developer Workflow

```
1. Code locally
   ↓
2. Push to GitHub (git push)
   ↓
3. Create Release when ready (v1.0.0)
   ↓
4. Users download ZIP from GitHub Releases
   ↓
5. Make updates, push again
   ↓
6. Create new Release (v1.0.1)
```

## Advantages of GitHub Distribution

✅ **Free** - No $5 fee like Chrome Web Store
✅ **Simple** - Just ZIP and upload
✅ **Open Source** - Users can see the code
✅ **Direct Control** - No review process
✅ **Version Control** - Easy to track changes

## When to Use Chrome Web Store

Use Chrome Web Store if you want:
- One-click installation for users
- Automatic updates
- Wider distribution
- Professional appearance

You can do both - keep code on GitHub AND publish to Chrome Web Store!
