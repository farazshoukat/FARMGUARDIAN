# FarmGuardian Installation Verification

## ✅ Step-by-Step Verification Guide

Follow this checklist to ensure your FarmGuardian app is properly set up.

---

## 📋 Pre-Installation Checklist

### 1. Required Software Installed

Check each requirement:

```bash
# Node.js (should be v16+)
node --version

# npm (should be v8+)
npm --version

# React Native CLI
react-native --version

# Java (for Android)
java -version

# Git
git --version
```

**Expected Output Example:**
```
node --version    → v18.17.0
npm --version     → 9.6.7
```

✅ All commands should return version numbers  
❌ If any command fails, install the missing software

---

## 📦 Installation Verification

### 2. Navigate to Project

```bash
cd "E:\FYP\Mobile app\App"
```

✅ Directory should exist  
✅ Should contain `package.json`

### 3. Install Dependencies

```bash
npm install
```

**What to expect:**
- Terminal shows package installations
- May take 3-5 minutes
- Should end with "added XXX packages"

✅ Completes without errors  
⚠️ Warnings are okay  
❌ Errors need to be resolved

### 4. Verify node_modules

```bash
# Windows
dir node_modules

# macOS/Linux
ls node_modules
```

✅ Should see many folders (react-native, react-navigation, etc.)  
❌ If empty, run `npm install` again

---

## 🤖 Android Verification

### 5. Check Android Setup

```bash
# Check Android SDK
echo %ANDROID_HOME%

# Should show path like:
# C:\Users\YourName\AppData\Local\Android\Sdk
```

✅ Path is displayed  
❌ If not set, configure Android environment variables

### 6. Start Android Emulator

**Option A: Android Studio**
1. Open Android Studio
2. Tools → Device Manager
3. Start an emulator

**Option B: Command Line**
```bash
emulator -list-avds
emulator @avd_name
```

✅ Emulator starts and shows Android home screen  
❌ If fails, create AVD in Android Studio

### 7. Test Android Build

```bash
npm run android
```

**Expected Process:**
1. Metro bundler starts
2. Android build begins
3. App installs on emulator
4. Welcome screen appears with Urdu text

✅ App launches successfully  
⚠️ First build may take 5-10 minutes  
❌ If errors, check Android Studio installation

---

## 🍎 iOS Verification (macOS only)

### 8. Check iOS Setup

```bash
# Check Xcode
xcode-select -p

# Check CocoaPods
pod --version
```

✅ Both commands return version info  
❌ Install if missing

### 9. Install iOS Dependencies

```bash
cd ios
pod install
cd ..
```

✅ Should see "Pod installation complete!"  
❌ If errors, run `pod deintegrate` then `pod install`

### 10. Test iOS Build

```bash
npm run ios
```

**Expected Process:**
1. Metro bundler starts
2. iOS simulator opens
3. App builds and installs
4. Welcome screen appears

✅ App launches in simulator  
⚠️ First build may take 5-10 minutes  
❌ If errors, try opening Xcode project directly

---

## 🧪 Functionality Tests

### 11. Test Basic Navigation

**Once app is running:**

1. **Welcome Screen**
   - [ ] See "فارم گارڈین" logo
   - [ ] See phone number input
   - [ ] See "مہمان کے طور پر جاری رکھیں" button

2. **Guest Mode**
   - [ ] Tap guest button
   - [ ] See home dashboard
   - [ ] See bottom navigation tabs

3. **Bottom Tabs**
   - [ ] Tap each tab (Home, Disease, Yield, Advisory, Profile)
   - [ ] Each screen loads without errors
   - [ ] Urdu text displays correctly

✅ All screens load properly  
✅ Urdu text is readable  
❌ If crashes, check Metro logs

### 12. Test Camera (if using physical device)

1. Navigate to Disease Detection tab
2. Select a crop (e.g., Wheat)
3. Tap "تصویر لیں" (Take Picture)
4. [ ] Camera permission requested
5. [ ] Camera opens
6. [ ] Can take photo

✅ Camera works  
⚠️ Simulator can't test camera  
❌ If permission denied, check device settings

### 13. Test Form Inputs

1. Navigate to Yield Prediction
2. Try filling the form:
   - [ ] Crop picker works
   - [ ] Farm area input accepts numbers
   - [ ] Location picker shows districts
   - [ ] Soil color picker works

✅ All inputs work smoothly  
❌ If pickers don't open, check modal permissions

### 14. Test Language Switching

1. Go to Profile tab
2. Find Language setting
3. Tap to switch
4. [ ] Interface switches to English
5. [ ] Tap again to switch back to Urdu
6. [ ] RTL layout works in Urdu

✅ Language switching works  
✅ Text direction changes appropriately  
❌ If text doesn't change, check i18n config

### 15. Test Data Persistence

1. Register as guest
2. Use disease detection
3. **Close app completely** (swipe away)
4. **Reopen app**
5. [ ] Still logged in as guest
6. [ ] Go to Reports
7. [ ] Previous detection is saved

✅ Data persists after restart  
❌ If data lost, check AsyncStorage

---

## 🔧 Advanced Verification

### 16. Test Offline Mode

