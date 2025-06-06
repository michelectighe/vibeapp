// utils/evaluateMetrics.js

export function evaluateVoiceFrequency(frequencyHz) {
  if (frequencyHz === "skipped") {
    return {
      value: "skipped",
      score: -1,
      label: "skipped",
    };
  };
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
    value: frequencyHz,
    score,
    label,
  };
}

const normalizeClarity = (voiceEmotion) => {
  const min = 5;
  const max = 80;
  const clamped = Math.max(min, Math.min(voiceEmotion, max));
  return 100 - ((clamped - min) / (max - min)) * 100;
};

export function evaluatevoiceEmotion(voiceEmotion) {
  const score = Math.round(normalizeClarity(voiceEmotion));
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
    value: voiceEmotion,
    score,
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
  if (strengthScore === "skipped") {
    return {
      value: "skipped",
      score: -1,
      label: "skipped",
    };
  }
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
    value: strengthScore,
    score,
    label,
  };
}

export function evaluateEmotionalState(emotion) {
//default to
  let score = 50;
  let label = "neutral";
  let description = "You seem emotionally neutral";

  if (typeof emotion === "number") {
    const lookup = {
      100: ["joyful", "You radiate happiness and warmth."],
      50: ["neutral", "You seem emotionally neutral"],
      60: ["balanced", "You seem emotionally balanced."],
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
      balanced: [60, "balanced", "You seem emotionally stable and calm."],
      sadness: [40, "downcast", "You seem to carry sadness or fatigue."],
      neutral: [50, "neutral", "You seem emotionally neutral"],
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

// Accept stdDev (variation) as main argument
export function evaluateMotion( motionStdDev ) {
  if (motionStdDev === "skipped") {
    return {
      value: "skipped",
      score: -1,
      label: "skipped",
    };
  }
 // console.log('motion:', motionStdDev)
  let score = 100;
  let label = "grounded & still";

  if (motionStdDev > 0.06 && motionStdDev <= 0.1) {
    score = 80;
    label = "subtle flow";
  } else if (motionStdDev > 0.1 && motionStdDev <= 0.15) {
    score = 60;
    label = "restless energy";
  } else if (motionStdDev > 0.15) {
    score = 40;
    label = "active movement";
  }

  return {
    value: motionStdDev,
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

export const evaluateEnvironmentScore = (environmentScore) => {
  if (environmentScore === "skipped") {
    return {
      value: "skipped",
      score: -1,
      label: "skipped",
    };
  }
  let label = "Poor location";
  if (environmentScore >= 80) label = "Excellent location";
  else if (environmentScore >= 60) label = "Good location";
  else if (environmentScore >= 40) label = "Fair location";

  return {
    value: environmentScore,
    score: environmentScore,
    label,
  };
}

import { hawkinsLevels } from "@data";

export const evaluateHawkins = (hawkinsScore) => {
  let hawkinsLabel = "";

  // Find the matching level
  let matchedLevel = hawkinsLevels[0];
  for (let i = 0; i < hawkinsLevels.length; i++) {
    if (hawkinsScore >= hawkinsLevels[i].level) {
      matchedLevel = hawkinsLevels[i];
    } else {
      break; // levels are in ascending order, so break early
    }
  }

  if (matchedLevel) {
    hawkinsLabel = `${matchedLevel.state} - ${matchedLevel.emotion}`;
  }

  return {
    value: hawkinsScore,
    score: hawkinsScore,
    label: hawkinsLabel,
  };
};
