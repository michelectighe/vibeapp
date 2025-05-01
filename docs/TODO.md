# VibeKey - Beta Launch TODO

**Target Beta Launch: May 20, 2025**

---

## ✅ Completed / Functional

- Voice analysis (with phrases & pitch detection)
- Heart rate (camera-based, with HRV calc)
- Motion detection & frequency mapping
- Emotion detection with TFLite + face detection
- Firebase auth & Firestore integration
- RevenueCat subscription integration
- Navigation stack structure & swipe gestures
- UI styling: abstract backgrounds, color palette, fonts
- Biometric login (Face ID)
- Result saving & user profile structure
- Match result sharing (initial pass complete)

---

## 🧠 In Progress / Final Polish

### 1. Core Screens Polish

- [ ] EmotionalStateScreen:
- [x] Mirror-style camera view (less rounded)
- [x] Soft fuzzy glow behind camera
- [x] “Say this phrase” with random funny prompts
- [x] Fade in camera after "Take a breath" overlay (delay & transition tuning)
- [ ] Confirm scoring logic on all metric screens (motion, environment, etc.)
- [x] Fix Chakra details open
- [ ] Check hr stable
- [x] add 2 more buttons for resultdetails (journaling, meditation, sound)
- [ ] figure out subscription details
- [ ] look in to ads/store products

### 2. Results Screen Polish

- [x] Chakra visualization cards or bar chart (with color-coded labels)
- [ ] Expandable sections for each metric with brief insights
- [ ] Add feedback/suggestions based on vibration score
- [x] Support comparing results (via ID or dynamic link)
- [ ] Fix link for not signed in

### 3. Profile & Settings

- [ ] SettingsScreen polish with animated logo + background
- [ ] Update Profile:
- [x] Populate name, email, Face ID toggle
- [x] Biometric/password confirmation before saving
- [x] Disable Update button until changes made
- [ ] Animate confirmation
- [ ] GoalsScreen: ensure it's hooked to Firestore

### 4. Meditations & Music

- [ ] Add 2–3 free meditation MP3 files
- [x] Ensure background music doesn’t conflict with analysis
- [ ] Confirm play/stop logic and styling in Meditation screen

### 5. App Flow Testing

- [ ] Full analysis run-through (all metrics, save result)
- [ ] Skip metric flow: test skipped metrics save correctly
- [ ] Match result works end-to-end
- [ ] Test sign-out, login again, and data persists
- [ ] Confirm all sensors (camera, mic, motion) release properly

### 6. Optional (if time permits)

- [ ] Deep linking: `vibekey://compare?id=...`
- [ ] Glossary or “What’s this?” tooltips for new users

---

## 🛠️ App Store Prep

- [x] Create app icon
- [x] Splash/launch screen
- [ ] Set up App Store Connect metadata (title, description, keywords)
- [ ] Archive app with Xcode
- [ ] Upload to TestFlight
- [ ] Add testers (manual or public link)
