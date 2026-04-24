# FarmGuardian - Authentication System Guide

## 🎯 Overview

FarmGuardian now features a comprehensive authentication system with Firebase integration, supporting multiple sign-in methods and detailed farmer profile management.

## 🚀 Quick Start

### 1. Install Dependencies (Already Done)
```bash
npm install
```

Packages installed:
- `@react-native-firebase/app` - Firebase core
- `@react-native-firebase/auth` - Authentication
- `@react-native-firebase/firestore` - Database
- `@react-native-google-signin/google-signin` - Google Sign-In
- `react-native-fbsdk-next` - Facebook SDK

### 2. Configure Firebase (Required)

**Step 1:** Add your Facebook App credentials in `android/app/src/main/res/values/strings.xml`:

```xml
<string name="facebook_app_id">YOUR_FACEBOOK_APP_ID</string>
<string name="facebook_client_token">YOUR_FACEBOOK_CLIENT_TOKEN</string>
<string name="fb_login_protocol_scheme">fbYOUR_FACEBOOK_APP_ID</string>
```

**Step 2:** Get SHA-1 fingerprint:
```bash
cd android
./gradlew signingReport
```

**Step 3:** Add SHA-1 to Firebase Console:
- Go to Firebase Console > Project Settings
- Add SHA-1 under Android app fingerprints
- Download updated `google-services.json`

**Step 4:** Enable authentication methods in Firebase Console:
- Go to Authentication > Sign-in method
- Enable: Email/Password, Google, Facebook

### 3. Run the App
```bash
npm run android
```

## 📱 Authentication Flows

### User Journey Map

```
Welcome Screen
    ├─→ Login (Existing Users)
    │   ├─→ Email/Password
    │   ├─→ Google Sign-In
    │   ├─→ Facebook Sign-In
    │   └─→ [If authenticated] → Main App
    │
    ├─→ Sign Up (New Users)
    │   ├─→ Email/Password Registration
    │   ├─→ Google Sign-Up
    │   ├─→ Facebook Sign-Up
    │   └─→ Profile Setup → Main App
    │
    └─→ Guest Mode (Limited Access)
        └─→ Main App (Read-only features)
```

## 🎨 New Screens

### 1. **LoginScreen** (`src/screens/LoginScreen.js`)
Modern login interface with:
- Email/Password fields with validation
- Google Sign-In button (red)
- Facebook Sign-In button (blue)
- Forgot Password link
- Sign Up navigation
- Guest mode option

**Features:**
- Real-time form validation
- Error handling with user-friendly messages
- Loading states for each auth method
- Automatic profile check (navigates to setup if incomplete)

### 2. **SignUpScreen** (`src/screens/SignUpScreen.js`)
Registration interface with:
- Email field with validation
- Password field (min 6 characters)
- Confirm Password field
- Social sign-up buttons
- Terms & Privacy Policy links
- Login navigation

**Features:**
- Password strength validation
- Password matching confirmation
- Email format validation
- Social auth integration

### 3. **ProfileSetupScreen** (`src/screens/ProfileSetupScreen.js`)
Comprehensive farmer profile form:

**Personal Information:**
- Full Name (required)
- Phone Number (format: 03XXXXXXXXX)
- City (required)

**Location Details:**
- District (dropdown with all Punjab districts)
- Village/Town name

**Farm Information:**
- Total Land in acres (numeric)
- Crops Selection (multi-select chips):
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

**Features:**
- Complete form validation
- Visual feedback for selected crops
- District picker with Urdu/English names
- Required field indicators
- Prevents back navigation (must complete)

### 4. **ForgotPasswordScreen** (`src/screens/ForgotPasswordScreen.js`)
Password recovery:
- Email input field
- Sends Firebase password reset email
- Success confirmation
- Back to login navigation

### 5. **Updated WelcomeScreen** (`src/screens/WelcomeScreen.js`)
Landing page with:
- App logo and branding
- Login button
- Sign Up button
- Guest mode option
- Feature highlights

## 🔧 Core Components

### **SocialButton** (`src/components/SocialButton.js`)
Reusable social authentication button:
```javascript
<SocialButton
  title="Continue with Google"
  icon="google"
  backgroundColor="#DB4437"
  onPress={handleGoogleLogin}
  loading={loading}
/>
```

Props:
- `title`: Button text
- `icon`: Icon name from MaterialCommunityIcons
- `backgroundColor`: Button color
- `textColor`: Text color (default: white)
- `onPress`: Click handler
- `loading`: Loading state
- `disabled`: Disabled state

