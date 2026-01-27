# Deployment Guide

## Quick Deployment Options

### Option 1: GitHub Pages (Recommended)

1. **Fork the repository** on GitHub
   - Visit: https://github.com/Demonslayer14323/QRScout-integrator
   - Click "Fork" button

2. **Enable GitHub Pages**
   - Go to your fork's Settings
   - Scroll to "Pages" section
   - Source: Select "Deploy from a branch"
   - Branch: Select "main" and root folder
   - Click Save

3. **Access your app**
   - Your app will be available at: `https://yourusername.github.io/QRScout-integrator/`
   - It updates automatically when you push changes

### Option 2: Netlify (Free)

1. **Connect to Netlify**
   - Visit: https://app.netlify.com
   - Click "New site from Git"
   - Connect your GitHub account
   - Select the QRScout-integrator repo

2. **Configure Build**
   - Build command: (leave empty)
   - Publish directory: . (root)
   - Click "Deploy site"

3. **Access your app**
   - Netlify will provide a URL like: `https://your-site.netlify.app`

### Option 3: Vercel (Free)

1. **Connect to Vercel**
   - Visit: https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect it's a static site

2. **Deploy**
   - Click "Deploy"
   - It will auto-deploy on every push

3. **Access your app**
   - Vercel will provide a URL

### Option 4: Local Server (Development)

```bash
cd /workspaces/QRScout-integrator
./run.sh
```

Or manually:
```bash
python3 -m http.server 8000
```

Visit: `http://localhost:8000`

## Important Notes

### HTTPS Requirement
- Service Workers require HTTPS (except localhost)
- GitHub Pages, Netlify, and Vercel all provide HTTPS by default
- If using custom domain, ensure SSL certificate is installed

### Testing Offline Functionality

1. **In Development (localhost)**
   - Works without HTTPS due to localhost exemption
   - Open DevTools (F12)
   - Go to Application → Service Workers
   - Check "Offline" to test offline mode

2. **In Production**
   - HTTPS is required
   - Same testing process as development

### Apps Script URL

The app comes with a default Apps Script URL. To use your own:

1. Get your deployed Apps Script URL from Google Apps Script
2. Click into the app
3. Paste your URL into the "Apps Script URL" field
4. The URL is automatically saved in your browser

## Troubleshooting Deployment

### Service Worker Not Registering
- Check browser console (F12)
- Ensure site is HTTPS (except localhost)
- Clear site data and reload
- Check that `sw.js` and `manifest.json` are at root

### Data Not Syncing
- Verify Apps Script URL is correct and deployed
- Check browser console for CORS errors
- Try sending test data while online first
- Check Google Sheet has proper headers

### Can't Install PWA
- Requires HTTPS and valid manifest.json
- Some browsers: Check browser settings
- Mobile: Usually "Add to Home Screen" or menu option
- Desktop: Usually a prompt or icon in address bar

## File Checklist for Deployment

Make sure these files are in your repository:
- [ ] `index.html` - Main application
- [ ] `sw.js` - Service Worker
- [ ] `manifest.json` - PWA manifest
- [ ] `README.md` - Documentation
- [ ] `.git` folder - For git tracking

All files should be at the repository root.

## After Deployment

1. **Test the app**
   - Visit your deployed URL
   - Try submitting data online
   - Verify it appears in Google Sheet
   - Test offline mode

2. **Install PWA (Optional)**
   - Desktop: Look for install icon/prompt in browser
   - Mobile: Use "Add to Home Screen" option

3. **Share with your team**
   - The URL works on any device
   - Teammates can access without installation
   - Or they can install as PWA for offline access

## Custom Domain (Optional)

If using GitHub Pages with custom domain:

1. Buy a domain name
2. Go to domain registrar settings
3. Point domain to GitHub Pages:
   - CNAME record: `yourusername.github.io`
   - Or A records to GitHub's IP addresses
4. In your repo Settings → Pages, add custom domain
5. GitHub will auto-configure HTTPS

For Netlify/Vercel custom domains, see their documentation.
