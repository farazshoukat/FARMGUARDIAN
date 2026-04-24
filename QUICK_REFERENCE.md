# FarmGuardian - Quick Reference Guide

## 🚀 Quick Commands

```bash
# Navigate to project
cd "E:\FYP\Mobile app\App"

# Install dependencies (first time only)
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Clear cache (if issues)
npm start -- --reset-cache

# Build Android APK
cd android && .\gradlew assembleRelease && cd ..
```

---

## 📱 Test Credentials

### Regular User
- **Phone**: Any 11-digit number (e.g., 03001234567)
- **OTP**: `123456` (any 6-digit code works in mock mode)

### Guest Mode
- Click "مہمان کے طور پر جاری رکھیں" on welcome screen
- No credentials needed

### Admin Panel
- **Username**: `admin`
- **Password**: `admin123`
- Access from Profile → Admin (or navigate to /Admin)

---

## 🌾 Supported Crops (ONLY 5)

| Crop | Urdu | Icon |
|------|------|------|
| Maize | مکئی | 🌽 |
| Wheat | گندم | 🌾 |
| Rice | چاول | 🍚 |
| Potato | آلو | 🥔 |
| Tomato | ٹماٹر | 🍅 |

---

## 📂 Key Files to Know

### Configuration
- `src/utils/constants.js` - API URLs, colors, constants
- `src/utils/helpers.js` - Utility functions
- `src/utils/storage.js` - AsyncStorage helpers

### Services (Mock APIs)
- `src/services/authService.js` - Login/register
- `src/services/diseaseService.js` - Disease detection
- `src/services/yieldService.js` - Yield prediction
- `src/services/advisoryService.js` - Advisory
- `src/services/adminService.js` - Admin panel

### Navigation
- `src/navigation/AppNavigator.js` - Main stack navigator
- `src/navigation/BottomTabNavigator.js` - Bottom tabs

### Context
- `src/context/AuthContext.js` - User authentication
- `src/context/LanguageContext.js` - Language switching

### Translations
- `src/locales/ur.json` - Urdu translations
- `src/locales/en.json` - English translations

---

## 🎨 Color Palette

```javascript
Primary (Green):   #2E7D32
Secondary (Orange): #FF6F00
Healthy:           #4CAF50  🟢
Warning:           #FFC107  🟡
Diseased:          #F44336  🔴
Background:        #F5F5F5
Surface:           #FFFFFF
Text:              #212121
Text Secondary:    #757575
```

---

## 📱 Screen Navigation Map

```
Welcome Screen
├─→ OTP Verification
│   └─→ Registration
│       └─→ Main App
└─→ Guest Mode → Main App

Main App (Bottom Tabs)
├─→ Home
│   ├─→ Disease Detection
│   ├─→ Yield Prediction
│   ├─→ Advisory
│   ├─→ Map
│   └─→ Reports
├─→ Disease Detection
│   └─→ Reports
├─→ Yield Prediction
│   └─→ Reports
├─→ Advisory
└─→ Profile
    └─→ Logout → Welcome
```

---

## 🔧 Toggle Mock/Real API

In each service file (`src/services/*.js`):

```javascript
// Development (Mock)
const MOCK_MODE = true;

// Production (Real API)
const MOCK_MODE = false;
```

Update API base URL in `src/utils/constants.js`:
```javascript
export const API_BASE_URL = 'https://your-api-url.com';
```

---

## 🌍 Language Switching

Users can switch language:
1. Go to Profile tab (bottom-right)
2. Tap on Language setting
3. Switches between Urdu ⟷ English

Programmatically:
```javascript
const { toggleLanguage } = useLanguage();
toggleLanguage();
```

---

## 💾 AsyncStorage Keys

```javascript
'@user_token'          // Auth token
'@user_data'           // User profile
'@language'            // Language preference
'@disease_history'     // Disease detections
'@yield_history'       // Yield predictions
'@pending_requests'    // Offline queue
'@is_first_time'       // First launch flag
```

---

## 🎯 Common Tasks

### Add New Screen
1. Create `src/screens/NewScreen.js`
2. Add to navigator in `src/navigation/AppNavigator.js`
3. Add translations in `src/locales/ur.json` and `en.json`

### Add New Service Method
1. Edit appropriate file in `src/services/`
2. Add mock response
3. Export function
4. Use in component

### Add Translation
```javascript
// src/locales/ur.json
{
  "myModule": {
    "myKey": "میری قدر"
  }
}

// In component
const { t } = useLanguage();
<Text>{t('myModule.myKey')}</Text>
```

