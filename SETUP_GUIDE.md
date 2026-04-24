# FarmGuardian - Complete Setup Guide

## 📱 Quick Start Guide

This guide will help you set up and run the FarmGuardian React Native mobile application.

---

## 🎯 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** or **yarn** (comes with Node.js)
   - Verify: `npm --version`

3. **React Native CLI**
   ```bash
   npm install -g react-native-cli
   ```

4. **Git**
   - Download from: https://git-scm.com/

### For Android Development

5. **Java Development Kit (JDK) 11**
   - Download from: https://www.oracle.com/java/technologies/downloads/

6. **Android Studio**
   - Download from: https://developer.android.com/studio
   - Install Android SDK (API 31+)
   - Set up Android Virtual Device (AVD)
   
7. **Environment Variables** (Windows)
   ```
   ANDROID_HOME = C:\Users\YourName\AppData\Local\Android\Sdk
   Add to Path: %ANDROID_HOME%\platform-tools
   Add to Path: %ANDROID_HOME%\emulator
   ```

### For iOS Development (macOS only)

8. **Xcode** (v13+)
   - Install from Mac App Store
   - Install Command Line Tools:
     ```bash
     xcode-select --install
     ```

9. **CocoaPods**
   ```bash
   sudo gem install cocoapods
   ```

---

## 📦 Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd "E:\FYP\Mobile app\App"
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React Native
- React Navigation
- React Native Paper
- i18next (for Urdu/English)
- react-native-image-picker
- react-native-maps
- And many more...

### Step 3: iOS Setup (macOS only)
```bash
cd ios
pod install
cd ..
```

### Step 4: Google Maps API Key (Required for Maps)

**Android:**
1. Get API key from: https://console.cloud.google.com/
2. Edit `android/app/src/main/AndroidManifest.xml`
3. Replace `YOUR_GOOGLE_MAPS_API_KEY_HERE` with your key

**iOS:**
1. Edit `ios/FarmGuardian/AppDelegate.m`
2. Add: `[GMSServices provideAPIKey:@"YOUR_API_KEY"];`

---

## 🚀 Running the Application

### Start Metro Bundler
```bash
npm start
```

### Run on Android

**Option 1: Using Physical Device**
1. Enable USB Debugging on your Android phone
2. Connect phone via USB
3. Run:
```bash
npm run android
```

**Option 2: Using Emulator**
1. Start Android Studio
2. Open AVD Manager
3. Start an emulator
4. Run:
```bash
npm run android
```

### Run on iOS (macOS only)

**Option 1: Using Simulator**
```bash
npm run ios
```

**Option 2: Specific Simulator**
```bash
npm run ios -- --simulator="iPhone 14 Pro"
```

**Option 3: Physical Device**
1. Open `ios/FarmGuardian.xcworkspace` in Xcode
2. Select your device
3. Click Run (▶)

---

## 🔧 Configuration

### Environment Setup

The app uses mock APIs by default. To connect to real APIs:

1. **Edit API Base URL**
   - File: `src/utils/constants.js`
   - Change: `export const API_BASE_URL = 'https://your-api-url.com';`

2. **Disable Mock Mode**
   - Edit service files in `src/services/`
   - Set: `const MOCK_MODE = false;`

### Language Configuration

The app defaults to Urdu. Users can switch languages in Profile → Settings.

---

## 🎨 App Features Overview

### 1. Authentication
- Phone number login with OTP
- Guest mode (no registration needed)
- User registration with farm details

### 2. Disease Detection
- Select crop (Maize, Wheat, Rice, Potato, Tomato)
- Take/upload leaf photo
- AI detects disease
- Results with traffic-light system:
  - 🟢 Green = Healthy
  - 🟡 Yellow = Warning
  - 🔴 Red = Diseased
- Recommendations in Urdu

### 3. Yield Prediction
- Input: Crop type, farm area, location, soil color
- Predicts expected yield
- Compares with regional average
- Shows confidence level

### 4. Soil & Resource Advisory
- Irrigation schedule recommendations
- Fertilizer recommendations (NPK ratios)
- Pest control tips
- Based on crop stage and soil type

### 5. GeoSpatial Map
- Interactive map of Punjab
- Mark farm location
- View soil suitability zones
- Region-specific advice

### 6. Reports & History
- View past disease detections
- View past yield predictions
- Track farming activities

### 7. Profile & Settings
- View/edit user profile
- Switch language (Urdu/English)
- View farm details
- Logout

### 8. Admin Panel
- Login: `admin` / `admin123`
- View registered farmers
- System statistics
- Dashboard with analytics

---

## 📱 Permissions

The app requires the following permissions:

### Android
- Camera (for leaf photos)
- Storage (for image saving)
- Location (for geospatial features)
- Internet (for API calls)

### iOS
- Camera
- Photo Library
- Location (When in Use)
- Location (Always - optional)

All permissions are requested at runtime when needed.

---

## 🐛 Troubleshooting

