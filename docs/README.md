# VibeKey App

VibeKey is a React Native app that helps users assess and raise their vibrational frequency using voice, heart rate, motion, emotional state, and environmental factors.

---

## 🚀 Features

- Sign in with Email, Google, or Apple
- Voice and emotion analysis
- Heart rate tracking
- Environmental frequency detection
- Chakra & aura insights
- Personalized results and frequency score

---

## 📦 Tech Stack

- React Native
- Firebase Authentication & Firestore
- TensorFlow Lite (fast-tflite)
- Vision Camera
- RevenueCat (for subscriptions)

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/michelectighe/vibeapp.git
cd vibeapp
```

### 2. Install dependencies

```bash
npm install
cd ios
pod install
cd ..
```

### 3. Firebase Config

Download your `GoogleService-Info.plist` from the Firebase Console and place it in:

```
ios/VibeKey/
```

> ⚠️ This file is **not committed to Git** for security reasons.  
> Be sure to keep it secure and share only with trusted collaborators.

### 4. Run the app

```bash
npx react-native run-ios
```

---

## 🔐 Environment Setup

Make sure you’ve added your **reverse client ID** to your app’s `Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>com.googleusercontent.apps.YOUR_CLIENT_ID</string>
    </array>
  </dict>
</array>
```

This enables Google Sign-In on iOS.

---

## 📁 .gitignore

Make sure your `.gitignore` includes:

```gitignore
# Firebase
ios/VibeKey/GoogleService-Info.plist

# Node modules
node_modules/

# macOS system files
.DS_Store

# Logs
npm-debug.log*
yarn-debug.log*
```

---

## ✨ Credits

- Designed in collaboration with Lauren 💖
- Developed with caffeine and persistence by Michele ☕️

---

## 📌 Notes

- This app is still in development — feedback welcome!
- iOS is the current focus; Android support will be added later.
