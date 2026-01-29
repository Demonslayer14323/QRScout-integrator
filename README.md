# QRScout Standalone Integrator - PWA Edition

A progressive web app (PWA) that allows you to use the QRScout data integrator as an installable app with offline caching and direct Google Sheets integration.

## 🎯 Does It Send Data to Google Sheets?

**YES! ✅** This app **DOES send data to Google Sheets** when you have an internet connection.

- ✅ **Two methods available:** Apps Script URL (recommended) or Google Sheets API
- ✅ **Fully functional implementation** with proper error handling
- ✅ **Data appears immediately** in your Google Sheet upon successful send
- ✅ **See [HOW_IT_WORKS.md](HOW_IT_WORKS.md)** for complete technical details

**Quick Start:**
1. Set up your Apps Script using [CONFIG.md](CONFIG.md)
2. Paste your Apps Script URL in the app
3. Paste your data
4. Click "Send to Google Sheets"
5. **Done! Your data is in Google Sheets** 🎉

## ⚠️ Important: Google OAuth Issue

**If you get "Access blocked: This app has not completed Google verification"** when signing in:

This is expected! The app hasn't completed Google's OAuth verification process. **You have two options:**

1. **✅ Use Apps Script (Recommended):** No Google Sign-In needed, works immediately
   - See [CONFIG.md](CONFIG.md) for Apps Script setup instructions
   - This is the easiest and most reliable method

2. **Add yourself as a test user:** If you want to use Google Sign-In
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials/consent)
   - Add your email to "Test users"
   - See [OAUTH_TROUBLESHOOTING.md](OAUTH_TROUBLESHOOTING.md) for detailed instructions

**For most users, we recommend using Apps Script instead of Google Sign-In.**

## Features

✅ **PWA Support** - Install as a native app on your device
✅ **Offline App Caching** - App interface works without internet connection
✅ **Direct Sheets Integration** - Send data directly to Google Sheets when online
✅ **No Server Required** - Pure client-side solution using Service Workers for app caching
✅ **Apps Script Integration** - Works with your existing Apps Script URL
✅ **Error Handling** - Clear error messages if sending fails

## How It Works

### Online Mode
- Data is sent immediately to Google Sheets via the Apps Script endpoint
- You'll see a success message when data is sent
- If sending fails, you'll see an error message

### Offline Mode
- The app interface remains accessible (cached by Service Worker)
- Data cannot be sent without an internet connection
- You'll see an error message if you try to send while offline
- Data stays in the text box for you to retry when connection returns

## Installation & Usage

### Option 1: Local Development
```bash
# Clone the repository
git clone https://github.com/Demonslayer14323/QRScout-integrator.git
cd QRScout-integrator

# Serve locally (requires Python 3)
python3 -m http.server 8000

# Or with Node.js http-server
npx http-server

# Visit http://localhost:8000
```

### Option 2: GitHub Pages
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Access it at `https://yourusername.github.io/QRScout-integrator/`

### Option 3: Static File Hosting
Deploy the files to any static hosting service:
- Netlify
- Vercel
- Firebase Hosting
- AWS S3
- Any standard web server

## Configuration

### Apps Script URL
1. Get your deployed Apps Script URL from your original QRScout-googlesheets setup
2. Paste it into the "Apps Script URL" field in the app
3. The URL is saved in your browser for future use

## Using the App

1. **Install (Optional)** 
   - On mobile/desktop: Use the "Install" option from your browser menu
   - Opens as a standalone app

2. **Collect Data**
   - Use QRScout as usual to generate QR codes
   - Copy the data string

3. **Submit Data**
   - Paste data into the text area
   - Click "Send to Google Sheets"
   - Online: Data sends immediately with success message
   - Offline: Error message shown, data stays in text box for retry

## Technical Details

### Technologies Used
- **Service Worker** - Enables offline app caching
- **Fetch API** - For sending data to Google Sheets
- **Progressive Web App** - installable app manifest

### Storage
- Only your Apps Script URL is saved in browser localStorage
- No scouting data is stored locally
- Data is only sent when you click "Send to Google Sheets" with internet connection
- Fully privacy-respecting

### Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Partial support (PWA installation works differently)
- Mobile Browsers: Full support

## Development

### File Structure
```
├── index.html          # Main application
├── sw.js              # Service Worker for offline app caching
├── manifest.json      # PWA manifest
└── README.md          # This file
```

### Key Features in Code

#### Service Worker Caching
```javascript
// Caches app assets for offline access to the app interface
self.addEventListener('install', cacheAppAssets);
self.addEventListener('fetch', serveCachedAssets);
```

#### Direct Send
- Data is sent directly to Google Sheets when you click the button
- Errors are displayed if sending fails
- No automatic retry or queueing

## Troubleshooting

### Service Worker Not Registering
- Requires HTTPS (except localhost)
- Check browser console for errors
- May need to clear site data and reload

### Data Not Sending
- Ensure you have an internet connection
- Check your Apps Script URL is correct
- Verify the Apps Script is deployed and accessible
- Check browser console for network errors

### Can't Install as App
- Requires HTTPS and valid manifest.json
- Some browsers have specific PWA requirements
- Try adding to home screen (mobile) or using "Install" menu option

## Credits

Based on the original [QRScout-googlesheets](https://github.com/Demonslayer14323/QRScout-googlesheets) project by Demonslayer14323

PWA functionality added with:
- Service Workers for app caching
- Progressive Web App standards
- Installable app manifest

## License

Same as original QRScout-googlesheets project

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review browser console logs (F12 → Console)
3. Open an issue on GitHub
4. Contact the maintainer

## Tips for Best Results

1. **Use HTTPS** - Service Workers require secure context (HTTPS) except on localhost
2. **Stay Online** - Ensure internet connection when sending data to Google Sheets
3. **Check Errors** - If sending fails, read the error message and retry when online
4. **Browser Compatibility** - For best experience, use modern browsers (Chrome 45+, Firefox 44+, Safari 15+, Edge 15+)

## Future Enhancements

Potential improvements:
- QR code scanning directly in the app
- Batch data submission
- Data validation before sending
- Export functionality
- Dark mode