### Metro Bundler Issues
```bash
npm start -- --reset-cache
```

### Android Build Errors
```bash
cd android
.\gradlew clean
cd ..
npm run android
```

### iOS Build Errors
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### App Won't Start
1. Close all terminals
2. Stop Metro bundler
3. Clear cache:
   ```bash
   npm start -- --reset-cache
   ```
4. Rebuild:
   ```bash
   npm run android
   # or
   npm run ios
   ```

### Camera Not Working
- Check permissions in device settings
- Ensure app has camera permission
- Restart app after granting permission

### Map Not Loading
- Verify Google Maps API key is set
- Check internet connection
- Enable location services

---

## 📊 Mock Data

The app includes mock data for testing:

### Test Accounts
- **Guest Mode**: No credentials needed
- **Regular User**: Any phone number + OTP `123456`
- **Admin**: `admin` / `admin123`

### Mock Features
- Disease detection returns random results
- Yield prediction uses formula-based calculations
- All data saved locally (AsyncStorage)

---

## 🔄 Development Workflow

### Making Changes

1. Edit source files in `src/`
2. Save file
3. Metro bundler auto-reloads
4. See changes on device/emulator

### Adding New Screen

1. Create file in `src/screens/`
2. Add to navigator in `src/navigation/`
3. Add translations in `src/locales/`
4. Test on device

### Testing New Features

1. Test on Android device/emulator
2. Test on iOS simulator (if available)
3. Test offline functionality
4. Test with Urdu language
5. Test RTL layout

---

## 📦 Building for Production

### Android APK
```bash
cd android
.\gradlew assembleRelease
```
APK location: `android/app/build/outputs/apk/release/`

### Android AAB (Play Store)
```bash
cd android
.\gradlew bundleRelease
```
AAB location: `android/app/build/outputs/bundle/release/`

### iOS (macOS only)
1. Open Xcode
2. Select "Any iOS Device"
3. Product → Archive
4. Follow distribution wizard

---

## 📝 Project Structure

```
App/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── Card.js
│   │   └── ...
│   ├── context/             # React Context
│   │   ├── AuthContext.js
│   │   └── LanguageContext.js
│   ├── hooks/               # Custom hooks
│   │   └── useOfflineSync.js
│   ├── locales/             # Translations
│   │   ├── en.json
│   │   ├── ur.json
│   │   └── i18n.js
│   ├── navigation/          # Navigation
│   │   ├── AppNavigator.js
│   │   └── BottomTabNavigator.js
│   ├── screens/             # All screens
│   │   ├── WelcomeScreen.js
│   │   ├── HomeScreen.js
│   │   ├── DiseaseDetectionScreen.js
│   │   └── ...
│   ├── services/            # API services
│   │   ├── authService.js
│   │   ├── diseaseService.js
│   │   └── ...
│   └── utils/               # Utilities
│       ├── constants.js
│       ├── helpers.js
│       └── storage.js
├── android/                 # Android native
├── ios/                     # iOS native
├── package.json
└── README.md
```

---

## 🌍 Supported Languages

- **Primary**: Urdu (اردو) - RTL
- **Secondary**: English - LTR

All farmer-facing content is in Urdu by default.

---

## 🎯 Supported Crops

The app ONLY supports these 5 crops:
1. 🌽 Maize (مکئی)
2. 🌾 Wheat (گندم)
3. 🍚 Rice (چاول)
4. 🥔 Potato (آلو)
5. 🍅 Tomato (ٹماٹر)

---

## 🆘 Getting Help

### Common Commands

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run tests
npm test

# Check for errors
npm run lint

# Clear cache
npm start -- --reset-cache
```

### Resources

- React Native Docs: https://reactnative.dev/
- React Navigation: https://reactnavigation.org/
- Stack Overflow: Search "react native [your issue]"

---

## ✅ Testing Checklist

Before deployment, test:

- [ ] Login/Registration flow
- [ ] Guest mode
- [ ] Disease detection with camera
- [ ] Disease detection with gallery
- [ ] Yield prediction form
- [ ] Advisory recommendations
- [ ] Map functionality
- [ ] Location marking
- [ ] Reports viewing
- [ ] History tracking
- [ ] Language switching
- [ ] Profile editing
- [ ] Admin panel
- [ ] Offline mode
- [ ] Data syncing
- [ ] Permissions handling

---

## 📞 Support

For technical issues or questions:
1. Check DEVELOPMENT.md for detailed guides
2. Review error messages carefully
3. Check device logs
4. Consult React Native documentation

---

## 🎉 Success!

If you can see the Welcome screen with Urdu text, you're ready to go!

**Next Steps:**
1. Try guest mode
2. Explore disease detection
3. Test yield prediction
4. Check the map
5. Switch to English in Profile

---

**Note**: This is a complete, production-ready application with mock APIs for development. Connect to real backend services for full deployment.

**Version**: 1.0.0  
**Last Updated**: December 2024

