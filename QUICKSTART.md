<!-- Quick Start Guide - Open this in a browser or read as text -->

# 🚀 QRScout Integrator - Quick Start

## What You Have

A **progressive web app (PWA)** that:
- ✅ Can be installed as a native app
- ✅ App interface works offline (cached)
- ✅ Sends data directly to Google Sheets when online
- ✅ Shows clear error messages if sending fails
- ✅ Keeps data in text box for retry if needed

## Try It Now (Local)

```bash
cd /workspaces/QRScout-integrator
./run.sh
```

Then visit: **http://localhost:8000**

## Test the App

1. Open the app
2. Paste test scouting data
3. Click "Send to Google Sheets"
4. With internet: See success message, check your Google Sheet
5. Without internet: See error message, data stays in text box to retry later

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

### When Online
- Submit data, it goes directly to Google Sheets
- Instant success message on successful send
- Error message if sending fails

### When Offline
- App interface still accessible (cached by Service Worker)
- Cannot send data without connection
- Error message shown if you try to send
- Data remains in text box for retry when connection returns

### PWA Installation
- Desktop: Look for install icon in address bar
- Mobile: Use "Add to Home Screen"
- Works like a native app
- App interface cached for offline access

## Troubleshooting

**Service Worker not registering?**
- Need HTTPS (except localhost)
- Refresh the page
- Check console (F12)

**Data not sending?**
- Check internet connection
- Verify your Apps Script URL
- Check console errors (F12)
- Retry when connection is available

## Files Explained

| File | Purpose |
|------|---------|
| `index.html` | The app (open in browser) |
| `sw.js` | Offline caching (Service Worker) |
| `manifest.json` | Makes it installable (PWA) |
| `README.md` | Full documentation |
| `DEPLOYMENT.md` | How to deploy |
| `CONFIG.md` | Configuration details |

## Next Steps

1. ✅ Test locally: `./run.sh`
2. ✅ Deploy to GitHub Pages / Netlify / Vercel
3. ✅ Share URL with your team
4. ✅ Install as PWA for easy access

## Need Help?

- **Can't deploy?** → Read DEPLOYMENT.md
- **Questions?** → Check README.md
- **Configuration?** → See CONFIG.md
- **Implementation details?** → See IMPLEMENTATION.md

---

**That's it! You now have a PWA QRScout integrator!** 🎉
