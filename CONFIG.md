# QRScout Integrator Configuration

This file documents the offline app configuration.

## Google Sheets Direct Access Setup (Recommended for Offline)

The app now supports **direct offline writing to Google Sheets** using OAuth 2.0 authentication!

### How It Works

1. **Sign in once** with your Google account
2. **Grant permission** to edit your Google Sheets
3. **Access token is stored locally** in your browser
4. **Write directly to Google Sheets offline** - no internet needed after initial setup
5. **Data syncs automatically** when connection returns

### Step 1: Create OAuth 2.0 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google Sheets API":
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click it and press "Enable"
4. Create OAuth consent screen:
   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" user type
   - Fill in app name: "QRScout Integrator"
   - Add your email as test user
5. Create OAuth credentials:
   - Go to "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Type: "Web application"
   - Authorized JavaScript origins: Add your app URL (e.g., `http://localhost:8000`, `https://yourusername.github.io`)
   - Save your Client ID

### Step 2: Update the App Configuration

1. Open `index.html` in a text editor
2. Find this line (around line 214):
   ```javascript
   const CLIENT_ID = ''; // Will be set by user or use a generic one
   ```
3. Replace with your Client ID:
   ```javascript
   const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
   ```
4. Save the file

### Step 3: Get Your Google Sheet ID

1. Open your Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
3. Copy the `SHEET_ID` part (long string of letters and numbers)

### Step 4: Use the App

1. Open the app
2. Click "Sign in to Google" button (top right)
3. Follow the Google login flow
4. Grant permission to edit Google Sheets
5. Paste your **Google Sheet ID** (not URL) in the input field
6. Paste your scouting data
7. Click "Send to Google Sheets"
8. **Data sends immediately** - even if you go offline!

## Alternative: Apps Script Setup

If you prefer using Apps Script instead:

### Getting Your Apps Script URL

1. Open your QRScout-googlesheets Google Apps Script project
2. Click "Deploy" → "New Deployment"
3. Type: Select "Web app"
4. Execute as: Your email
5. Who has access: Anyone
6. Click "Deploy"
7. Copy the deployment URL (format: `https://script.google.com/macros/s/...`)

### Using with Apps Script

1. Paste your Apps Script URL in the input field
2. Paste your scouting data
3. Click "Send to Google Sheets"
4. Data queues offline and syncs when connection returns

## Testing

### Test Online - Google Sheets API

1. Sign in to Google (click button)
2. Paste your Sheet ID
3. Paste test data
4. Click "Send to Google Sheets"
5. See "Data sent successfully" message
6. Check your Google Sheet - **data appears instantly!** ✅

### Test Offline - Google Sheets API

1. Sign in to Google first (connection must be on)
2. Open DevTools (F12)
3. Network tab → Check "Offline"
4. Paste your Sheet ID
5. Paste test data
6. Click "Send to Google Sheets"
7. See "Data sent successfully" message **even though you're offline!** ✅
8. Check your Sheet - data is there!

### Test Online - Apps Script

1. Paste your Apps Script URL
2. Paste test data
3. Click "Send to Google Sheets"
4. See "Data sent successfully" message
5. Check your Google Sheet for new entry

### Test Offline - Apps Script

1. Open DevTools (F12)
2. Network tab → Check "Offline"
3. Paste test data and click "Send to Google Sheets"
4. You should see "Data queued" message
5. Go back online
6. See "Sent X queued submissions" message
7. Check your Google Sheet

## Troubleshooting


### Service Worker Issues
- Check that `sw.js` loads (check Network tab)
- Verify HTTPS is used (except localhost)
- Clear browser data: Settings → Privacy → Clear browsing data
- Reload page and re-register

### IndexedDB Issues
- Check that IndexedDB is enabled in browser
- Go to Application → IndexedDB → QRScoutDB
- You should see "submissions" object store

### Sync Issues
- Verify Apps Script URL is correct
- Test the URL directly in browser
- Check Google Sheet for CORS headers if needed
- See console (F12) for error messages

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Best support |
| Firefox | ✅ Full | IndexedDB must be enabled |
| Safari | ⚠️ Partial | PWA works, some API limitations |
| Edge | ✅ Full | Chromium-based |
| Mobile Safari | ⚠️ Partial | PWA limited |
| Android Chrome | ✅ Full | Best on mobile |

## Security Notes

- All data is stored locally in your browser
- No data leaves your device except to your Apps Script
- Google Apps Script handles Google Sheet access
- Use HTTPS in production for secure connection
- Clear browser data if you want to delete stored submissions

## Performance

- First load: ~50KB of assets
- Service Worker cache: ~100KB
- IndexedDB storage: No limit (device dependent)
- Typical submission: <10KB stored

## Updates

To update the app:
1. Pull latest changes from GitHub
2. Service Worker automatically fetches new version
3. Existing offline data persists
4. No manual installation needed

## Support

See README.md for troubleshooting and support resources.
