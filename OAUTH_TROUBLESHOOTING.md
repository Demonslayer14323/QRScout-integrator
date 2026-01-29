# Google OAuth Troubleshooting

## "Access blocked: This app has not completed Google verification"

If you're seeing this error when trying to sign in with Google, it means the OAuth app hasn't completed Google's verification process.

### Why This Happens

Google requires OAuth apps that request sensitive scopes (like Google Sheets access) to go through a verification process. Unverified apps can only be used by:
- The app owner
- Users added to the "Test users" list in Google Cloud Console

### Solutions

#### **Solution 1: Use Apps Script (Recommended ✅)**

This is the **easiest and most reliable solution** that doesn't require Google Sign-In or verification:

1. **Create an Apps Script deployment:**
   - Open your Google Sheet
   - Go to Extensions → Apps Script
   - Create a simple web app that accepts data
   - Deploy it as a web app with "Anyone" access
   - Copy the deployment URL (looks like: `https://script.google.com/macros/s/.../exec`)

2. **Use the Apps Script URL in the integrator:**
   - Instead of entering a Sheet ID, paste your Apps Script URL
   - No Google Sign-In required
   - Works immediately without verification

3. **Example Apps Script Code:**
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
```

#### **Solution 2: Add Yourself as a Test User**

If you want to use Google Sign-In with Sheet IDs:

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/apis/credentials/consent
   - Make sure you're in the correct project

2. **Add Test Users:**
   - Find the OAuth consent screen settings
   - Scroll to "Test users" section
   - Click "Add Users"
   - Enter your email address (the one you'll sign in with)
   - Save

3. **Try Signing In Again:**
   - Return to the QRScout Integrator app
   - Click "Sign in to Google"
   - Sign in with the email you added as a test user
   - Grant permissions when prompted
   - You should now be able to access your sheets

**Note:** You can add up to 100 test users. Anyone you add can use the app.

#### **Solution 3: Complete Google Verification (Advanced)**

If you're the app owner and want to make it available to everyone:

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/apis/credentials/consent

2. **Prepare for Verification:**
   - Fill out all required fields in the OAuth consent screen
   - Add app logo, privacy policy URL, terms of service URL
   - Provide a homepage URL
   - Add detailed scope justifications

3. **Submit for Verification:**
   - Click "Submit for Verification"
   - Wait for Google to review (can take weeks)
   - Respond to any questions from Google

4. **After Approval:**
   - All users can sign in without being added as test users
   - No more "unverified app" warnings

## Comparison: Apps Script vs OAuth

| Feature | Apps Script | Google OAuth |
|---------|-------------|--------------|
| **Setup Difficulty** | Easy | Medium |
| **Google Sign-In Required** | No | Yes |
| **Verification Needed** | No | Yes |
| **Works for All Users** | Yes | Only test users (unverified) |
| **Offline Support** | Limited | Better |
| **Reliability** | High | Medium (token expiry) |
| **Recommended For** | Most users | Advanced users |

## Still Having Issues?

### Error: "redirect_uri_mismatch"
- Make sure your app URL is added to "Authorized JavaScript origins" in Google Cloud Console
- The URL must match exactly (including http vs https)

### Error: "invalid_client"
- Your Client ID may be incorrect
- Check that you copied the entire Client ID from Google Cloud Console
- Make sure you're using a "Web application" type credential

### Error: "access_denied"
- You may have clicked "Cancel" during sign-in
- Try signing in again
- Make sure you grant all requested permissions

### Can't Add Test Users
- You need to be the project owner
- Contact the project owner to add you
- Or use Apps Script instead (no test users needed)

## Best Practice Recommendations

For most users, we recommend:

1. **Use Apps Script** for simplicity and reliability
2. Only use direct Sheet ID access if you need offline features
3. If using Sheet IDs, add all team members as test users
4. Consider completing Google verification if you have many users

## Additional Resources

- [Google OAuth Verification Process](https://support.google.com/cloud/answer/9110914)
- [Apps Script Web Apps Guide](https://developers.google.com/apps-script/guides/web)
- [See CONFIG.md for detailed setup instructions](CONFIG.md)
- [See README.md for general usage](README.md)
