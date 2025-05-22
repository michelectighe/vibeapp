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
  //  //console.log("eval voice frequency:", score);
  return {
    value: `${rounded}`,
    score: Math.round(score),
    label,
  };
}

const normalizeClarity = (clarityScore) => {
  const rounded = Math.round(clarityScore);
  const min = 5;
  const max = 80;
  const clamped = Math.max(min, Math.min(clarityScore, max));
  const score = 100 - ((clamped - min) / (max - min)) * 100;
  return Math.round(score);
};
export function evaluateVoiceClarity(clarityScore) {
  //console.log('NORM CLARITY:', clarityScore)
 const rounded = Math.round(clarityScore);
  const norm = normalizeClarity(clarityScore);
  let score = Math.round(norm);
  let label = "";
  ////console.log("eval voice clarity:", clarityScore);
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
    value: Math.round(score),
    score: Math.round(score),
    raw: `${rounded}`,
    label,
  };
}


const normalizeLoudness = (loudnessDb) => {
  const minDb = -45; // below this = 0 strength
  const maxDb = -8;  // above this = full strength (100)

  const clampedDb = Math.max(minDb, Math.min(loudnessDb, maxDb));

  const score = ((clampedDb - minDb) / (maxDb - minDb)) * 100;

  return Math.round(score); // gives you 0–100
};

export function evaluateVoiceStrength(strengthScore) {
 const score = normalizeLoudness(strengthScore);
 const rounded = Math.round(strengthScore);
  let label = "";
  ////console.log("eval voice strength:", strengthScore);
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
    value: `${rounded}`,
    score: Math.round(score),
    label,
  };
}

export function evaluateEmotionalState(emotion) {
  let score = 50;
  let label = "";
  let description = "";
  ////console.log("eval emotion:", emotion);
   if(typeof emotion === "number") {
  switch (emotion) {
    case 100:
      score = 100;
      label = "joyful";
      description = "You radiate happiness and warmth.";
      break;
    case 70:
      score = 70;
      label = "balanced";
      description = "You seem emotionally stable and calm.";
      break;
    case 40:
      score = 40;
      label = "downcast";
      description = "Your seem to be feeling sadness or fatigue.";
      break;
    case 30:
      score = 30;
      label = "agitated";
      description = "Your seem frustrated or tense.";
      break;
    case 80:
      score = 80;
      label = "alert";
      description = "There’s a sense of excitement or curiosity.";
      break;
    case 35:
      score = 35;
      label = "anxious";
      description = "Your seem nervous or worried.";
      break;
    default:
      score = 60;
      label = "undefined";
      description = "Emotion is unclear or mixed.";
  }
   } else { 
  switch (emotion) {
    case "happiness":
      score = 100;
      label = "joyful";
      description = "Your radiate happiness and warmth.";
      break;
    case "neutral":
      score = 70;
      label = "balanced";
      description = "You seem emotionally stable and calm.";
      break;
    case "sadness":
      score = 40;
      label = "downcast";
      description = "Your seem to carry sadness or fatigue.";
      break;
    case "anger":
      score = 30;
      label = "agitated";
      description = "Your seem frustrated or tense.";
      break;
    case "surprise":
      score = 80;
      label = "alert";
      description = "There’s a sense of excitement or curiosity.";
      break;
    case "fear":
    case "disgust":
    case "contempt":
      score = 35;
      label = "anxious";
      description = "Your seem nervous or worried.";
      break;
    default:
      score = 60;
      label = "undefined";
      description = "Emotion is unclear or mixed.";
  }
   }
  return {
    value: score,
    score: score,
    label,
    description,
  };
}

export function evaluateMotion({ avgMagnitude }) {
  let motionScore = 0;
  let motionLabel = "";
  if (avgMagnitude <= 1.0) {
    motionScore = 100;
    motionLabel = "grounded & still";
  } else if (avgMagnitude <= 1.5) {
    motionScore = 80;
    motionLabel = "subtle flow";
  } else if (avgMagnitude <= 2.0) {
    motionScore = 60;
    motionLabel = "restless energy";
  } else if (avgMagnitude <= 2.5) {
    motionScore = 40;
    motionLabel = "ctive movement";
  } else {
    motionScore = 20;
    motionLabel = "unsettled waves";
  }

  return {
    value: { avgMagnitude },
    score: motionScore,
    label: motionLabel,
  };
}
export function evaluateEnvironment({ soundLevelDb, magnetometerValue, percentGood }) {
  let soundScore = 100 - soundLevelDb;
  let soundLabel = "unknown";
  if (percentGood >= 80) {
    soundLabel = "Whispering stillness";
  } else if (percentGood >= 55) {
    soundLabel = "Soft hum of life";
  } else if (percentGood >= 50) {
    soundLabel = "Lively & Energetic surroundings";
  } else if (percentGood >= 40) {
    soundLabel = "Disturbing surroundings";
  } else {
    soundLabel = "Chaotic vibration";
  }

  // MAGNETOMETER SCORE
  let magnetometerScore = 0;
  let magnetometerLabel = "Interference";

  if (magnetometerValue === 0 || isNaN(magnetometerValue)) {
    magnetometerScore = 10;
    magnetometerLabel = ""; // invalid
  } else if (magnetometerValue >= 25 && magnetometerValue <= 65) {
    magnetometerScore = 100;
    magnetometerLabel = "Natural resonance";
  } else if (magnetometerValue > 65 && magnetometerValue < 100) {
    magnetometerScore = 50;
    magnetometerLabel = "Urban pulse";
  } else if (magnetometerValue >= 100) {
    magnetometerScore = 20;
    magnetometerLabel = "Electric tension";
  } else {
    magnetometerScore = 30;
    magnetometerLabel = ""; // uncertain
  }

  const overallScore = (Number(percentGood) + Number(magnetometerScore)) / 2;
  const rounded = Math.round(overallScore);
  let overallLabel = "Poor location";
  if (overallScore >= 80) overallLabel = "Excellent location";
  else if (overallScore >= 60) overallLabel = "Good location";
  else if (overallScore >= 40) overallLabel = "Fair location";
  else overallLabel = "Poor location";

  return {
    sound: {
      value: soundScore,
      score: Math.round(soundScore),
      label: soundLabel,
    },
    magnetometer: {
      value: magnetometerScore,
      score: Math.round(magnetometerScore),
      label: magnetometerLabel,
    },
    overall: {
      value: overallScore,
      label: overallLabel,
    },
  };
}
