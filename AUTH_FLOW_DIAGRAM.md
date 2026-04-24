# FarmGuardian Authentication Flow Diagram

## 📱 User Journey Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│                        WELCOME SCREEN                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              🌾 FarmGuardian                              │  │
│  │     AI-powered farming assistant for Punjab farmers      │  │
│  │                                                           │  │
│  │               [        Login        ]                     │  │
│  │               [       Sign Up       ]                     │  │
│  │                                                           │  │
│  │                   ───  OR  ───                            │  │
│  │                                                           │  │
│  │               [ Continue as Guest ]                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                    ╱                              ╲
                   ╱                                ╲
                  ╱                                  ╲
                 ╱                                    ╲
                ╱                                      ╲
               ╱                                        ╲
┌─────────────────────────┐                  ┌─────────────────────────┐
│     LOGIN SCREEN        │                  │    SIGN UP SCREEN       │
│  ┌──────────────────┐  │                  │  ┌──────────────────┐  │
│  │  Welcome Back!   │  │                  │  │  Create Account  │  │
│  │                  │  │                  │  │                  │  │
│  │  ┌────────────┐  │  │                  │  │  ┌────────────┐  │  │
│  │  │   Google   │  │  │                  │  │  │   Google   │  │  │
│  │  └────────────┘  │  │                  │  │  └────────────┘  │  │
│  │  ┌────────────┐  │  │                  │  │  ┌────────────┐  │  │
│  │  │  Facebook  │  │  │                  │  │  │  Facebook  │  │  │
│  │  └────────────┘  │  │                  │  │  └────────────┘  │  │
│  │                  │  │                  │  │                  │  │
│  │  ───   OR   ───  │  │                  │  │  ───   OR   ───  │  │
│  │                  │  │                  │  │                  │  │
│  │  Email: _____    │  │                  │  │  Email: _____    │  │
│  │  Pass:  _____    │  │                  │  │  Pass:  _____    │  │
│  │  [Forgot Pass?]  │  │                  │  │  Confirm: ____   │  │
│  │                  │  │                  │  │                  │  │
│  │  [    Login    ] │  │                  │  │  [   Sign Up   ] │  │
│  │                  │  │                  │  │                  │  │
│  │  No account?     │  │                  │  │  Have account?   │  │
│  │  [Sign Up]       │  │                  │  │  [Login]         │  │
│  └──────────────────┘  │                  │  └──────────────────┘  │
└─────────────────────────┘                  └─────────────────────────┘
            │                                           │
            │                                           │
            ╲                                          ╱
             ╲                                        ╱
              ╲                                      ╱
               ╲                                    ╱
                ╲                                  ╱
                 ╲                                ╱
                  ╲                              ╱
                   ▼                            ▼
┌──────────────────────────────────────────────────────────────────┐
│                   AUTH CHECK                                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │   Is Profile Complete?                                     │ │
│  │                                                             │ │
│  │        NO  ──────────►  [Profile Setup Screen]             │ │
│  │                                                             │ │
│  │        YES ──────────►  [Main App]                          │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│               PROFILE SETUP SCREEN                                │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │         👨‍🌾  Complete Your Profile                           │ │
│  │                                                             │ │
│  │  Full Name:      _____________________                      │ │
│  │  Phone Number:   _____________________                      │ │
│  │  City:           _____________________                      │ │
│  │  District:       [Select District ▼]                        │ │
│  │  Village:        _____________________                      │ │
│  │  Total Land:     ___________ acres                          │ │
│  │                                                             │ │
│  │  Crops You Grow:                                            │ │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                           │ │
│  │  │🌾 □ │ │🌾 □ │ │🌽 □ │ │🥔 □ │                           │ │
│  │  │Wheat│ │Rice │ │Corn │ │Potato│                          │ │
│  │  └─────┘ └─────┘ └─────┘ └─────┘                           │ │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                           │ │
│  │  │🧅 □ │ │🍅 □ │ │🫑 □ │ │🥒 □ │                           │ │
│  │  │Onion│ │Tomato│ │Chili│ │Cucumber│                       │ │
│  │  └─────┘ └─────┘ └─────┘ └─────┘                           │ │
│  │                                                             │ │
│  │           [   Complete Setup   ]                            │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                      MAIN APP                                     │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │ │
│  │  │   Home   │  │ Disease  │  │  Yield   │  │ Advisory │  │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │ │
│  │                                                             │ │
│  │  Welcome, [User Name]! 👋                                  │ │
│  │                                                             │ │
│  │  Your Farm: [City], [District]                             │ │
│  │  Land: [X] acres | Crops: [Y]                              │ │
│  │                                                             │ │
│  │  ┌─────────────────────────────────────────────────────┐  │ │
│  │  │         Quick Actions                                │  │ │
│  │  │  🔍 Detect Disease  📊 Predict Yield               │  │ │
│  │  │  🌱 Get Advisory     🗺️ View Map                    │  │ │
│  │  └─────────────────────────────────────────────────────┘  │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

