# Building Release APK - Standalone App

This guide will help you build a standalone APK that can be installed on any Android phone without USB cable or Metro bundler.

---

## 🎯 What You'll Get

After following this guide, you'll have:
- ✅ A standalone APK file
- ✅ Works without USB cable
- ✅ Works without `npm start`
- ✅ Works like a normal app from Play Store
- ✅ Can be shared with others

---

## 📋 Step-by-Step Guide

### Step 1: Generate Release Keystore (One-time setup)

Open PowerShell/Terminal in your project root and run:

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore farmguardian-release.keystore -alias farmguardian -keyalg RSA -keysize 2048 -validity 10000
```

**You'll be asked for:**
- **Keystore password:** (Enter a strong password, remember it!)
- **Re-enter password:** (Enter same password)
- **Your name:** Your name or company name
- **Organizational Unit:** (Optional, press Enter)
- **Organization:** (Optional, press Enter)
- **City:** Your city
- **State/Province:** Your state
- **Country code:** PK (for Pakistan) or your country code

**Important:** Save the keystore password somewhere safe! You'll need it for future updates.

---

### Step 2: Configure Release Build

I'll update your `android/app/build.gradle` to use the keystore for release builds.

---

### Step 3: Build Release APK

```bash
cd android
./gradlew assembleRelease
```

This will create the APK at:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

### Step 4: Install on Phone

**Option A: Transfer via USB (one time)**
1. Connect phone via USB
2. Enable USB debugging
3. Copy `app-release.apk` to phone
4. Install from phone's file manager

**Option B: Transfer via Cloud/Email**
1. Upload APK to Google Drive/Dropbox
2. Download on phone
3. Install from phone

**Option C: Direct Install**
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

---

## 🔧 Detailed Instructions

### Generate Keystore (Detailed)

```bash
# Navigate to android/app directory
cd android/app

# Generate keystore
keytool -genkeypair -v -storetype PKCS12 -keystore farmguardian-release.keystore -alias farmguardian -keyalg RSA -keysize 2048 -validity 10000
```

**Example:**
```
Enter keystore password: MySecurePassword123!
Re-enter password: MySecurePassword123!
What is your first and last name?
  [Unknown]:  FarmGuardian Developer
What is the name of your organizational unit?
  [Unknown]:  Development
What is the name of your organization?
  [Unknown]:  FarmGuardian
What is the name of your City or Locality?
  [Unknown]:  Lahore
What is the name of your State or Province?
  [Unknown]:  Punjab
What is the two-letter country code for this unit?
  [Unknown]:  PK
```

**Result:** `farmguardian-release.keystore` file created in `android/app/`

---

### Configure build.gradle

The keystore configuration will be added to `android/app/build.gradle`:

```gradle
signingConfigs {
    debug {
        storeFile file('debug.keystore')
        storePassword 'android'
        keyAlias 'androiddebugkey'
        keyPassword 'android'
    }
    release {
        if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
}
```

And in `buildTypes`:
```gradle
release {
    signingConfig signingConfigs.release
    minifyEnabled false
    proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
}
```

---

### Create gradle.properties

Create/update `android/gradle.properties`:

```properties
MYAPP_RELEASE_STORE_FILE=farmguardian-release.keystore
MYAPP_RELEASE_KEY_ALIAS=farmguardian
MYAPP_RELEASE_STORE_PASSWORD=YourKeystorePassword
MYAPP_RELEASE_KEY_PASSWORD=YourKeystorePassword
```

**⚠️ Security Note:** Add `gradle.properties` to `.gitignore` to avoid committing passwords!

---

## 🚀 Quick Build Script

I'll create a script to automate the build process.

---

## 📱 Installing APK on Phone

### Method 1: Direct Install (USB)
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Method 2: Manual Install
1. Copy `app-release.apk` to phone
2. Open file manager on phone
3. Tap on APK file
4. Allow "Install from Unknown Sources" if prompted
5. Tap Install

### Method 3: Share via Cloud
1. Upload APK to Google Drive
2. Share link
3. Download on phone
4. Install

---

## 🔄 Updating the App

When you make changes and want to build a new version:

1. **Update version code** in `android/app/build.gradle`:
   ```gradle
   versionCode 2  // Increment this
   versionName "1.0.1"  // Update version name
   ```

2. **Build new APK:**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. **Install on phone** (same as before)

---

## 🎯 Benefits of Release Build

✅ **Standalone:** Works without Metro bundler  
✅ **Offline:** Works without internet  
✅ **Fast:** Optimized and minified  
✅ **Secure:** Signed with your keystore  
✅ **Shareable:** Can be shared with others  
✅ **Production-ready:** Like Play Store apps  

---

## ⚠️ Important Notes

### Keystore Security
- **Never lose your keystore file!** Keep backups
- **Never commit keystore to Git!** Add to `.gitignore`
- **Remember your password!** You'll need it for updates
- **Keep keystore safe!** You can't update app without it

### Version Management
- Increment `versionCode` for each new build
- Update `versionName` for user-friendly version
- Higher versionCode = newer version

### Testing
- Test release build thoroughly before sharing
- Release builds are optimized (may behave differently than debug)
- Some debug features won't work in release

---

## 🐛 Troubleshooting

### Error: "Keystore file not found"
- Make sure keystore is in `android/app/` directory
- Check file name matches in `gradle.properties`

### Error: "Wrong password"
- Double-check password in `gradle.properties`
- Make sure no extra spaces

### Error: "APK not installing"
- Uninstall old version first
- Check if "Install from Unknown Sources" is enabled
- Try: `adb install -r app-release.apk` (reinstall)

### Error: "App crashes on launch"
- Check if all native modules are properly linked
- Verify Firebase configuration
- Check logs: `adb logcat`

---

## 📊 Build Sizes

**Debug APK:** ~50-80 MB (includes debug symbols)  
**Release APK:** ~20-40 MB (optimized, smaller)

---

## ✅ Checklist

Before building release:
- [ ] Keystore generated
- [ ] `gradle.properties` configured
- [ ] `build.gradle` updated
- [ ] Version code incremented
- [ ] App tested in debug mode
- [ ] Firebase configured
- [ ] All features working

After building:
- [ ] APK file created
- [ ] APK installed on phone
- [ ] App launches successfully
- [ ] All features work
- [ ] No crashes
- [ ] Performance is good

---

## 🎉 Success!

Once you have the APK:
- ✅ Install on your phone
- ✅ Works without USB
- ✅ Works without `npm start`
- ✅ Share with others
- ✅ Deploy to Play Store (when ready)

---

**Next Steps:**
1. Follow Step 1-4 above
2. Build your first release APK
3. Install and test
4. Share with users!

---

**Need Help?** Check the troubleshooting section or review the error messages.

