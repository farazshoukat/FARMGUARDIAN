# FarmGuardian - Dependency Fixes Applied

## Summary of All Issues Fixed

This document details all the dependency conflicts and configuration issues that were resolved to make the FarmGuardian app buildable on React Native 0.72.6.

---

## 🔧 Issues Identified and Fixed

### 1. **React Native Reanimated Version Conflict**
**Problem:** `react-native-reanimated@3.6.0` requires React Native 0.78+, but we're using 0.72.6

**Solution:**
- Downgraded to `react-native-reanimated@3.3.0` (compatible with RN 0.72.6)
- Updated NDK version to 23.1.7779620 (required by reanimated 3.3.0)

### 2. **Android SDK Version Conflicts**
**Problem:** Dependencies like `androidx.appcompat:1.7.0` and `androidx.core:1.16.0` require compileSdk 34+, but AGP 7.4.2 only supports up to SDK 33

**Solution:**
- Changed `compileSdkVersion` from 34 → 33
- Changed `targetSdkVersion` from 34 → 33
- Changed `buildToolsVersion` from 34.0.0 → 33.0.0
- Added dependency constraints in `app/build.gradle` to force older AndroidX versions:
  - `androidx.appcompat:appcompat:1.6.1` (instead of 1.7.0)
  - `androidx.core:core:1.12.0` (instead of 1.16.0)

### 3. **React Native Navigation Dependencies**
**Problem:** Latest versions of `react-native-screens` and `react-native-safe-area-context` pull in AndroidX dependencies requiring SDK 34+

**Solution:**
- Downgraded `react-native-safe-area-context` from ^4.7.4 → 4.5.0
- Downgraded `react-native-screens` from ^3.27.0 → 3.20.0
- Downgraded `react-native-gesture-handler` from ^2.14.0 → 2.9.0

### 4. **AndroidManifest.xml Missing Configurations**
**Problem:** Missing required permissions and package declaration for app features

**Solution:** Added all required permissions:
```xml
- android.permission.CAMERA (for disease detection)
- android.permission.READ_EXTERNAL_STORAGE (for image picker)
- android.permission.WRITE_EXTERNAL_STORAGE (for PDF export)
- android.permission.ACCESS_FINE_LOCATION (for geolocation mapping)
- android.permission.ACCESS_COARSE_LOCATION (for geolocation)
- android.permission.RECORD_AUDIO (for voice input)
- package="com.farmguardian" (required attribute)
- android:usesCleartextTraffic="true" (for dev server)
- Google Maps API Key placeholder
```

### 5. **Gradle Build Configuration**
**Problem:** Missing packaging options causing duplicate library conflicts

**Solution:** Added to `app/build.gradle`:
```gradle
packagingOptions {
    pickFirst 'lib/x86/libc++_shared.so'
    pickFirst 'lib/x86_64/libc++_shared.so'
    pickFirst 'lib/armeabi-v7a/libc++_shared.so'
    pickFirst 'lib/arm64-v8a/libc++_shared.so'
}
multiDexEnabled true
```

### 6. **Gradle Properties Configuration**
**Problem:** Incorrect suppressUnsupportedCompileSdk setting and missing dexing configuration

**Solution:**
- Changed `android.suppressUnsupportedCompileSdk` from 35 → 34
- Added `android.enableDexingArtifactTransform.desugaring=false`

---

## 📦 Final Working Dependency Versions

### Core Dependencies
```json
{
  "react": "18.2.0",
  "react-native": "0.72.6",
  "react-native-reanimated": "3.3.0",
  "react-native-gesture-handler": "2.9.0",
  "react-native-screens": "3.20.0",
  "react-native-safe-area-context": "4.5.0"
}
```

### Navigation
```json
{
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "@react-navigation/stack": "^6.3.20"
}
```

