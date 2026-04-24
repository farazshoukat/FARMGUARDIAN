# FarmGuardian Android Setup Guide

## Quick Fix for Missing Gradle Wrapper

The Android project needs the Gradle wrapper files. Here's the easiest way to fix it:

### Option 1: Copy from React Native Template (Recommended)

1. **Create a temporary React Native project:**
   ```powershell
   cd "E:\FYP\Mobile app"
   npx @react-native-community/cli init TempProject --skip-install --skip-git-init
   ```

2. **Copy the Android folder:**
   ```powershell
   # Backup your current AndroidManifest.xml
   Copy-Item "App\android\app\src\main\AndroidManifest.xml" "App\android\app\src\main\AndroidManifest.xml.backup"
   
   # Copy the entire android folder
   Remove-Item -Recurse -Force "App\android"
   Copy-Item -Recurse "TempProject\android" "App\android"
   
   # Restore your AndroidManifest.xml with our customizations
   Copy-Item "App\android\app\src\main\AndroidManifest.xml.backup" "App\android\app\src\main\AndroidManifest.xml" -Force
   ```

3. **Update package name in the copied files:**
   - Edit `App\android\app\build.gradle` - change `applicationId` to `"com.farmguardian"`
   - Edit `App\android\app\src\main\AndroidManifest.xml` - ensure package is `"com.farmguardian"`
   - Update Java files path: `android\app\src\main\java\com\yourproject\` → `android\app\src\main\java\com\farmguardian\`

4. **Clean up:**
   ```powershell
   Remove-Item -Recurse -Force "TempProject"
   ```

### Option 2: Manual Gradle Wrapper Setup

If you prefer to keep your current structure, you need to:

1. Download Gradle wrapper files from: https://github.com/gradle/gradle/releases
2. Place `gradlew.bat` and `gradlew` in `android/` folder
3. Place `gradle-wrapper.jar` in `android/gradle/wrapper/` folder
4. Ensure `gradle-wrapper.properties` exists (already created)

### After Setup

Run the app:
```powershell
cd "E:\FYP\Mobile app\App"
npm run android
```

---

## Current Status

✅ AndroidManifest.xml - Fixed with package name  
✅ build.gradle files - Created  
✅ MainActivity.java - Created  
✅ MainApplication.java - Created  
✅ strings.xml - Created  
❌ Gradle wrapper files - Need to be added  

---

**Recommended:** Use Option 1 (copy from template) as it ensures all files are correct.

