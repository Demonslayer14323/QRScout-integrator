<!-- Quick Start Guide - Open this in a browser or read as text -->

# 🚀 QRScout Offline Integrator - Quick Start

## What You Have

A **fully offline-capable web app** that:
- ✅ Works when you're offline
- ✅ Queues data automatically
- ✅ Syncs when connection returns
- ✅ Sends data to Google Sheets
- ✅ Can be installed as a native app

## Try It Now (Local)

```bash
cd /workspaces/QRScout-integrator
./run.sh
```

Then visit: **http://localhost:8000**

## Test Offline Mode

1. Open the app
2. Press **F12** to open Developer Tools
3. Click the **Network** tab
4. Check the **Offline** checkbox
5. Paste test scouting data and click "Send to Google Sheets"
6. You'll see: "Data saved offline"
7. Uncheck **Offline** → data auto-syncs!

## Deploy Online (Pick One)

### Option A: GitHub Pages (Recommended - Free)
```bash
# 1. Fork the repo on GitHub
# 2. Go to Settings → Pages
# 3. Enable Pages from main branch
# 4. Your app is live at: https://yourusername.github.io/QRScout-integrator/
```

### Option B: Netlify (Free)
```bash
# 1. Go to https://app.netlify.com
# 2. Click "New site from Git"
# 3. Select your repo
# 4. Deploy!
```

### Option C: Vercel (Free)
```bash
# 1. Go to https://vercel.com/new
# 2. Import repo
# 3. Deploy!
```

## Use Your Own Apps Script URL

1. Get your deployed Apps Script URL (from your Google Apps Script project)
2. Open the app
3. Paste it into the "Apps Script URL" field
4. Done! (It saves automatically)

## Features

### Online
- Submit data, it goes directly to Google Sheets
- Instant feedback

### Offline
- Submit data, it's saved locally
- Status shows "Offline - Data will be queued"
- Click "Show Queue" to see pending submissions
- When you go online → Auto-sync!

### PWA Installation
- Desktop: Look for install icon in address bar
- Mobile: Use "Add to Home Screen"
- Works like a native app
- Still works offline!

## Troubleshooting

**Service Worker not registering?**
- Need HTTPS (except localhost)
- Refresh the page
- Check console (F12)

**Data not syncing?**
- Check your Apps Script URL
- Verify the Google Sheet is accessible
- Check console errors

**Can't see offline data?**
- Go to DevTools → Application → IndexedDB
- Look for "QRScoutDB"

## Files Explained

| File | Purpose |
|------|---------|
| `index.html` | The app (open in browser) |
| `sw.js` | Offline magic (Service Worker) |
| `manifest.json` | Makes it installable (PWA) |
| `README.md` | Full documentation |
| `DEPLOYMENT.md` | How to deploy |
| `CONFIG.md` | Configuration details |

## Next Steps

1. ✅ Test locally: `./run.sh`
2. ✅ Deploy to GitHub Pages / Netlify / Vercel
3. ✅ Share URL with your team
4. ✅ Start using offline!

## Need Help?

- **Can't deploy?** → Read DEPLOYMENT.md
- **Questions?** → Check README.md
- **Configuration?** → See CONFIG.md
- **Implementation details?** → See IMPLEMENTATION.md

---

**That's it! You now have an offline-capable QRScout integrator!** 🎉