## 🔐 Authentication Service

### Updated `authService.js`

**New Methods:**

#### Email/Password
```javascript
// Sign up
const result = await signUpWithEmail(email, password);

// Sign in
const result = await signInWithEmail(email, password);
```

#### Social Authentication
```javascript
// Google Sign-In
const result = await signInWithGoogle();

// Facebook Sign-In
const result = await signInWithFacebook();
```

#### Profile Management
```javascript
// Update user profile
const result = await updateUserProfile(uid, profileData);

// Password reset
await sendPasswordResetEmail(email);

// Sign out
await signOut();
```

**Response Format:**
```javascript
{
  success: true,
  user: {
    uid: "firebase_user_id",
    email: "user@example.com",
    displayName: "John Doe",
    photoURL: "https://...",
    // ... profile data
  },
  token: "firebase_id_token",
  isNewUser: false
}
```

## 💾 Data Structure

### Firestore Schema

**Collection:** `users`  
**Document ID:** Firebase UID

```javascript
{
  // Firebase Auth Data
  uid: "string",
  email: "string",
  displayName: "string",
  photoURL: "string",
  
  // Profile Data
  phoneNumber: "03001234567",
  city: "Lahore",
  district: "lahore",
  village: "Model Town",
  totalLand: 25.5,
  cropsGrown: ["wheat", "rice", "corn"],
  
  // Metadata
  isProfileComplete: true,
  authProvider: "google", // "email" | "google" | "facebook"
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 🌐 Internationalization

All new screens support English and Urdu:

**New Translation Keys Added:**

```javascript
// English (en.json)
"auth": {
  "welcomeBack": "Welcome Back",
  "loginToContinue": "Login to continue your farming journey",
  "createAccount": "Create Account",
  "email": "Email Address",
  "password": "Password",
  "confirmPassword": "Confirm Password",
  "forgotPassword": "Forgot Password?",
  "continueWithGoogle": "Continue with Google",
  "continueWithFacebook": "Continue with Facebook",
  "completeProfile": "Complete Your Profile",
  "fullName": "Full Name",
  "phoneNumber": "Phone Number",
  "city": "City",
  "district": "District",
  "village": "Village/Town",
  "totalLand": "Total Land (Acres)",
  "cropsGrown": "Crops You Grow",
  "selectCrops": "Select all crops you currently grow",
  // ... more keys
}

// Urdu (ur.json) - Complete translations provided
```

## 🎯 User Experience Features

### Form Validation
- Real-time validation feedback
- Clear error messages
- Field-specific errors
- Required field indicators

### Visual Feedback
- Loading states for async operations
- Success/error alerts
- Disabled states during processing
- Visual crop selection

### Navigation Flow
- Automatic profile completion check
- Prevents back navigation on profile setup
- Smart routing based on auth state
- Guest mode with limited access

### Error Handling
- User-friendly error messages
- Network error detection
- Firebase error translation
- Graceful fallbacks

## 🔒 Security Features

### Authentication
- Firebase secure authentication
- Token-based sessions
- Automatic token refresh
- Secure password reset

### Data Protection
- Firestore security rules ready
- User data isolation
- Profile access control
- Secure social auth flow

### Input Validation
- Email format validation
- Password strength requirements
- Phone number format (Pakistani)
- Numeric land size validation

## 📝 Code Examples

### Login with Email
```javascript
import { signInWithEmail } from '../services/authService';

const handleLogin = async () => {
  try {
    const result = await signInWithEmail(email, password);
    if (result.success) {
      await login(result.user, result.token);
      navigation.replace('MainApp');
    }
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};
```

### Google Sign-In
```javascript
import { signInWithGoogle } from '../services/authService';

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithGoogle();
    if (result.isNewUser) {
      navigation.navigate('ProfileSetup', {
        userData: result.user,
        token: result.token
      });
    } else {
      await login(result.user, result.token);
      navigation.replace('MainApp');
    }
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};
```

### Profile Setup
```javascript
import { updateUserProfile } from '../services/authService';

