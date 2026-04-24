@echo off
echo ========================================
echo FarmGuardian - Release APK Builder
echo ========================================
echo.

REM Check if keystore exists
if not exist "android\app\farmguardian-release.keystore" (
    echo [ERROR] Keystore file not found!
    echo.
    echo Please generate keystore first:
    echo   1. Run: generate-keystore.bat
    echo   2. Or manually: cd android\app ^&^& keytool -genkeypair...
    echo.
    pause
    exit /b 1
)

echo [1/3] Cleaning previous builds...
cd android
call gradlew clean
if %errorlevel% neq 0 (
    echo [ERROR] Clean failed!
    cd ..
    pause
    exit /b 1
)
cd ..
echo Clean completed

echo.
echo [2/3] Building Release APK...
cd android
call gradlew assembleRelease
if %errorlevel% neq 0 (
    echo [ERROR] Build failed!
    cd ..
    pause
    exit /b 1
)
cd ..
echo Build completed

echo.
echo [3/3] Locating APK...
if exist "android\app\build\outputs\apk\release\app-release.apk" (
    echo.
    echo ========================================
    echo SUCCESS! APK Built Successfully
    echo ========================================
    echo.
    echo APK Location:
    echo   android\app\build\outputs\apk\release\app-release.apk
    echo.
    echo Next Steps:
    echo   1. Copy APK to your phone
    echo   2. Install from file manager
    echo   3. Or use: adb install android\app\build\outputs\apk\release\app-release.apk
    echo.
) else (
    echo [ERROR] APK file not found!
    echo Check build errors above.
)

echo.
pause