## 🔄 Authentication Method Flows

### 1️⃣ Email/Password Sign Up Flow

```
User Opens App
    ↓
Welcome Screen
    ↓
Clicks "Sign Up"
    ↓
Sign Up Screen
    ↓
Enters Email & Password
    ↓
Validation Check
    ├─ Invalid → Show Error
    └─ Valid ↓
Create Firebase Account
    ↓
Profile Setup Screen
    ├─ Fill Personal Info
    ├─ Select Location
    ├─ Enter Farm Details
    └─ Select Crops
    ↓
Submit Profile
    ↓
Save to Firestore
    ↓
Main App (Authenticated)
```

### 2️⃣ Google Sign-In Flow

```
User Opens App
    ↓
Welcome/Login Screen
    ↓
Clicks "Continue with Google"
    ↓
Google Account Picker
    ↓
User Selects Account
    ↓
Firebase Auth with Google
    ↓
Check Profile Status
    ├─ New User → Profile Setup Screen → Main App
    └─ Existing User → Main App (Direct)
```

### 3️⃣ Facebook Sign-In Flow

```
User Opens App
    ↓
Welcome/Login Screen
    ↓
Clicks "Continue with Facebook"
    ↓
Facebook Login Dialog
    ↓
User Grants Permissions
    ↓
Firebase Auth with Facebook
    ↓
Check Profile Status
    ├─ New User → Profile Setup Screen → Main App
    └─ Existing User → Main App (Direct)
```

### 4️⃣ Login Flow (Existing User)

```
User Opens App
    ↓
Welcome Screen
    ↓
Clicks "Login"
    ↓
Login Screen
    ↓
Enters Credentials
    ↓
Firebase Authentication
    ├─ Email/Password
    ├─ Google
    └─ Facebook
    ↓
Check Profile Status
    ├─ Incomplete → Profile Setup
    └─ Complete → Main App
```

### 5️⃣ Guest Mode Flow

```
User Opens App
    ↓
Welcome Screen
    ↓
Clicks "Continue as Guest"
    ↓
Main App (Limited Access)
    ├─ View Content (Read-only)
    ├─ Cannot Save Data
    └─ Prompted to Sign Up for Full Features
```

### 6️⃣ Password Reset Flow

```
Login Screen
    ↓
Clicks "Forgot Password?"
    ↓
Forgot Password Screen
    ↓
Enters Email
    ↓
Firebase Password Reset Email
    ↓
User Receives Email
    ↓
Clicks Reset Link
    ↓
Creates New Password
    ↓
Returns to Login
    ↓
Login with New Password
```

## 🗃️ Data Flow

### User Registration & Profile Creation

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Client    │         │   Firebase   │         │  Firestore  │
│   (App)     │         │     Auth     │         │  Database   │
└──────┬──────┘         └──────┬───────┘         └──────┬──────┘
       │                       │                        │
       │ signUp(email, pass)   │                        │
       ├──────────────────────►│                        │
       │                       │                        │
       │   User Created        │                        │
       │◄──────────────────────┤                        │
       │   (uid, token)        │                        │
       │                       │                        │
       │ Complete Profile      │                        │
       ├────────────────────────────────────────────────►│
       │   {name, phone,       │                        │
       │    city, district,    │                        │
       │    village, land,     │                        │
       │    crops, ...}        │                        │
       │                       │                        │
       │   Profile Saved       │                        │
       │◄────────────────────────────────────────────────┤
       │                       │                        │
       │ Navigate to Main App  │                        │
       │                       │                        │
