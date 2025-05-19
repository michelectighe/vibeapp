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
  switch (emotion) {
    case "happiness":
      score = 90;
      label = "joyful";
      description = "Your voice radiates happiness and warmth.";
      break;
    case "neutral":
      score = 70;
      label = "balanced";
      description = "You sound emotionally stable and calm.";
      break;
    case "sadness":
      score = 40;
      label = "downcast";
      description = "Your voice carries sadness or fatigue.";
      break;
    case "anger":
      score = 30;
      label = "agitated";
      description = "Your voice reflects frustration or tension.";
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
      description = "Your voice hints at nervousness or worry.";
      break;
    default:
      score = 60;
      label = "undefined";
      description = "Emotion is unclear or mixed.";
  }

  return {
    value: score,
    score: score,
    label,
    description,
  };
}
