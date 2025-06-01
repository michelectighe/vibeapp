// utils/evaluateMetrics.js

export function evaluateVoiceFrequency(frequencyHz) {
  let score = 0;
  let label = "";
  const rounded = Math.round(frequencyHz);
  if (frequencyHz < 70) {
    score = 20;
    label = "very low (flat or depressed)";
  } else if (frequencyHz < 110) {
    score = 40;
    label = "low (monotone or tired)";
  } else if (frequencyHz < 150) {
    score = 70;
    label = "calm and grounded";
  } else if (frequencyHz < 220) {
    score = 100;
    label = "clear and vibrant";
  } else if (frequencyHz < 300) {
    score = 80;
    label = "high energy, slightly tense";
  } else {
    score = 60;
    label = "very high (strained or anxious)";
  }
  return {
    value: rounded,
    raw: frequencyHz,
    score,
    label,
  };
}

const normalizeClarity = (clarityScore) => {
  const min = 5;
  const max = 80;
  const clamped = Math.max(min, Math.min(clarityScore, max));
  return 100 - ((clamped - min) / (max - min)) * 100;
};

export function evaluateVoiceClarity(clarityScore) {
  const roundedRaw = Math.round(clarityScore);
  const score = Math.round(normalizeClarity(clarityScore));
  let label = "";
  if (score < 30) {
    label = "unclear (muffled or slurred)";
  } else if (score < 50) {
    label = "somewhat clear (inconsistent tone)";
  } else if (score < 70) {
    label = "moderately clear";
  } else if (score < 90) {
    label = "clear and articulate";
  } else {
    label = "exceptionally clear and focused";
  }
  return {
    value: score,
    score,
    raw: roundedRaw,
    label,
  };
}

const normalizeLoudness = (loudnessDb) => {
  const minDb = -45;
  const maxDb = -8;
  const clampedDb = Math.max(minDb, Math.min(loudnessDb, maxDb));
  return ((clampedDb - minDb) / (maxDb - minDb)) * 100;
};

export function evaluateVoiceStrength(strengthScore) {
  const score = Math.round(normalizeLoudness(strengthScore));
  const rounded = Math.round(strengthScore);
  let label = "";
  if (score < 30) {
    label = "very weak (shaky or strained)";
  } else if (score < 50) {
    label = "soft (hesitant or uncertain)";
  } else if (score < 70) {
    label = "moderately strong ";
  } else if (score < 90) {
    label = "strong and confident";
  } else {
    label = "powerful and grounded";
  }
  return {
    value: rounded,
    score,
    label,
  };
}

export function evaluateEmotionalState(emotion) {
  let score = 60;
  let label = "undefined";
  let description = "Emotion is unclear or mixed.";

  if (typeof emotion === "number") {
    const lookup = {
      100: ["joyful", "You radiate happiness and warmth."],
      70: ["balanced", "You seem emotionally stable and calm."],
      40: ["downcast", "You seem to be feeling sadness or fatigue."],
      30: ["agitated", "You seem frustrated or tense."],
      80: ["alert", "There’s a sense of excitement or curiosity."],
      35: ["anxious", "You seem nervous or worried."],
    };
    if (lookup[emotion]) {
      [label, description] = lookup[emotion];
      score = emotion;
    }
  } else if (typeof emotion === "string") {
    const map = {
      happiness: [100, "joyful", "You radiate happiness and warmth."],
      neutral: [70, "balanced", "You seem emotionally stable and calm."],
      sadness: [40, "downcast", "You seem to carry sadness or fatigue."],
      anger: [30, "agitated", "You seem frustrated or tense."],
      surprise: [80, "alert", "There’s a sense of excitement or curiosity."],
      fear: [35, "anxious", "You seem nervous or worried."],
      disgust: [35, "anxious", "You seem nervous or worried."],
      contempt: [35, "anxious", "You seem nervous or worried."],
    };
    if (map[emotion]) {
      [score, label, description] = map[emotion];
    }
  }

  return {
    value: score,
    score,
    label,
    description,
  };
}

export function evaluateMotion({ avgMagnitude }) {
  let score = 20;
  let label = "unsettled waves";

  if (avgMagnitude <= 1.0) {
    score = 100;
    label = "grounded & still";
  } else if (avgMagnitude <= 1.5) {
    score = 80;
    label = "subtle flow";
  } else if (avgMagnitude <= 2.0) {
    score = 60;
    label = "restless energy";
  } else if (avgMagnitude <= 2.5) {
    score = 40;
    label = "active movement";
  }

  return {
    value: avgMagnitude,
    score,
    label,
  };
}

export function evaluateEnvironment({ soundLevelDb, magnetometerValue, percentGood }) {
  let soundScore = 100 - soundLevelDb;
  let soundLabel = "unknown";
  if (percentGood >= 80) soundLabel = "Whispering stillness";
  else if (percentGood >= 55) soundLabel = "Soft hum of life";
  else if (percentGood >= 50) soundLabel = "Lively & Energetic surroundings";
  else if (percentGood >= 40) soundLabel = "Disturbing surroundings";
  else soundLabel = "Chaotic vibration";

  let magnetometerScore = 30;
  let magnetometerLabel = "Interference";
  if (magnetometerValue === 0 || isNaN(magnetometerValue)) {
    magnetometerScore = 10;
    magnetometerLabel = "";
  } else if (magnetometerValue >= 25 && magnetometerValue <= 65) {
    magnetometerScore = 100;
    magnetometerLabel = "Natural resonance";
  } else if (magnetometerValue > 65 && magnetometerValue < 100) {
    magnetometerScore = 50;
    magnetometerLabel = "Urban pulse";
  } else if (magnetometerValue >= 100) {
    magnetometerScore = 20;
    magnetometerLabel = "Electric tension";
  }

  const overallScore = (Number(percentGood) + Number(magnetometerScore)) / 2;
  let overallLabel = "Poor location";
  if (overallScore >= 80) overallLabel = "Excellent location";
  else if (overallScore >= 60) overallLabel = "Good location";
  else if (overallScore >= 40) overallLabel = "Fair location";

  return {
    sound: {
      value: soundScore,
      score: Math.round(soundScore),
      label: soundLabel,
    },
    magnetometer: {
      value: magnetometerValue,
      score: Math.round(magnetometerScore),
      label: magnetometerLabel,
    },
    overall: {
      value: Math.round(overallScore),
      label: overallLabel,
    },
  };
}
