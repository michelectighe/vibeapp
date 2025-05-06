//src/utils/index.js

import { initializeRevenueCat } from "@/utils/initRevCat";
import { signInWithApple } from "@/utils/signInWithApple";

//import { useKickJS } from "../hooks/useKickJS";
export { initializeRevenueCat } from "./initRevCat";
export { startPurchaseFlow } from "./purchaseSubscription";
export { audioMap } from "./audioMap";
export {
  isBiometricAvailable,
  saveBiometricOptIn,
  getBiometricOptIn,
  saveCredentials,
  getSavedCredentials,
  clearSavedCredentials,
} from "./biometricsUtils";
export { cleanupMedia } from "./cleanupMedia";
export { compareResults } from "./compareResults";
export { debounceLabel } from "./debounceLabel";
export { SCREEN_WIDTH, SCREEN_HEIGHT } from "./dimensions";
export { evaluateEnvironment } from "./evaluateEnvironment";
export {
  evaluateVoiceFrequency,
  evaluateVoiceClarity,
  evaluateVoiceStrength,
  evaluateEmotionalState,
} from "./evaluateMetrics";
export { evaluateMotion } from "./evaluateMotion";
export { getFriendlyError } from "./friendlyErrors";
export { generateShortId } from "./generateShortId";
export { getVibeDetails } from "./getVibeDetails";
export {
  calculateVariance,
  removeOutliers,
  smoothData,
  detectHeartbeats,
  formatTimestampWithMs,
  calculateHRVAndBPM,
} from "./heartRateHelpers";
export { hexToRgba } from "./colorUtils";
export { initApp } from "./initApp";
export { initMedia } from "./initMedia";
export { loadResults } from "./loadResults";
export { MusicManager, setShouldPlayAmbient, setUserMusicPref } from "./musicManager";
export { createRefChecker } from "./runOnJSRefChecker";
export { saveResults } from "./saveResults";
export {
  setSubscriptionStatus,
  getSubscriptionStatus,
} from "./subscriptionUtils";
export {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
  scaledStyle,
} from "./layout";
export { signInWithApple } from "./signInWithApple";

export { isPasswordValid, getPasswordStrength } from "./validatePassword";
