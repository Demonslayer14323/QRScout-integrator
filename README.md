# QRScout Standalone Integrator - Offline Edition

A progressive web app (PWA) that allows you to use the QRScout data integrator **completely offline** while maintaining the ability to send data to Google Sheets when you're back online.

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

✅ **Works Completely Offline** - Use the app without internet connection
✅ **Automatic Sync** - Queued data is automatically sent when connection is restored
✅ **Offline Queue Management** - View and manage pending submissions
✅ **PWA Support** - Install as a native app on your device
✅ **No Server Required** - Pure client-side solution using IndexedDB and Service Workers
✅ **Same Google Sheets Integration** - Works with your existing Apps Script URL

## How It Works

### Online Mode
- Data is sent immediately to Google Sheets via the Apps Script endpoint
- Same behavior as the original integrator

### Offline Mode
- Data is automatically saved to the browser's local storage (IndexedDB)
- You can continue collecting and queueing data
- Status bar shows "Offline - Data will be queued"
- View pending submissions in the queue manager

### Automatic Sync
- When your connection is restored, pending submissions automatically sync
- You'll see a success message for each synced submission
- Any failures will remain in the queue for retry

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
   - Online: Data sends immediately
   - Offline: Data is queued and will send when online

4. **Manage Queue**
   - Click "Show Queue" to see pending submissions
   - Delete individual submissions if needed
   - All submissions will attempt to sync when online

## Technical Details

### Technologies Used
- **Service Worker** - Enables offline functionality and caching
- **IndexedDB** - Local database for storing pending submissions
- **Fetch API** - For sending data to Google Sheets
- **Progressive Web App** - installable app manifest

### Storage
- Data is stored locally in your browser only
- No data is sent to any server except your Apps Script endpoint
- Clearing browser data will delete the queue
- Fully privacy-respecting

### Browser Support
- Chrome/Edge: Full support
- Firefox: Full support (IndexedDB may need to be enabled)
- Safari: Partial support (PWA installation works differently)
- Mobile Browsers: Full support

## Development

### File Structure
```
├── index.html          # Main application
├── sw.js              # Service Worker for offline support
├── manifest.json      # PWA manifest
└── README.md          # This file
```

### Key Features in Code

#### Offline Detection
```javascript
window.addEventListener('online', syncPendingSubmissions);
window.addEventListener('offline', updateStatusBar);
```

#### Data Queueing
Uses IndexedDB to store submissions with:
- Data content
- Apps Script URL
- Timestamp
- Sync status

#### Auto-Sync
When connection is restored, all pending submissions are automatically sent in order.

## Troubleshooting

### Service Worker Not Registering
- Requires HTTPS (except localhost)
- Check browser console for errors
- May need to clear site data and reload

### Data Not Syncing
- Check your Apps Script URL is correct
- Verify the Apps Script is deployed and accessible
- Check browser console for network errors
- Try manually clicking buttons when online

### Can't Install as App
- Requires HTTPS and valid manifest.json
- Some browsers have specific PWA requirements
- Try adding to home screen (mobile) or using "Install" menu option

## Credits

Based on the original [QRScout-googlesheets](https://github.com/Demonslayer14323/QRScout-googlesheets) project by Demonslayer14323

Offline functionality added with:
- Service Workers for caching
- IndexedDB for local storage
- Progressive Web App standards

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
2. **Test Offline** - In DevTools, go to Network tab and set throttling to "Offline"
3. **Regular Sync** - Try to sync at least once per week to avoid data loss
4. **Backup** - Keep your Google Sheet up to date as the source of truth
5. **Browser Compatibility** - For best experience, use modern browsers (Chrome 45+, Firefox 44+, Safari 15+, Edge 15+)

## Future Enhancements

Potential improvements:
- Batch sync with progress indicator
- Data compression for queue storage
- QR code scanning directly in the app
- Export/import functionality
- Dark mode
- Conflict resolution for duplicate submissions
