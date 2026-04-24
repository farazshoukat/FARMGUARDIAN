# FarmGuardian Authentication System

## 🚀 Quick Start

### Prerequisites
- Node.js installed
- Android Studio setup
- Firebase project created
- Facebook Developer account (for Facebook login)

### Setup (5 minutes)

1. **Run Setup Script** (Windows):
   ```bash
   setup-firebase-auth.bat
   ```

   Or manually:
   ```bash
   npm install
   cd android && ./gradlew signingReport
   ```

2. **Configure Firebase**:
   - Add SHA-1 to Firebase Console
   - Download updated `google-services.json`
   - Place in `android/app/google-services.json`

3. **Configure Facebook** (Optional but recommended):
   - Create Facebook App at https://developers.facebook.com/
   - Update `android/app/src/main/res/values/strings.xml`:
     ```xml
     <string name="facebook_app_id">YOUR_APP_ID</string>
     <string name="facebook_client_token">YOUR_CLIENT_TOKEN</string>
     <string name="fb_login_protocol_scheme">fbYOUR_APP_ID</string>
     ```

4. **Run App**:
   ```bash
   npm run android
   ```

## 📱 Features

### Authentication Methods
- ✅ Email/Password authentication
- ✅ Google Sign-In
- ✅ Facebook Sign-In  
- ✅ Guest mode (limited access)
- ✅ Password reset via email

### User Profile Collection
Detailed farmer information:
- Personal: Name, Phone, Email
- Location: City, District, Village
- Farm: Total land, Crops grown
- Preferences: Language, Notifications

### Screens
1. **Welcome** - Landing page with auth options
2. **Login** - Email/password + social login
3. **Sign Up** - Registration with social options
4. **Profile Setup** - Detailed farmer info form
5. **Forgot Password** - Password recovery

## 🎨 UI Highlights

### Modern Design
- Clean, professional interface
- Social auth buttons with brand colors
- Smooth transitions and animations
- Loading states and error handling

### Bilingual Support
- Full English and Urdu translations
- Right-to-left text support
- Localized error messages
- District names in both languages

### Form Validation
- Real-time field validation
- Clear error messages
- Required field indicators
- Format checking (email, phone)

## 🔐 Security

### Firebase Security
- Secure authentication tokens
- Automatic token refresh
- Protected API endpoints
- Encrypted data transmission

### Data Protection
- Firestore security rules
- User data isolation
- Profile access control
- GDPR-compliant data handling

### Input Validation
- Email format validation
- Password strength (min 6 chars)
- Phone format (03XXXXXXXXX)
- XSS prevention

## 📊 Data Storage

### Firestore Structure
```
/users/{uid}
  - uid: string
  - email: string
  - displayName: string
  - phoneNumber: string
  - city: string
  - district: string
  - village: string
  - totalLand: number
  - cropsGrown: array
  - authProvider: string
  - isProfileComplete: boolean
  - createdAt: timestamp
  - updatedAt: timestamp
```

## 🧪 Testing

### Test Accounts
Create test accounts for each method:
1. Email/Password: test@farmguardian.app
2. Google: Use your Google account
3. Facebook: Use your Facebook account

### Test Scenarios
- [ ] New user signup → Profile setup → Main app
- [ ] Existing user login → Main app
- [ ] Social auth (Google/Facebook)
- [ ] Password reset flow
- [ ] Guest mode access
- [ ] Profile completion validation
- [ ] Network error handling

## 📚 Documentation

Detailed guides available:
- **FIREBASE_AUTH_SETUP.md** - Complete Firebase setup
- **AUTHENTICATION_GUIDE.md** - Technical implementation details
- **QUICK_REFERENCE.md** - Quick command reference

## 🛠️ Troubleshooting

### Common Issues

**Google Sign-In not working?**
- Ensure SHA-1 is added to Firebase
- Download updated google-services.json
- Rebuild app: `cd android && ./gradlew clean`

**Facebook Sign-In failing?**
- Add Facebook App ID to strings.xml
- Configure OAuth redirect in Facebook console
- Check package name matches: com.farmguardian

**Profile not saving?**
- Check internet connection
- Verify Firestore rules
- Check Firebase console for errors

**Build errors?**
- Clean build: `cd android && ./gradlew clean`
- Clear cache: `npm start -- --reset-cache`
- Reinstall: `rm -rf node_modules && npm install`

## 📞 Support

### Resources
- Firebase Docs: https://firebase.google.com/docs
- React Native Firebase: https://rnfirebase.io/
- Project Issues: See FIREBASE_AUTH_SETUP.md

### Getting Help
1. Check error logs: `adb logcat`
2. Review Firebase Console errors
3. Check documentation files
4. Verify all configuration steps

## 🎯 What's Next?

### Immediate
1. Add Facebook credentials
2. Test all authentication flows
3. Complete Firestore security rules
4. Test on physical device

### Future Enhancements
- [ ] Email verification
- [ ] Phone number verification (SMS)
- [ ] Profile picture upload
- [ ] Edit profile functionality
- [ ] Two-factor authentication
- [ ] Biometric authentication
- [ ] Account linking
- [ ] Account deletion

## ✅ Checklist

- [ ] Dependencies installed
- [ ] google-services.json configured
- [ ] SHA-1 added to Firebase
- [ ] Firebase authentication enabled
- [ ] Facebook App ID added (optional)
- [ ] App builds successfully
- [ ] Login flow tested
- [ ] Sign up flow tested
- [ ] Profile setup tested
- [ ] Social auth tested

## 🎉 Success!

Once all steps are complete:
1. Run: `npm run android`
2. Test welcome screen
3. Try each authentication method
4. Complete profile setup
5. Access main app

Your authentication system is now fully functional! 🚀

---

**Questions?** Check the detailed guides:
- FIREBASE_AUTH_SETUP.md
- AUTHENTICATION_GUIDE.md

