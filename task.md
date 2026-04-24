# TFLite Integration — Task Tracker

## Phase 1: Dependencies & Config
- [x] Update `metro.config.js` — add `tflite` to `assetExts`
- [x] Update `android/app/build.gradle` — add `aaptOptions { noCompress "tflite" }` + TFLite Gradle dependencies
- [ ] ~~Install npm packages (`react-native-fast-tflite`, `react-native-nitro-modules`)~~ — **SKIPPED**: `newArchEnabled=false`; replaced with a custom Android native module instead.

## Phase 2: Place Model Files
- [x] Create `android/app/src/main/assets/models/` directory
- [x] Copy all 5 `.tflite` files (lowercase names): maize, potato, rice, tomato, wheat

## Phase 3: New Files
- [x] Create `src/config/modelConfig.js` — crop→model mapping, labels (EN + Urdu), severity, recommendations
- [x] Create `src/services/tfliteService.js` — JS wrapper around native TFLiteClassifier module
- [x] Create `src/utils/imagePreprocessor.js` — URI normalization & validation (resize/normalize done natively)
- [x] Create `TFLiteClassifierModule.java` — native module: loads model, decodes JPEG, resizes to 224×224, runs TFLite inference
- [x] Create `TFLiteClassifierPackage.java` — registers native module with React Native bridge
- [x] Register `TFLiteClassifierPackage` in `MainApplication.java`

## Phase 4: Update Existing Files
- [x] Update `src/services/diseaseService.js` — replaced mock with real TFLite inference via `tfliteService`
- [x] Update `src/screens/DiseaseDetectionScreen.js` — pass URI directly (no base64), release model on unmount

## Phase 5: Verify / Test
- [ ] Build APK (`cd android && gradlew assembleDebug`) — confirm no compile errors
- [ ] Run on device / emulator — test each crop type
- [ ] Confirm inference results are displayed correctly (disease name in Urdu, confidence bar, recommendations)
