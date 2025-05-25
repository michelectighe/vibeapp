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

- [x] EmotionalStateScreen:
- [x] Mirror-style camera view (less rounded)
- [x] Soft fuzzy glow behind camera - make it rectangular instead of circle
- [x] “Say this phrase” with random funny prompts
- [x] Fade in camera after "Take a breath" overlay (delay & transition tuning)
- [x] Confirm scoring logic on all metric screens (motion, environment, etc.)
- [x] Fix Chakra details open
- [x] Check hr stable
- [x] add 2 more buttons for resultdetails (journaling, meditation, sound)

### 2. Layout & styling

- [x] Choose fonts
- [x] Adjustable font sizes
- [x] Adjustable layout for phone sizes
- [x] Fix colors in colors.js (use only these throughout app.. no hardcoding)
- [x] Figure out logo placement and size
- [x] Splash screen
- [x] Scroll bar sharpness?
- [x] Fix feathers
- [x] emotional transition screen: change timing to exit after text (change font)
- [x] heart rate screen - change layout
- [ ] apply sectionLayout to all screens
- [x] style results screen
- [x] breathing screen: change circle to fuzzy glow
- [x] centralize colors

### 3. Navigaton

- [x] Fix returnTos

### 4. Meditation Space Screen Polish

- [x] Remove tabbar
- [x] Remove Header
- [x] Figure out tab bar with background image

### 5. VibeCheck Section

- [x] check emotionalTransitionScreen jitter
- [x] verify resultdetails matches results

### 6. VibeMatch Section

- [ ] Test deep linking - when not signed in and when app not open vs already open
- [ ] Sharpen up match results screen
- [ ] Improve match selection screen (add option for retaking test first before comparing)
- [ ] Fix link for not signed in

### 7. Results Screen Polish

- [x] Chakra visualization cards or bar chart (with color-coded labels)
- [x] Expandable sections for each metric with brief insights
- [x] Add feedback/suggestions based on vibration score


### 8. Profile & Settings

- [x] SettingsScreen polish with animated logo + background
- [x] Update Profile:
- [x] Populate name, email, Face ID toggle
- [x] Biometric/password confirmation before saving
- [x] Disable Update button until changes made
- [x] Animate confirmation
- [x] GoalsScreen: add more details

### 9. Streak Section

- [x] Create:
- [x] Add screen to show graph of streaks
- [ ] Add challenges
- [ ] Push notifications?

### 10. Meditations & Music

- [x] Add 2–3 free meditation MP3 files
- [x] Ensure background music doesn’t conflict with analysis
- [x] Confirm play/stop logic and styling in Meditation screen
- [ ] Polish Energy Cleanse Screen
- [x] Make modal breathing screen for Energy Cleanse

### 11. App Flow Testing

- [x] Welcome screen content and navigation
- [x] Full analysis run-through (all metrics, save result)
- [x] Skip metric flow: test skipped metrics save correctly
- [x] Match result works end-to-end
- [x] Test sign-out, login again, and data persists
- [x] Confirm all sensors (camera, mic, motion) release properly
- [x] Add model to decipher background noise (nature vs city etc.)

### 12. Must do...

- [ ] figure out subscription details
- [ ] look in to ads/store products
- [ ] Get subscription set up correctly on each screen that needs it
- [ ] Offline usage - store userId locally so they can get local results
- [ ] update firestore when back online

### 13. Optional (if time permits)

- [ ] Deep linking: `vibekey://compare?id=...`
- [x] Glossary or “What’s this?” tooltips for new users
- [x] Haptics

### 14. TEST TEST TEST

## 🛠️ App Store Prep

- [x] Create app icon
- [x] Splash/launch screen
- [ ] Set up App Store Connect metadata (title, description, keywords)
- [ ] Archive app with Xcode
- [x] Upload to TestFlight
- [ ] Add testers (manual or public link)
