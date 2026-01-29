# QRScout Integrator Configuration

This file documents the app configuration.

## ⚠️ OAuth Verification Issue

**Getting "Access blocked" error when signing in with Google?**

This app hasn't completed Google's OAuth verification process. See [OAUTH_TROUBLESHOOTING.md](OAUTH_TROUBLESHOOTING.md) for solutions.

**Quick Solution:** Use Apps Script instead of Google Sign-In (see below). It works immediately without verification.

## Apps Script Setup (Recommended ✅)

The **easiest and most reliable method** - no Google Sign-In needed!

### Why Use Apps Script?

- ✅ **No OAuth verification needed**
- ✅ **Works for all users immediately**
- ✅ **No Google Sign-In required**
- ✅ **Simple setup (10 minutes)**
- ✅ **More reliable than OAuth**

### Step 1: Create Apps Script

1. **Open your Google Sheet** where you want to collect data
2. **Go to Extensions → Apps Script**
3. **Delete any existing code** in the editor
4. **Paste this code:**

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet and sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get the data from the POST request
    const data = e.parameter.data;
    
    if (!data) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'No data provided'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parse tab-delimited data into rows
    const rows = data.trim().split('\n').map(row => row.split('\t'));
    
    // Append each row to the sheet
    rows.forEach(row => {
      sheet.appendRow(row);
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: `Successfully added ${rows.length} row(s)`
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional - for testing in the editor)
function testDoPost() {
  const testData = {
    parameter: {
      data: "Team\tMatch\tScore\n1234\t1\t50\n5678\t2\t75"
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
```

5. **Save the project** (give it a name like "QRScout Data Receiver")

### Step 2: Deploy as Web App

1. **Click "Deploy" → "New deployment"**
2. **Click the gear icon ⚙️ → Select "Web app"**
3. **Configure the deployment:**
   - Description: "QRScout Data Integrator" (optional)
   - Execute as: **Me** (your account)
   - Who has access: **Anyone**
4. **Click "Deploy"**
5. **Grant permissions:**
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to [project name] (unsafe)" (it's safe, it's your own script)
   - Click "Allow"
6. **Copy the Web App URL**
   - It looks like: `https://script.google.com/macros/s/AKfycby.../exec`
   - **Save this URL - you'll need it!**

### Step 3: Use in the Integrator

1. **Open the QRScout Integrator app**
2. **Paste your Apps Script URL** in the input field (NOT a Sheet ID)
3. **Paste your QRScout data** in the text area
4. **Click "Send to Google Sheets"**
5. **Check your Google Sheet** - data should appear!

### Testing Your Apps Script

To test if your Apps Script is working:

1. You can run the `testDoPost()` function in the Apps Script editor
2. Check "Execution log" to see the results
3. Or test with curl:
```bash
curl -X POST "YOUR_WEB_APP_URL" -d "data=Test\tData\nRow1\tValue1"
```

## Alternative: Google Sheets Direct Access (OAuth)

⚠️ **Not recommended due to OAuth verification requirements.** Use Apps Script instead.

If you still want to use OAuth with Sheet IDs:

### Requirements

- Must complete Google's OAuth verification process, OR
- Add all users as test users in Google Cloud Console
- See [OAUTH_TROUBLESHOOTING.md](OAUTH_TROUBLESHOOTING.md) for details

### How It Works

1. **Sign in once** with your Google account
2. **Grant permission** to edit your Google Sheets
3. **Access token is stored locally** in your browser
4. **Write directly to Google Sheets** when you have internet connection

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
8. **Data sends when you have internet connection**

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
4. Data is sent directly when you have internet connection

## Testing

### Test Online - Google Sheets API

1. Sign in to Google (click button)
2. Paste your Sheet ID
3. Paste test data
4. Click "Send to Google Sheets"
5. See "Data sent successfully" message
6. Check your Google Sheet - **data appears!** ✅

### Test Online - Apps Script

1. Paste your Apps Script URL
2. Paste test data
3. Click "Send to Google Sheets"
4. See "Data sent successfully" message
5. Check your Google Sheet for new entry

## Troubleshooting

### Service Worker Issues
- Check that `sw.js` loads (check Network tab)
- Verify HTTPS is used (except localhost)
- Clear browser data: Settings → Privacy → Clear browsing data
- Reload page and re-register

### Sending Issues
- Verify Apps Script URL is correct
- Test the URL directly in browser
- Check Google Sheet for CORS headers if needed
- Ensure you have internet connection
- See console (F12) for error messages

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Best support |
| Firefox | ✅ Full | Full support |
| Safari | ⚠️ Partial | PWA works, some API limitations |
| Edge | ✅ Full | Chromium-based |
| Mobile Safari | ⚠️ Partial | PWA limited |
| Android Chrome | ✅ Full | Best on mobile |

## Security Notes

- Your Apps Script URL is stored locally in your browser
- No scouting data leaves your device except when sent to your Apps Script
- Google Apps Script handles Google Sheet access
- Use HTTPS in production for secure connection

## Performance

- First load: ~50KB of assets
- Service Worker cache: ~100KB
- Minimal localStorage usage (just URL)

## Updates

To update the app:
1. Pull latest changes from GitHub
2. Service Worker automatically fetches new version
3. No manual installation needed

## Support

See README.md for troubleshooting and support resources.
