@echo off
echo ========================================
echo FarmGuardian - Keystore Generator
echo ========================================
echo.
echo This will generate a release keystore for signing your APK.
echo.
echo IMPORTANT:
echo   - Keep the keystore file safe!
echo   - Remember your password!
echo   - You'll need this for future updates!
echo.
echo Press Ctrl+C to cancel, or
pause

cd android\app

echo.
echo Generating keystore...
echo.
echo You'll be asked for:
echo   - Keystore password (remember this!)
echo   - Your name/organization details
echo.

keytool -genkeypair -v -storetype PKCS12 -keystore farmguardian-release.keystore -alias farmguardian -keyalg RSA -keysize 2048 -validity 10000

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Keystore generation failed!
    cd ..\..
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ Keystore Generated Successfully!
echo ========================================
echo.
echo Keystore Location:
echo   android\app\farmguardian-release.keystore
echo.
echo Next Steps:
echo   1. Add keystore info to android\gradle.properties:
echo      MYAPP_RELEASE_STORE_FILE=farmguardian-release.keystore
echo      MYAPP_RELEASE_KEY_ALIAS=farmguardian
echo      MYAPP_RELEASE_STORE_PASSWORD=YourPassword
echo      MYAPP_RELEASE_KEY_PASSWORD=YourPassword
echo.
echo   2. Run: build-release.bat
echo.
echo IMPORTANT: Add gradle.properties to .gitignore!
echo.

cd ..\..

pause

