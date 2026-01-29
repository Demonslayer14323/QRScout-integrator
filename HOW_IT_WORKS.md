# How Data Sending Works

## YES - The App DOES Send Data to Google Sheets! ✅

This document explains how the QRScout Integrator sends data to Google Sheets.

## Quick Answer

**When you click "Send to Google Sheets":**
1. ✅ The app validates your data and URL
2. ✅ Checks you're online
3. ✅ Parses your tab-delimited data into rows
4. ✅ Sends an HTTP POST request to your Apps Script or Google Sheets API
5. ✅ Your data appears in your Google Sheet immediately

## Two Methods Available

### Method 1: Apps Script URL (Recommended) ⭐

**Why it's recommended:**
- No Google Sign-In required
- Works for everyone immediately
- Simple setup
- More reliable

**How it works:**
```
Your Browser → HTTP POST → Apps Script → Google Sheets
```

**Code that sends the data:**
```javascript
async function sendViaAppsScript(scriptUrl, data) {
    const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            data: data  // Your tab-delimited scouting data
        })
    });
    
    const result = await response.json();
    return result.success === true;
}
```

**What happens:**
1. Data is URL-encoded
2. POST request sent to your Apps Script
3. Apps Script receives data
4. Apps Script parses rows and tabs
5. Apps Script appends rows to your Google Sheet
6. Apps Script returns `{success: true}` or `{success: false}`
7. You see success or error message

### Method 2: Google Sheets API

**Requires:**
- Google Sign-In
- OAuth permissions

**How it works:**
```
Your Browser → Google Sheets API → Your Google Sheet
```

**Code that sends the data:**
```javascript
async function writeToGoogleSheets(spreadsheetId, data, range = 'Sheet1!A:Z') {
    const values = parseDataToRows(data);
    
    const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                values: values
            })
        }
    );
    
    return response.json();
}
```

**What happens:**
1. Data is parsed into 2D array
2. POST request sent to Google Sheets API
3. API validates your OAuth token
4. API appends rows to your sheet
5. API returns update information
6. You see success message

## Data Format

**Input (Tab-Delimited):**
```
Team	Match	Score	Notes
254	Q1	100	Great robot
1114	Q2	95	Fast autonomous
```

**After Parsing:**
```javascript
[
  ["Team", "Match", "Score", "Notes"],
  ["254", "Q1", "100", "Great robot"],
  ["1114", "Q2", "95", "Fast autonomous"]
]
```

**In Google Sheets:**
| Team | Match | Score | Notes            |
|------|-------|-------|------------------|
| 254  | Q1    | 100   | Great robot      |
| 1114 | Q2    | 95    | Fast autonomous  |

## Step-by-Step: What Happens When You Click Send

### Step 1: Validation
```javascript
if (!data) {
    return "Please paste some data first!";
}

if (!scriptUrl) {
    return "Please enter a Google Sheet ID or Apps Script URL!";
}
```

### Step 2: Online Check
```javascript
if (!navigator.onLine) {
    return "⚠️ No internet connection. Please connect to the internet and try again.";
}
```

### Step 3: Format Detection
```javascript
if (scriptUrl.length === 44 && !scriptUrl.includes('/')) {
    // It's a Sheet ID - use Google Sheets API
    method = 'sheets-api';
    success = await sendViaGoogleSheetsAPI(scriptUrl, data);
} else if (scriptUrl.includes('script.google.com')) {
    // It's an Apps Script URL
    method = 'apps-script';
    success = await sendViaAppsScript(scriptUrl, data);
}
```

### Step 4: Data Parsing
```javascript
function parseDataToRows(data) {
    const lines = data.trim().split('\n');
    return lines.map(line => line.split('\t'));
}
```

Example:
- Input: `"Team\tMatch\n254\tQ1"`
- Output: `[["Team", "Match"], ["254", "Q1"]]`

### Step 5: HTTP Request
**Apps Script:**
```http
POST https://script.google.com/macros/s/YOUR_ID/exec
Content-Type: application/x-www-form-urlencoded

data=Team%09Match%0A254%09Q1
```

**Google Sheets API:**
```http
POST https://sheets.googleapis.com/v4/spreadsheets/SHEET_ID/values/Sheet1!A:Z:append?valueInputOption=USER_ENTERED
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "values": [
    ["Team", "Match"],
    ["254", "Q1"]
  ]
}
```

### Step 6: Response Handling
```javascript
if (success) {
    message.innerHTML = '✓ Data sent successfully to Google Sheets!';
    document.getElementById('data').value = '';  // Clear data
} else {
    message.innerHTML = '✗ Failed to send data. Please check your connection and try again.';
}
```

## Error Handling

The app handles these scenarios:

### Offline
```
⚠️ No internet connection. Please connect to the internet and try again.
Data will NOT be sent automatically when connection returns.
```

### Missing Data
```
Please paste some data first!
```

### Missing URL
```
Please enter a Google Sheet ID or Apps Script URL!
```

### Invalid Format
```
Invalid Sheet ID or Apps Script URL format!
```

### Network Error
```
✗ Failed to send data. Please check your connection and try again.
```

### Authentication Error (Sheets API)
```
Not signed in to Google. Please sign in first.
```

## Testing That It Works

### Test 1: With Apps Script

1. Set up your Apps Script (see CONFIG.md)
2. Deploy and get the URL
3. Open the integrator app
4. Paste your Apps Script URL
5. Paste test data:
   ```
   Team	Match	Score
   254	Q1	100
   ```
6. Click "Send to Google Sheets"
7. See: "✓ Data sent successfully to Google Sheets (apps-script)!"
8. **Check your Google Sheet - data appears!** ✅

### Test 2: With Google Sheets API

1. Sign in to Google (click button)
2. Paste your Sheet ID (44 characters)
3. Paste test data
4. Click "Send to Google Sheets"
5. See: "✓ Data sent successfully to Google Sheets (sheets-api)!"
6. **Check your Google Sheet - data appears!** ✅

## Network Inspection

To see the actual HTTP requests:

1. Open DevTools (F12)
2. Go to Network tab
3. Click "Send to Google Sheets"
4. See the POST request
5. Click on it to view:
   - Request headers
   - Request payload
   - Response

## Common Questions

### Q: Does it work offline?
**A:** The **app interface** works offline, but **sending data requires internet**. You can prepare data offline and send it when connection returns.

### Q: Is my data stored anywhere?
**A:** No. Data is only in your browser's textarea. It's sent directly to Google Sheets when you click send. Nothing is stored locally.

### Q: What if sending fails?
**A:** The data stays in the textarea. You can click send again when you fix the issue.

### Q: Can I send the same data multiple times?
**A:** Yes, but it will create duplicate entries in your Google Sheet each time.

### Q: Does it validate my data format?
**A:** No. It sends whatever you paste. Make sure your data is tab-delimited.

### Q: How fast is it?
**A:** Usually 1-3 seconds depending on your internet connection and the size of the data.

## Code References

All sending code is in `index.html`:

- **Main function:** `sendToSheets()` (line 488)
- **Apps Script:** `sendViaAppsScript()` (line 576)
- **Sheets API:** `writeToGoogleSheets()` (line 410)
- **Data parsing:** `parseDataToRows()` (line 450)

## Summary

✅ **The app DOES send data to Google Sheets**
✅ **Two methods available** (Apps Script recommended)
✅ **Fully functional implementation**
✅ **Proper error handling**
✅ **Clear user feedback**
✅ **Data appears immediately** in your Google Sheet when sent successfully

For setup instructions, see [CONFIG.md](CONFIG.md).
For troubleshooting, see [README.md](README.md).