### Feature Libraries (Compatible Versions)
```json
{
  "react-native-maps": "1.7.1",
  "react-native-paper": "^5.11.1",
  "react-native-vector-icons": "^10.0.2",
  "react-native-image-picker": "^7.0.3",
  "@react-native-async-storage/async-storage": "^1.19.5",
  "react-native-permissions": "^3.10.1",
  "react-i18next": "^13.5.0",
  "i18next": "^23.7.6",
  "axios": "^1.6.2"
}
```

---

## 🏗️ Android Build Configuration

### build.gradle (Project Level)
```gradle
ext {
    buildToolsVersion = "33.0.0"
    minSdkVersion = 21
    compileSdkVersion = 33
    targetSdkVersion = 33
    ndkVersion = "23.1.7779620"
}
dependencies {
    classpath("com.android.tools.build:gradle:7.4.2")
}
```

### build.gradle (App Level)
```gradle
android {
    compileSdkVersion 33
    defaultConfig {
        applicationId "com.farmguardian"
        minSdkVersion 21
        targetSdkVersion 33
        multiDexEnabled true
    }
}

dependencies {
    constraints {
        implementation("androidx.appcompat:appcompat:1.6.1")
        implementation("androidx.core:core:1.12.0")
    }
}
```

---

## ✅ Verification Steps

After applying all fixes:

1. **Clean Installation:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```

2. **Clean Android Build:**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

3. **Build and Run:**
   ```bash
   npm run android
   ```

---

## 🚨 Important Notes

### 1. **Google Maps API Key**
Before running on production, replace the placeholder in `AndroidManifest.xml`:
```xml
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="YOUR_ACTUAL_API_KEY_HERE" />
```

Get your API key from: https://console.cloud.google.com/apis/credentials

### 2. **Always Use --legacy-peer-deps**
When installing new packages, always use:
```bash
npm install package-name --legacy-peer-deps
```

### 3. **SDK Limitations**
- We're locked to compileSdk 33 due to AGP 7.4.2
- To use SDK 34+, would need to upgrade to:
  - React Native 0.73+
  - AGP 8.0+
  - Gradle 8.2+

### 4. **Known Warnings (Safe to Ignore)**
- "Ignoring invalid ABI 'riscv64'" - This is harmless
- "Software Components will not be created automatically" - Gradle plugin warning
- "The Kotlin Gradle plugin was loaded multiple times" - Common in RN projects

---

## 📱 Testing Checklist

After successful build, test these features:

- [ ] App launches without crash
- [ ] Bottom tab navigation works
- [ ] Camera permission and image picker
- [ ] Location services for map
- [ ] Offline mode with AsyncStorage
- [ ] Language switching (Urdu/English)
- [ ] Disease detection flow
- [ ] Yield prediction form
- [ ] PDF export and sharing

---

## 🔄 Troubleshooting

### Build Still Fails?

1. **Clear all caches:**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Clear Gradle cache
   cd android
   ./gradlew clean
   rm -rf .gradle
   cd ..
   
   # Clear Metro bundler cache
   npm start -- --reset-cache
   ```

2. **Check Java/Node versions:**
   ```bash
   java -version  # Should be Java 11 or 17
   node -version  # Should be 16+
   ```

3. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```

### App Crashes on Launch?

1. Check Metro bundler is running
2. Check device/emulator has enough storage
3. Check AndroidManifest.xml has all permissions
4. Run with verbose logs: `npm run android -- --verbose`

---

## 📚 Related Documentation

- [React Native 0.72 Docs](https://reactnative.dev/docs/0.72/getting-started)
- [AGP 7.4.2 Compatibility](https://developer.android.com/studio/releases/gradle-plugin#7-4-0)
- [React Navigation Setup](https://reactnavigation.org/docs/getting-started)
- [React Native Reanimated 3.3](https://docs.swmansion.com/react-native-reanimated/docs/3.3.0/)

---

**Last Updated:** December 6, 2025  
**React Native Version:** 0.72.6  
**Android Gradle Plugin:** 7.4.2  
**Gradle Version:** 8.0.1  
**compileSdkVersion:** 33