1. **Turn off WiFi/Mobile data**
2. Use app features
3. [ ] App doesn't crash
4. [ ] Can still navigate
5. [ ] Detection/prediction still works (mock mode)
6. **Turn on internet**
7. [ ] App continues working

✅ Offline functionality works  
❌ If crashes, check network error handling

### 17. Test Admin Panel

1. From any screen, navigate to Admin (if accessible)
2. Or manually navigate: Profile → (add admin route)
3. Login with:
   - Username: `admin`
   - Password: `admin123`
4. [ ] Dashboard loads
5. [ ] See statistics
6. [ ] Can view farmers list

✅ Admin panel accessible and functional  
❌ If can't access, check navigation config

### 18. Performance Check

Run app and observe:

- [ ] Screens load quickly (< 1 second)
- [ ] Scrolling is smooth
- [ ] No lag when typing
- [ ] Images load properly
- [ ] No memory warnings

✅ App is responsive  
⚠️ Slower on debug builds (normal)  
❌ If very slow, check for console errors

---

## 📊 Metro Bundler Check

### 19. Monitor Metro Logs

When app is running, check Metro terminal:

**Good Signs:**
```
✓ Loading dependency graph, done.
✓ Running Metro Bundler on port 8081
```

**Warning Signs:**
```
! Slow file reading...  → May need cache clear
! Unable to resolve module... → Missing dependency
```

**Error Signs:**
```
✗ Error: ... → Check error message
```

✅ No errors in Metro  
⚠️ Warnings are usually okay  
❌ Red errors need fixing

---

## 🐛 Common Issues & Solutions

### Issue: "Command not found"
**Solution:** Install Node.js and React Native CLI

### Issue: "Unable to load script"
**Solution:** 
```bash
npm start -- --reset-cache
```

### Issue: "Android SDK not found"
**Solution:** Set ANDROID_HOME environment variable

### Issue: "App crashes on launch"
**Solution:** 
1. Check Metro bundler is running
2. Rebuild: `npm run android`

### Issue: "Camera not working"
**Solution:** Grant camera permission in device settings

### Issue: "Urdu text shows boxes"
**Solution:** System needs Urdu font support (should work on most devices)

### Issue: "Map not loading"
**Solution:** Add Google Maps API key in AndroidManifest.xml

---

## ✅ Final Verification Checklist

Run through this complete checklist:

### Setup
- [ ] Node.js installed
- [ ] npm packages installed
- [ ] Android SDK configured (for Android)
- [ ] Xcode installed (for iOS, macOS only)

### Build
- [ ] `npm install` completes successfully
- [ ] `npm run android` OR `npm run ios` works
- [ ] App launches without errors

### Features
- [ ] Guest mode works
- [ ] All tabs load
- [ ] Disease detection module works
- [ ] Yield prediction form works
- [ ] Advisory screen works
- [ ] Map screen works
- [ ] Reports show history
- [ ] Profile displays correctly
- [ ] Language switching works

### Data
- [ ] Data persists after app restart
- [ ] Mock API responses work
- [ ] Offline mode doesn't crash

### Performance
- [ ] App is responsive
- [ ] No major lag
- [ ] Screens load quickly

---

## 🎉 Success Criteria

**Your installation is successful if:**

1. ✅ App launches without crashes
2. ✅ Welcome screen displays with Urdu text
3. ✅ Can enter as guest
4. ✅ All bottom tabs are accessible
5. ✅ Disease detection accepts crop selection
6. ✅ Yield prediction form opens
7. ✅ Language switches between Urdu and English
8. ✅ Data persists after app restart

**If all checked:** 🎉 **Installation Verified!** 🎉

---

## 📞 What to Do If Tests Fail

1. **Read the error message carefully**
2. **Check relevant section in SETUP_GUIDE.md**
3. **Try common solutions:**
   - Clear cache: `npm start -- --reset-cache`
   - Clean Android: `cd android && .\gradlew clean`
   - Reinstall dependencies: `rm -rf node_modules && npm install`
   - Restart Metro: Close terminal and run `npm start`
4. **Check documentation:**
   - README.md
   - SETUP_GUIDE.md
   - DEVELOPMENT.md
   - QUICK_REFERENCE.md

---

## 📝 Test Results Template

Use this to document your verification:

```
FarmGuardian Installation Verification Results
Date: _______________
Tester: _______________

[ ] Node.js installed (v______)
[ ] npm installed (v______)
[ ] Dependencies installed
[ ] Android/iOS build successful
[ ] App launches
[ ] Guest mode works
[ ] All tabs accessible
[ ] Disease detection works
[ ] Yield prediction works
[ ] Language switching works
[ ] Data persistence works
[ ] Overall: PASS / FAIL

Notes:
_______________________
_______________________
```

---

## 🚀 Ready for Development!

Once all verifications pass, you're ready to:
- Start developing new features
- Customize the app
- Connect to real APIs
- Test on physical devices
- Prepare for deployment

---

**Last Updated**: December 6, 2024  
**Version**: 1.0.0

**Quick Verification**: `cd App && npm install && npm run android`

✅ **Happy Coding!** ✅

