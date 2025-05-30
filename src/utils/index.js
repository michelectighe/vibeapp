//src/utils/index.js
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

export {
  evaluateVoiceFrequency,
  evaluateVoiceClarity,
  evaluateVoiceStrength,
  evaluateEmotionalState,
  evaluateMotion,
  evaluateEnvironment,
} from "./evaluateMetrics";

export { getFriendlyError } from "./friendlyErrors";
export { generateShortId } from "./generateShortId";
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
export { MusicManager, setShouldPlayAmbient, setUserMusicPref } from "./musicManager";
export { createRefChecker } from "./runOnJSRefChecker";
export { setSubscriptionStatus, getSubscriptionStatus } from "./subscriptionUtils";
export { scale, verticalScale, moderateScale, fontScale, scaledStyle } from "./layout";
export { signInWithApple } from "./signInWithApple";

export { isPasswordValid, getPasswordStrength } from "./validatePassword";
export { getVibrationInfo } from "./vibrationInfo";
export { isValidScore, formatScoreForDisplay } from "./validScores";
export { getVibeRecommendations } from "./getRecommendations";

export { getVibeHistory, groupScores } from "./getVibeHistory";
export { lightenHexColor } from "./lightenHexColor.js";

export { analyzePeacefulness } from "./analyzePeacefulness";
export { loadSoundClassLabels } from "./loadSoundClassLabels";


// clean up

export { resetStack } from "./resetStack";
export { checkConnection } from "./checkConnection";

export { getTodayGoodNews, uploadDataToFireStore } from "./manageGoodNews";
export { getSharedResult } from "./getSharedResult";