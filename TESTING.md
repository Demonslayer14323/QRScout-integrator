# Testing Guide for Google Sign-In Fix

## Overview
This guide explains how to test the Google Sign-In button functionality after the fix.

## What Was Fixed
The Google Sign-In button now properly waits for the Google library to load before initializing, and gracefully handles failures when the library cannot be loaded (e.g., due to ad blockers or network issues).

## Testing Scenarios

### Scenario 1: Normal Operation (Google Library Loads Successfully)

**Prerequisites:**
- Internet connection
- No ad blockers blocking Google domains
- Modern browser (Chrome, Firefox, Edge, Safari)

**Steps:**
1. Open `index.html` in a browser or navigate to the hosted URL
2. Wait for the page to load completely
3. Observe the "Sign in to Google" button in the top-right status bar
4. Button should be enabled (blue color)

**Expected Results:**
- ✅ No JavaScript errors in console
- ✅ Button text shows "Sign in to Google"
- ✅ Button is clickable (not disabled)

**To Test Sign-In Flow:**
1. Click the "Sign in to Google" button
2. Google OAuth consent screen should appear
3. Select your Google account and grant permissions
4. After successful authentication:
   - Button changes to show your email address
   - Button background turns green
   - Success message appears below the form

### Scenario 2: Library Blocked (Ad Blocker or Network Issue)

**Prerequisites:**
- Ad blocker enabled (uBlock Origin, AdBlock Plus, etc.)
- OR network that blocks Google domains
- OR Developer Tools set to block external scripts

**Steps to Test with Developer Tools:**
1. Open browser Developer Tools (F12)
2. Go to Network tab
3. Add a blocking rule for `accounts.google.com` OR enable "Block requests" for that domain
4. Reload the page
5. Observe the button

**Expected Results:**
- ✅ No JavaScript errors breaking the page
- ✅ Button shows "Sign-in unavailable" (grayed out)
- ✅ Button is disabled
- ✅ Hovering shows tooltip: "Google Sign-In library could not be loaded. Check your internet connection or browser extensions."
- ✅ Clicking the button shows error message: "Google Sign-In is unavailable. Please check your internet connection or disable ad blockers."
- ✅ Rest of the app still works (can still use Apps Script URL method)

### Scenario 3: Slow Network Connection

**Prerequisites:**
- Network throttling enabled in DevTools

**Steps:**
1. Open Developer Tools (F12)
2. Go to Network tab
3. Set throttling to "Slow 3G" or similar
4. Reload the page
5. Observe the button state during loading

**Expected Results:**
- ✅ Button shows "Sign in to Google" initially
- ✅ If you click before library loads, message shows "Loading Google Sign-In... Please wait."
- ✅ After library loads, button becomes functional
- ✅ No errors during the loading process

## Testing in Different Environments

### Local Testing
```bash
# Start a local server
python3 -m http.server 8000

# Or use the provided script
./run.sh

# Open in browser
# http://localhost:8000/index.html
```

### GitHub Pages Testing
If deployed to GitHub Pages:
1. Navigate to `https://yourusername.github.io/QRScout-integrator/`
2. Follow the testing scenarios above

### HTTPS Requirement
Note: Google Sign-In requires HTTPS in production. For local testing, `localhost` is exempt from this requirement.

## Browser Compatibility Testing

Test in multiple browsers to ensure compatibility:
- ✅ Chrome/Chromium (v88+)
- ✅ Firefox (v85+)
- ✅ Safari (v14+)
- ✅ Edge (v88+)
- ✅ Mobile browsers (Chrome Mobile, Safari iOS)

## Console Logs

### Expected Console Logs (Success)
```
(No errors)
```

### Expected Console Logs (Library Blocked)
```
Failed to load resource: net::ERR_BLOCKED_BY_CLIENT
Failed to load Google Sign-In library
```

### Unexpected Console Logs (Indicates a Problem)
```
ReferenceError: google is not defined
Uncaught TypeError: Cannot read property 'accounts' of undefined
```

If you see unexpected errors, the fix may not be working correctly.

## Manual Testing Checklist

- [ ] Page loads without JavaScript errors
- [ ] Button appears in the status bar
- [ ] Button state reflects library load status
- [ ] Successful sign-in updates button to show email
- [ ] Failed library load shows helpful error message
- [ ] Page functionality not dependent on Google Sign-In still works
- [ ] Service worker updates cache correctly (v3)
- [ ] Offline functionality still works
- [ ] Apps Script integration still works as alternative

## Automated Testing

Currently, there are no automated tests. Future improvements could include:
- Unit tests for the authentication flow
- Integration tests with mock Google library
- E2E tests with Playwright or Cypress

## Troubleshooting

### Issue: Button shows "Sign-in unavailable" even though Google is accessible

**Possible Causes:**
1. Browser extension blocking the script
2. Corporate firewall/proxy
3. DNS issues
4. Browser security settings too strict

**Solutions:**
1. Disable browser extensions temporarily
2. Try a different network
3. Check browser security settings
4. Use Apps Script URL method as alternative

### Issue: Button shows "Sign in to Google" but clicking does nothing

**Possible Causes:**
1. Cached old version of the page
2. Service worker serving old cache

**Solutions:**
1. Hard reload the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Unregister service worker (DevTools > Application > Service Workers > Unregister)

### Issue: OAuth popup blocked

**Possible Causes:**
1. Browser popup blocker
2. User gesture not detected

**Solutions:**
1. Allow popups for the site
2. Ensure click event is triggered by actual user interaction

## Reporting Issues

If you encounter issues not covered here:
1. Check browser console for errors
2. Note your browser version and OS
3. Document steps to reproduce
4. Open an issue on GitHub with details

## Additional Notes

- The fix ensures backward compatibility
- No breaking changes to existing functionality
- Graceful degradation when Google Sign-In unavailable
- Apps Script method remains available as fallback
