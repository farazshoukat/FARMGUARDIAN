# FarmGuardian Development Guide

## Getting Started

### Prerequisites
- Node.js 16+
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Java Development Kit (JDK) 11+

### Initial Setup

1. **Install Dependencies**
```bash
cd App
npm install
```

2. **iOS Setup (macOS only)**
```bash
cd ios
pod install
cd ..
```

3. **Android Setup**
- Open Android Studio
- Open the `android` folder
- Wait for Gradle sync to complete
- Create a virtual device or connect a physical device

### Running the App

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

**Start Metro Bundler:**
```bash
npm start
```

## Development Workflow

### Project Structure
```
src/
├── components/      # Reusable UI components
├── context/        # React Context providers
├── hooks/          # Custom React hooks
├── locales/        # i18n translations
├── navigation/     # Navigation configuration
├── screens/        # Screen components
├── services/       # API service layers
└── utils/          # Utility functions and constants
```

### Adding New Features

1. **Create Screen Component**
   - Add to `src/screens/`
   - Import required components
   - Use hooks for state management

2. **Add Navigation**
   - Update `src/navigation/AppNavigator.js` or `BottomTabNavigator.js`
   - Add screen to appropriate navigator

3. **Add Translations**
   - Update `src/locales/ur.json` (Urdu)
   - Update `src/locales/en.json` (English)

4. **Create API Service**
   - Add to `src/services/`
   - Include mock responses for development

### Code Style

- Use functional components with hooks
- Follow React Native best practices
- Use StyleSheet for styling
- Keep components small and reusable
- Add comments for complex logic

### State Management

- Use React Context for global state (Auth, Language)
- Use local state (useState) for component-specific data
- Use AsyncStorage for persistence

### API Integration

#### Mock Mode (Development)
```javascript
const MOCK_MODE = true; // In service files
```

#### Production Mode
```javascript
const MOCK_MODE = false;
// Update API_BASE_URL in src/utils/constants.js
```

### Testing

**Unit Tests:**
```bash
npm test
```

**Linting:**
```bash
npm run lint
```

**Type Checking:**
```bash
npm run type-check
```

## Building for Production

### Android

1. **Generate Release APK:**
```bash
cd android
./gradlew assembleRelease
```

2. **Generate AAB (for Play Store):**
```bash
./gradlew bundleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

### iOS

1. **Open Xcode:**
```bash
open ios/FarmGuardian.xcworkspace
```

2. **Archive:**
   - Select "Any iOS Device" as target
   - Product → Archive
   - Follow distribution wizard

## Environment Variables

Create `.env` file for environment-specific configs:
```
API_BASE_URL=https://api.farmguardian.pk
GOOGLE_MAPS_API_KEY=your_key_here
```

## Common Issues & Solutions

### Metro Bundler Issues
```bash
npm start -- --reset-cache
```

### Android Build Errors
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS Pod Install Issues
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Clearing App Data
```bash
# Android
adb shell pm clear com.farmguardian

# iOS
Device Settings → FarmGuardian → Delete App
```

## API Documentation

### Disease Detection
```javascript
POST /api/disease/detect
Body: {
  image: "base64_string",
  cropType: "wheat",
  userId: "user_id"
}
Response: {
  id: "detection_id",
  result: {
    status: "healthy" | "warning" | "diseased",
    diseaseName: "Disease Name",
    diseaseNameUrdu: "بیماری کا نام",
    confidence: 0.95,
    recommendations: ["..."]
  }
}
```

### Yield Prediction
```javascript
POST /api/yield/predict
Body: {
  cropType: "wheat",
  farmSize: 10,
  location: "faisalabad",
  soilColor: "dark_brown",
  previousCrop: "maize",
  fertilizerUsed: "urea",
  userId: "user_id"
}
Response: {
  predictedYield: 42.5,
  totalYield: 425,
  regionalAverage: 38.0,
  unit: "maunds",
  confidence: 0.87
}
```

## Deployment Checklist

- [ ] Update version in `package.json`
- [ ] Update version in `android/app/build.gradle`
- [ ] Update version in `ios/FarmGuardian/Info.plist`
- [ ] Test on physical devices (Android & iOS)
- [ ] Verify all permissions work
- [ ] Test offline functionality
- [ ] Verify API endpoints
- [ ] Update CHANGELOG.md
- [ ] Create git tag for release
- [ ] Build release APK/AAB
- [ ] Archive iOS app
- [ ] Upload to Play Store / App Store

## Performance Optimization

### Images
- Compress images before upload
- Use appropriate image resolutions
- Cache images locally

### API Calls
- Implement request debouncing
- Cache responses when appropriate
- Use pagination for lists

### Navigation
- Use lazy loading for screens
- Optimize heavy components
- Avoid unnecessary re-renders

## Security Best Practices

- Never commit API keys or secrets
- Use environment variables for sensitive data
- Validate all user inputs
- Sanitize data before API calls
- Use HTTPS for all API communications
- Implement proper authentication
- Store sensitive data securely (Keychain/Keystore)

## Support & Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [i18next Documentation](https://www.i18next.com/)

## Contributing

1. Create feature branch from `develop`
2. Make changes with clear commit messages
3. Test thoroughly on both platforms
4. Create pull request with description
5. Wait for code review
6. Address feedback and merge

## License

MIT License - See LICENSE file for details

