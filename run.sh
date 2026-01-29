#!/bin/bash

# Quick Start Guide for QRScout Offline Integrator

echo "================================================"
echo "QRScout Standalone Integrator - Quick Start"
echo "================================================"
echo ""
echo "Starting local development server..."
echo ""

# Check if port 8000 is available
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "Port 8000 is already in use. Trying port 8001..."
    PORT=8001
else
    PORT=8000
fi

echo "Server will be available at: http://localhost:$PORT"
echo ""
echo "Features:"
echo "  ✓ Works offline with Service Workers (app caching)"
echo "  ✓ Direct send to Google Sheets when online"
echo "  ✓ Error messages on failed sends"
echo "  ✓ Install as PWA on mobile/desktop"
echo ""
echo "To test offline behavior:"
echo "  1. Open DevTools (F12)"
echo "  2. Go to Network tab"
echo "  3. Check 'Offline' checkbox"
echo "  4. Try submitting data - you'll see an error"
echo "  5. Uncheck 'Offline' and retry - data will send"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================================"
echo ""

python3 -m http.server $PORT --directory /workspaces/QRScout-integrator
