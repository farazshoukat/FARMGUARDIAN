# 🚀 Quick Guide: Build Standalone APK

## ⚡ Fast Track (3 Steps)

### Step 1: Generate Keystore (One-time)
```bash
generate-keystore.bat
```
Or manually:
```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore farmguardian-release.keystore -alias farmguardian -keyalg RSA -keysize 2048 -validity 10000
```

### Step 2: Add Keystore Info
Edit `android/gradle.properties` and add:
```properties
MYAPP_RELEASE_STORE_FILE=farmguardian-release.keystore
MYAPP_RELEASE_KEY_ALIAS=farmguardian
MYAPP_RELEASE_STORE_PASSWORD=YourPasswordHere
MYAPP_RELEASE_KEY_PASSWORD=YourPasswordHere
```

### Step 3: Build APK
```bash
build-release.bat
```

**Done!** APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

---

## 📱 Install on Phone

### Option 1: USB (One-time setup)
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Option 2: Manual
1. Copy APK to phone (USB/Cloud/Email)
2. Open file manager on phone
3. Tap APK file
4. Install

---

## ✅ What You Get

- ✅ Standalone APK (works without USB)
- ✅ Works without `npm start`
- ✅ Works offline
- ✅ Can share with others
- ✅ Like a normal app

---

## 🔄 Update App Later

1. Make your code changes
2. Update version in `android/app/build.gradle`:
   ```gradle
   versionCode 2  // Increment
   versionName "1.0.1"  // Update
   ```
3. Run `build-release.bat` again
4. Install new APK

---

## ⚠️ Important

- **Keep keystore safe!** You need it for updates
- **Remember password!** Can't update without it
- **Don't commit keystore to Git!** (Already in .gitignore)

---

**That's it! You now have a standalone app! 🎉**