const handleProfileSubmit = async () => {
  const profileData = {
    name,
    phoneNumber,
    city,
    district,
    village,
    totalLand: parseFloat(totalLand),
    cropsGrown,
  };
  
  const result = await updateUserProfile(userId, profileData);
  await register(result.user, token);
  navigation.replace('MainApp');
};
```

## 🧪 Testing Checklist

### Email/Password Flow
- [ ] Sign up with new email
- [ ] Login with existing account
- [ ] Password validation (min 6 chars)
- [ ] Email format validation
- [ ] Password mismatch detection
- [ ] Forgot password flow
- [ ] Profile completion after signup

### Google Sign-In Flow
- [ ] First-time Google sign-in
- [ ] Returning Google user
- [ ] Profile completion for new users
- [ ] Direct app access for existing users
- [ ] Account selection
- [ ] Sign-out functionality

### Facebook Sign-In Flow
- [ ] First-time Facebook sign-in
- [ ] Returning Facebook user
- [ ] Profile completion
- [ ] Permission grants
- [ ] Sign-out functionality

### Profile Setup Flow
- [ ] All required fields validation
- [ ] Phone number format (03XXXXXXXXX)
- [ ] District selection
- [ ] Multiple crop selection
- [ ] Numeric land size validation
- [ ] Form submission
- [ ] Data saved to Firestore

### Edge Cases
- [ ] Network disconnection
- [ ] Invalid credentials
- [ ] Duplicate email registration
- [ ] Back button during profile setup
- [ ] Guest mode limitations
- [ ] Firebase errors handling

## 📚 File Structure

```
src/
├── screens/
│   ├── LoginScreen.js           ✨ NEW
│   ├── SignUpScreen.js          ✨ NEW
│   ├── ProfileSetupScreen.js    ✨ NEW
│   ├── ForgotPasswordScreen.js  ✨ NEW
│   └── WelcomeScreen.js         🔄 UPDATED
├── components/
│   └── SocialButton.js          ✨ NEW
├── services/
│   └── authService.js           🔄 UPDATED (Firebase)
├── context/
│   └── AuthContext.js           🔄 UPDATED (Firebase)
├── config/
│   └── firebase.js              ✨ NEW
├── locales/
│   ├── en.json                  🔄 UPDATED
│   └── ur.json                  🔄 UPDATED
└── navigation/
    └── AppNavigator.js          🔄 UPDATED

android/
├── app/
│   ├── google-services.json     ✨ NEW
│   ├── build.gradle             🔄 UPDATED
│   └── src/main/
│       ├── AndroidManifest.xml  🔄 UPDATED
│       └── res/values/
│           └── strings.xml      ✨ NEW
└── build.gradle                 🔄 UPDATED
```

## 🎨 UI/UX Improvements

### Modern Design
- Clean, minimal interface
- Consistent color scheme
- Professional social buttons
- Smooth transitions

### User Guidance
- Clear instructions
- Helpful placeholders
- Progress indicators
- Success confirmations

### Accessibility
- Proper label associations
- Keyboard navigation
- Error announcements
- Touch target sizes

## 🐛 Common Issues & Solutions

### Issue: Google Sign-In DEVELOPER_ERROR
**Solution:** Add SHA-1 to Firebase Console and download new google-services.json

### Issue: Facebook login fails
**Solution:** Add Facebook App ID and Client Token to strings.xml

### Issue: Profile not saving
**Solution:** Check Firestore rules, ensure user is authenticated

### Issue: App crashes on auth
**Solution:** Rebuild app after Firebase configuration: `cd android && ./gradlew clean`

## 📈 Next Steps

### Recommended Enhancements
1. Email verification flow
2. Phone number verification (SMS OTP)
3. Profile picture upload
4. Edit profile functionality
5. Account deletion option
6. Link multiple providers
7. Two-factor authentication
8. Account recovery options

### Analytics Integration
- Track authentication methods
- Monitor signup completion rate
- Measure time to profile completion
- Track user engagement

## 📞 Support Resources

- **Firebase Docs:** https://firebase.google.com/docs
- **React Native Firebase:** https://rnfirebase.io/
- **Google Sign-In:** https://github.com/react-native-google-signin/google-signin
- **Facebook SDK:** https://github.com/thebergamo/react-native-fbsdk-next

---

## ✅ Implementation Summary

✨ **What's New:**
- Complete Firebase authentication system
- Beautiful modern UI for auth screens
- Detailed farmer profile collection
- Multi-language support (English/Urdu)
- Social authentication (Google/Facebook)
- Profile completion workflow
- Password reset functionality
- Form validation & error handling

🎯 **Ready to Use:**
- Just add Facebook credentials
- Add SHA-1 to Firebase
- Test all authentication flows
- Deploy to production!

---

**Built with ❤️ for Punjab farmers**

