@echo off
echo ========================================
echo FarmGuardian - Firebase Auth Setup
echo ========================================
echo.

echo [1/5] Checking prerequisites...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed or not in PATH
    exit /b 1
)
echo ✓ npm found

echo.
echo [2/5] Installing dependencies (if needed)...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed
    exit /b 1
)
echo ✓ Dependencies installed

echo.
echo [3/5] Checking google-services.json...
if exist "android\app\google-services.json" (
    echo ✓ google-services.json found
) else (
    echo WARNING: google-services.json not found at android\app\
    echo Copying from root directory...
    if exist "google-services.json" (
        copy google-services.json android\app\google-services.json
        echo ✓ google-services.json copied
    ) else (
        echo ERROR: google-services.json not found!
        echo Please ensure google-services.json is in the project root
        exit /b 1
    )
)

echo.
echo [4/5] Cleaning Android build...
cd android
call gradlew clean
if %errorlevel% neq 0 (
    echo ERROR: Gradle clean failed
    cd ..
    exit /b 1
)
cd ..
echo ✓ Android build cleaned

echo.
echo [5/5] Getting SHA-1 fingerprint for Firebase...
echo.
echo ========================================
echo YOUR DEBUG SHA-1 FINGERPRINT:
echo ========================================
cd android
call gradlew signingReport | findstr "SHA1:"
cd ..
echo ========================================
echo.

echo.
echo ========================================
echo Setup Complete! Next Steps:
echo ========================================
echo.
echo 1. Copy the SHA-1 fingerprint above
echo 2. Go to Firebase Console (https://console.firebase.google.com/)
echo 3. Navigate to: Project Settings ^> Your Android App
echo 4. Click "Add Fingerprint" and paste the SHA-1
echo 5. Download the updated google-services.json
echo 6. Replace android\app\google-services.json with the new file
echo.
echo 7. Create Facebook App (if not done):
echo    - Visit: https://developers.facebook.com/
echo    - Create a new app or use existing
echo    - Get App ID and Client Token
echo.
echo 8. Update android\app\src\main\res\values\strings.xml:
echo    Replace YOUR_FACEBOOK_APP_ID with actual App ID
echo    Replace YOUR_FACEBOOK_CLIENT_TOKEN with actual Client Token
echo.
echo 9. Enable authentication in Firebase Console:
echo    - Go to Authentication ^> Sign-in method
echo    - Enable: Email/Password, Google, Facebook
echo.
echo 10. Run the app:
echo     npm run android
echo.
echo ========================================
echo For detailed instructions, see:
echo   - FIREBASE_AUTH_SETUP.md
echo   - AUTHENTICATION_GUIDE.md
echo ========================================
echo.

pause

