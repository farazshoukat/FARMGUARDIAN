# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication with Google and Facebook sign-in for the FarmGuardian app.

## Table of Contents
1. [Firebase Console Setup](#firebase-console-setup)
2. [Google Sign-In Configuration](#google-sign-in-configuration)
3. [Facebook Sign-In Configuration](#facebook-sign-in-configuration)
4. [Testing the Implementation](#testing-the-implementation)
5. [Troubleshooting](#troubleshooting)

---

## Firebase Console Setup

### 1. Firebase Project Configuration
The `google-services.json` file is already added to your project at:
- `android/app/google-services.json`

### 2. Enable Authentication Methods

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **farmguardian**
3. Navigate to **Authentication** > **Sign-in method**
4. Enable the following providers:
   - ✅ Email/Password
   - ✅ Google
   - ✅ Facebook

---

## Google Sign-In Configuration

### 1. Get SHA-1 Certificate Fingerprint

Open PowerShell in your project directory and run:

```powershell
cd android
./gradlew signingReport
```

Look for the **SHA-1** fingerprint under the `debug` variant. It will look like:
```
SHA1: A1:B2:C3:D4:E5:F6:G7:H8:I9:J0:K1:L2:M3:N4:O5:P6:Q7:R8:S9:T0
```

### 2. Add SHA-1 to Firebase

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click on your Android app
4. Click **Add fingerprint**
5. Paste your SHA-1 fingerprint
6. Click **Save**

### 3. Download Updated google-services.json

After adding the SHA-1:
1. Download the updated `google-services.json`
2. Replace the existing file at `android/app/google-services.json`

### 4. Web Client ID (Already Configured)

The Web Client ID is already configured in `src/config/firebase.js`:
```javascript
webClientId: '714112321366-nhrqrjki91ub6ounjondru1lttdjmqke.apps.googleusercontent.com'
```

---

## Facebook Sign-In Configuration

### 1. Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** > **Create App**
3. Select **Consumer** as app type
4. Enter app details:
   - **App Name**: FarmGuardian
   - **Contact Email**: your-email@example.com
5. Click **Create App**

### 2. Get Facebook App Credentials

After creating the app:
1. In the Dashboard, find:
   - **App ID** (e.g., 1234567890123456)
   - **App Secret** (Click "Show" to reveal)
2. Keep these handy for the next steps

### 3. Configure Facebook Login

1. In Facebook App Dashboard, click **Add Product**
2. Find **Facebook Login** and click **Set Up**
3. Select **Android**
4. Follow the setup wizard:
   - Package name: `com.farmguardian`
   - Default Activity Class: `com.farmguardian.MainActivity`
   - Use the SHA-1 from earlier

### 4. Update Android Configuration

Edit `android/app/src/main/res/values/strings.xml`:

```xml
<resources>
    <string name="app_name">FarmGuardian</string>
    
    <!-- Replace with your actual Facebook credentials -->
    <string name="facebook_app_id">YOUR_FACEBOOK_APP_ID_HERE</string>
    <string name="facebook_client_token">YOUR_FACEBOOK_CLIENT_TOKEN_HERE</string>
    <string name="fb_login_protocol_scheme">fbYOUR_FACEBOOK_APP_ID_HERE</string>
</resources>
```

**Example:**
If your Facebook App ID is `1234567890123456`:
```xml
<string name="facebook_app_id">1234567890123456</string>
<string name="facebook_client_token">abc123def456ghi789</string>
<string name="fb_login_protocol_scheme">fb1234567890123456</string>
```

### 5. Configure Firebase with Facebook

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Click on **Facebook**
3. Enable Facebook sign-in
4. Enter your Facebook **App ID** and **App Secret**
5. Copy the OAuth redirect URI (looks like: `https://farmguardian.firebaseapp.com/__/auth/handler`)
6. Go back to Facebook Developers Console
7. Navigate to **Facebook Login** > **Settings**
8. Add the OAuth redirect URI to **Valid OAuth Redirect URIs**
9. Save changes

---

## Firestore Database Setup

### 1. Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Start in **Test mode** (for development)
4. Choose a location (e.g., `asia-south1` for India)
5. Click **Enable**

### 2. Set Up Security Rules (Development)

For development, use these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

**Note:** For production, implement proper security rules!

---

## Testing the Implementation

### 1. Build and Run the App

```powershell
# Clean build
cd android
./gradlew clean
cd ..

# Run the app
npm run android
```

### 2. Test Authentication Flows

#### Email/Password Sign Up:
1. Click **Sign Up** on Welcome screen
2. Enter email and password
3. Complete profile setup with farmer details
4. Verify user created in Firebase Console > Authentication

#### Google Sign-In:
1. Click **Login** on Welcome screen
2. Click **Continue with Google**
3. Select Google account
4. Complete profile if new user
5. Verify user in Firebase Console

#### Facebook Sign-In:
1. Click **Continue with Facebook**
2. Log in with Facebook credentials
3. Grant permissions
4. Complete profile setup
5. Verify user in Firebase Console

---

## Features Implemented

### Authentication Screens

1. **WelcomeScreen** - Entry point with navigation to Login/SignUp
2. **LoginScreen** - Email/password login with social auth buttons
3. **SignUpScreen** - Email/password registration with social auth
4. **ProfileSetupScreen** - Detailed farmer information form:
   - Full Name
   - Phone Number (Pakistani format: 03XXXXXXXXX)
   - City
   - District (dropdown selection)
   - Village/Town
   - Total Land (in acres)
   - Crops Selection (multi-select chips)
5. **ForgotPasswordScreen** - Password reset via email

### Farmer Profile Fields

The profile setup collects essential farming data:
- **Personal Info**: Name, Phone, Location
- **Farm Details**: City, District, Village, Total Land
- **Crop Selection**: Multi-select from available crops:
  - 🌾 Wheat (گندم)
  - 🌾 Rice (چاول)
  - 🌽 Corn (مکئی)
  - 🥔 Potato (آلو)
  - 🧅 Onion (پیاز)
  - 🍅 Tomato (ٹماٹر)
  - 🫑 Chili (مرچ)
  - 🥒 Cucumber (کھیرا)
  - 🫘 Lentils (دال)
  - 🌻 Sunflower (سورج مکھی)

### Data Storage

User data is stored in Firestore:
```
/users/{userId}
  - uid: string
  - email: string
  - displayName: string
  - photoURL: string
  - phoneNumber: string
  - city: string
  - district: string
  - village: string
  - totalLand: number
  - cropsGrown: array
  - isProfileComplete: boolean
  - authProvider: string (email|google|facebook)
  - createdAt: timestamp
  - updatedAt: timestamp
```

---

## Troubleshooting

### Google Sign-In Issues

**Error: DEVELOPER_ERROR**
- Solution: Verify SHA-1 is added to Firebase Console
- Regenerate google-services.json after adding SHA-1

**Error: Network error**
- Solution: Ensure internet connection
- Check if Google Play Services is updated

### Facebook Sign-In Issues

**Error: Invalid key hash**
- Solution: Add correct SHA-1 to Facebook App Settings
- Verify package name matches: `com.farmguardian`

**Error: App not setup**
- Solution: Complete Facebook Login setup in Facebook Developers Console
- Ensure OAuth redirect URI is added

### Firebase Issues

**Error: FirebaseError: Firebase not initialized**
- Solution: Ensure google-services.json is in correct location
- Rebuild the app: `cd android && ./gradlew clean`

**Error: Network request failed**
- Solution: Check internet connection
- Verify Firebase project is active

### Build Issues

**Error: Duplicate class found**
- Solution: Already handled in build.gradle with resolution strategy

**Error: Could not find google-services.json**
- Solution: File should be at `android/app/google-services.json`
- Copy from root if needed: `copy google-services.json android\app\`

---

## Security Considerations

### For Production:

1. **Update Firestore Security Rules**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

2. **Generate Release Keystore**:
```powershell
keytool -genkey -v -keystore farmguardian-release.keystore -alias farmguardian -keyalg RSA -keysize 2048 -validity 10000
```

3. **Add Release SHA-1 to Firebase**:
```powershell
keytool -list -v -keystore farmguardian-release.keystore -alias farmguardian
```

4. **Enable App Check** in Firebase Console for additional security

---

## Next Steps

1. **Configure Facebook App**:
   - Update `strings.xml` with actual Facebook credentials
   - Test Facebook login flow

2. **Add Phone Authentication** (Optional):
   - Enable Phone authentication in Firebase
   - Implement OTP verification flow

3. **Profile Management**:
   - Add edit profile functionality
   - Implement profile picture upload

4. **Enhanced Features**:
   - Add email verification
   - Implement account deletion
   - Add re-authentication for sensitive operations

---

## Support

For issues or questions:
1. Check [Firebase Documentation](https://firebase.google.com/docs)
2. Review [React Native Firebase](https://rnfirebase.io/)
3. Check error logs: `adb logcat | grep -i firebase`

---

## Summary

✅ Firebase SDK integrated  
✅ Email/Password authentication  
✅ Google Sign-In configured  
✅ Facebook Sign-In ready (needs App ID)  
✅ Detailed farmer profile setup  
✅ Firestore data storage  
✅ Bilingual UI (English/Urdu)  
✅ Password reset functionality  
✅ Profile completion flow  

Your authentication system is now ready! Just add your Facebook App credentials and test all flows.

