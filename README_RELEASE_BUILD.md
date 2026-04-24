# 📦 Building Standalone Release APK

## 🎯 Goal
Build an APK that works **without USB cable** and **without `npm start`** - like a normal app from Play Store!

---

## ⚡ Quick Start (3 Commands)

### 1️⃣ Generate Keystore (One-time only)
```bash
generate-keystore.bat
```
**Or manually:**
```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore farmguardian-release.keystore -alias farmguardian -keyalg RSA -keysize 2048 -validity 10000
```

**When prompted:**
- Enter a **strong password** (remember it!)
- Enter your name/organization details
- Country code: `PK` (or your country)

---

### 2️⃣ Configure Keystore

Edit `android/gradle.properties` and add these lines at the end:

```properties
MYAPP_RELEASE_STORE_FILE=farmguardian-release.keystore
MYAPP_RELEASE_KEY_ALIAS=farmguardian
MYAPP_RELEASE_STORE_PASSWORD=YourActualPassword
MYAPP_RELEASE_KEY_PASSWORD=YourActualPassword
```

**Replace `YourActualPassword` with the password you used in Step 1!**

---

### 3️⃣ Build APK
```bash
build-release.bat
```

**APK Location:** `android/app/build/outputs/apk/release/app-release.apk`

---

## 📱 Install on Phone

### Method 1: Direct Install (USB)
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Method 2: Manual Install
1. Copy `app-release.apk` to your phone (via USB, email, or cloud)
2. Open **File Manager** on phone
3. Find and tap the APK file
4. Tap **Install**
5. Allow "Install from Unknown Sources" if prompted

### Method 3: Share via Cloud
1. Upload APK to Google Drive/Dropbox
2. Download on phone
3. Install from Downloads folder

---

## ✅ What You Get

After building:
- ✅ **Standalone APK** - Works without USB
- ✅ **No Metro needed** - Works without `npm start`
- ✅ **Offline capable** - Works without internet
- ✅ **Shareable** - Can send to others
- ✅ **Production ready** - Like Play Store apps

---

## 🔄 Updating the App

When you make changes:

1. **Update version** in `android/app/build.gradle`:
   ```gradle
   versionCode 2  // Increment by 1
   versionName "1.0.1"  // Update version
   ```

2. **Build again:**
   ```bash
   build-release.bat
   ```

3. **Install on phone** (same as before)

---

## ⚠️ Important Security Notes

### Keystore Safety
- 🔒 **Keep keystore file safe!** Make backups
- 🔒 **Remember your password!** You'll need it for updates
- 🔒 **Don't commit to Git!** Already in `.gitignore`
- 🔒 **Don't share keystore!** Keep it private

### Password Safety
- Don't commit `gradle.properties` with passwords to Git
- Use a strong password
- Store password securely (password manager)

---

## 🐛 Troubleshooting

### "Keystore file not found"
- Make sure keystore is in `android/app/` directory
- Check file name matches in `gradle.properties`

### "Wrong password"
- Double-check password in `gradle.properties`
- Make sure no extra spaces before/after password

### "APK not installing"
- Uninstall old version first: `adb uninstall com.farmguardian`
- Enable "Install from Unknown Sources" in phone settings
- Try: `adb install -r app-release.apk`

### "App crashes on launch"
- Check Firebase configuration
- Verify all native modules are linked
- Check logs: `adb logcat | grep -i error`

### Build fails
- Clean build: `cd android && ./gradlew clean`
- Check Java version: `java -version` (should be 17+)
- Check Android SDK is installed

---

## 📊 Build Information

### APK Size
- **Debug:** ~50-80 MB
- **Release:** ~20-40 MB (optimized)

### Build Time
- First build: ~5-10 minutes
- Subsequent builds: ~2-5 minutes

### Location
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 🎯 Complete Workflow

### First Time Setup:
1. ✅ Run `generate-keystore.bat`
2. ✅ Add keystore info to `gradle.properties`
3. ✅ Run `build-release.bat`
4. ✅ Install APK on phone

### Regular Updates:
1. ✅ Make code changes
2. ✅ Update version code
3. ✅ Run `build-release.bat`
4. ✅ Install new APK

---

## 📚 Additional Resources

- **Detailed Guide:** See `BUILD_RELEASE_APK.md`
- **Quick Reference:** See `QUICK_BUILD_GUIDE.md`
- **React Native Docs:** https://reactnative.dev/docs/signed-apk-android

---

## ✅ Checklist

Before building:
- [ ] Keystore generated
- [ ] `gradle.properties` configured
- [ ] Password saved securely
- [ ] Version code set
- [ ] App tested in debug mode

After building:
- [ ] APK file exists
- [ ] APK size is reasonable
- [ ] APK installs on phone
- [ ] App launches successfully
- [ ] All features work

---

## 🎉 Success!

Once you have the APK:
- ✅ Install on your phone
- ✅ Works without USB
- ✅ Works without Metro
- ✅ Share with others
- ✅ Deploy to Play Store (when ready)

---

**Need help?** Check `BUILD_RELEASE_APK.md` for detailed troubleshooting!