```

### User Login & Data Retrieval

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Client    │         │   Firebase   │         │  Firestore  │
│   (App)     │         │     Auth     │         │  Database   │
└──────┬──────┘         └──────┬───────┘         └──────┬──────┘
       │                       │                        │
       │ signIn(email, pass)   │                        │
       ├──────────────────────►│                        │
       │                       │                        │
       │   Authenticated       │                        │
       │◄──────────────────────┤                        │
       │   (uid, token)        │                        │
       │                       │                        │
       │ Get User Profile      │                        │
       ├────────────────────────────────────────────────►│
       │                       │                        │
       │   Profile Data        │                        │
       │◄────────────────────────────────────────────────┤
       │                       │                        │
       │ Update Local State    │                        │
       │ Navigate to Main App  │                        │
       │                       │                        │
```

## 🔐 Security Layers

```
┌────────────────────────────────────────────────────────┐
│                   Application Layer                    │
│  ┌──────────────────────────────────────────────────┐ │
│  │  • Input Validation                               │ │
│  │  • Form Validation                                │ │
│  │  • Error Handling                                 │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────────┐
│                  Authentication Layer                  │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Firebase Authentication                          │ │
│  │  • Token-based auth                               │ │
│  │  • Automatic token refresh                        │ │
│  │  • Secure credential storage                      │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────────┐
│                    Database Layer                      │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Firestore Security Rules                         │ │
│  │  • User data isolation                            │ │
│  │  • Read/Write permissions                         │ │
│  │  • Field-level validation                         │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────────┐
│                   Transport Layer                      │
│  ┌──────────────────────────────────────────────────┐ │
│  │  • HTTPS/TLS encryption                           │ │
│  │  • Certificate pinning                            │ │
│  │  • Secure data transmission                       │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

## 📊 Component Hierarchy

```
App.js
│
├─ AuthProvider (Context)
│  ├─ User State
│  ├─ Token Management
│  └─ Auth Methods
│
├─ LanguageProvider (Context)
│  ├─ Current Language
│  └─ Translations
│
└─ NavigationContainer
   │
   └─ AppNavigator (Stack)
      │
      ├─ WelcomeScreen
      │
      ├─ LoginScreen
      │  ├─ Input (Email)
      │  ├─ Input (Password)
      │  ├─ SocialButton (Google)
      │  └─ SocialButton (Facebook)
      │
      ├─ SignUpScreen
      │  ├─ Input (Email)
      │  ├─ Input (Password)
      │  ├─ Input (Confirm Password)
      │  ├─ SocialButton (Google)
      │  └─ SocialButton (Facebook)
      │
      ├─ ProfileSetupScreen
      │  ├─ Input (Name)
      │  ├─ Input (Phone)
      │  ├─ Input (City)
      │  ├─ Picker (District)
      │  ├─ Input (Village)
      │  ├─ Input (Land)
      │  └─ CropSelector (Multi-select)
      │
      ├─ ForgotPasswordScreen
      │  └─ Input (Email)
      │
      └─ MainApp (BottomTabs)
         ├─ HomeScreen
         ├─ DiseaseDetectionScreen
         ├─ YieldPredictionScreen
         ├─ AdvisoryScreen
         └─ ProfileScreen
```

## 🎨 State Management Flow

```
┌─────────────────────────────────────────┐
│          AuthContext State              │
├─────────────────────────────────────────┤
│  • user: null | UserObject              │
│  • token: null | string                 │
│  • loading: boolean                     │
│  • isGuest: boolean                     │
└─────────────────┬───────────────────────┘
                  │
      ┌───────────┴───────────┐
      │                       │
      ▼                       ▼
┌──────────┐           ┌──────────┐
│  Login   │           │ Register │
│  Method  │           │  Method  │
└────┬─────┘           └────┬─────┘
     │                      │
     └──────────┬───────────┘
                │
                ▼
      ┌─────────────────┐
      │  Update State   │
      │  • user         │
      │  • token        │
      │  • isGuest      │
      └────────┬────────┘
               │
               ▼
      ┌─────────────────┐
      │  Save to        │
      │  AsyncStorage   │
      └────────┬────────┘
               │
               ▼
      ┌─────────────────┐
      │  Navigate to    │
      │  Appropriate    │
      │  Screen         │
      └─────────────────┘
```

---

## 📝 Notes

- All flows include proper error handling
- Loading states shown during async operations
- Validation happens before API calls
- User data persists across app restarts
- Profile completion is enforced for full access
- Guest mode has read-only limitations

---

**Visual flows help understand the complete authentication journey! 🚀**

