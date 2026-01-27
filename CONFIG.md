# QRScout Integrator Configuration

This file documents the offline app configuration.

## Applications Script Setup

### Getting Your Apps Script URL

1. Open your QRScout-googlesheets Google Apps Script project
2. Click "Deploy" → "New Deployment"
3. Type: Select "Web app"
4. Execute as: Your email
5. Who has access: Anyone
6. Click "Deploy"
7. Copy the deployment URL (format: `https://script.google.com/macros/s/...`)

### Setting the URL

The app comes pre-configured with an example URL. To use your own:

1. Open the app
2. Paste your Apps Script URL in the "Apps Script URL" field
3. The URL is saved locally in your browser

## Testing

### Test Online Submission

1. Start the app and ensure you're online
2. Paste test scouting data
3. Click "Send to Google Sheets"
4. Check your Google Sheet for new entry

### Test Offline Mode

1. Open DevTools (F12)
2. Go to Network tab
3. Check "Offline" checkbox
4. Paste test data and click "Send to Google Sheets"
5. You should see "Data saved offline" message
6. Uncheck "Offline" and data should auto-sync

### Test Service Worker

1. Open DevTools (F12)
2. Go to Application tab
3. Service Workers section shows registration status
4. Manifest shows installed manifest.json

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