### Add New Constant
Edit `src/utils/constants.js`:
```javascript
export const MY_CONSTANT = {
  KEY: 'value',
  // ...
};
```

---

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Metro bundler won't start | `npm start -- --reset-cache` |
| App won't build | Clean: `cd android && .\gradlew clean` |
| Permission denied | Check AndroidManifest.xml / Info.plist |
| Camera not working | Grant permissions in device settings |
| Map not loading | Add Google Maps API key |
| Changes not reflecting | Reload: Shake device → Reload |
| TypeScript errors | Ignore if using JS only |

---

## 📊 Mock Data Behavior

### Disease Detection
- Returns random status (healthy/warning/diseased)
- 30% healthy, 30% warning, 40% diseased
- Random confidence (85-99%)
- Realistic disease names per crop

### Yield Prediction
- Formula-based calculation
- Adjusts for soil color (+10%)
- Adjusts for fertilizer (+15%)
- Returns realistic maund values
- Includes regional average (-15%)

### Advisory
- Returns comprehensive recommendations
- Irrigation schedules per crop stage
- Fertilizer NPK ratios per soil color
- Pest control tips

---

## 🔑 Important Permissions

### Android (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.INTERNET" />
```

### iOS (Info.plist)
```xml
<key>NSCameraUsageDescription</key>
<string>For disease detection</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>For farm location</string>
```

---

## 📦 Build Commands

### Android Debug
```bash
npm run android
```

### Android Release APK
```bash
cd android
.\gradlew assembleRelease
# Output: android/app/build/outputs/apk/release/app-release.apk
```

### Android Release AAB (Play Store)
```bash
cd android
.\gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

### iOS Debug
```bash
npm run ios
```

### iOS Release (Archive)
1. Open `ios/FarmGuardian.xcworkspace` in Xcode
2. Select "Any iOS Device"
3. Product → Archive

---

## 🎯 Testing Checklist

**Basic Flow:**
- [ ] Open app → See welcome screen
- [ ] Tap guest mode → See home screen
- [ ] Navigate between tabs
- [ ] Select crop in disease detection
- [ ] Take/upload photo
- [ ] View detection result
- [ ] Fill yield prediction form
- [ ] View prediction result
- [ ] Get advisory recommendations
- [ ] Mark location on map
- [ ] View reports/history
- [ ] Switch language in profile
- [ ] Admin login works

---

## 📱 Minimum Requirements

### Android
- Android 6.0 (API 23) or higher
- 2GB RAM minimum
- Camera
- Internet connection (for maps)

### iOS
- iOS 13.0 or higher
- iPhone 6s or newer
- Camera
- Internet connection (for maps)

---

## 🔄 Update Dependencies

```bash
# Check for updates
npm outdated

# Update specific package
npm update package-name

# Update all (carefully)
npm update

# Update React Native
npx react-native upgrade
```

---

## 📝 Useful npm Scripts

```bash
npm start           # Start Metro bundler
npm run android     # Run on Android
npm run ios         # Run on iOS (macOS)
npm test            # Run tests
npm run lint        # Check code style
```

---

## 🆘 Get Help

1. **Check Docs**: README.md, SETUP_GUIDE.md, DEVELOPMENT.md
2. **Check Logs**: Metro terminal, device logs
3. **React Native Docs**: https://reactnative.dev/
4. **Stack Overflow**: Search "react native [issue]"

---

## ✅ Pre-Launch Checklist

- [ ] All features tested
- [ ] Real APIs integrated (MOCK_MODE = false)
- [ ] API base URL configured
- [ ] Google Maps API key added
- [ ] App icons created
- [ ] Splash screen added
- [ ] Permissions configured
- [ ] Build successful (Android & iOS)
- [ ] Tested on physical devices
- [ ] Translations reviewed
- [ ] Error handling tested
- [ ] Offline mode tested

---

## 🎉 Quick Tips

✨ **Use Guest Mode** for instant testing  
✨ **Mock mode** works without backend  
✨ **Urdu is default** - switch to English in Profile  
✨ **All 5 crops** have full support  
✨ **Admin panel** has realistic demo data  
✨ **Offline mode** caches everything locally  
✨ **Traffic lights** 🟢🟡🔴 show health status  
✨ **History saved** automatically in AsyncStorage  

---

**Last Updated**: December 6, 2024  
**Version**: 1.0.0

**Quick Start**: `cd App && npm install && npm run android`

🌾 Happy Farming! 🌾

