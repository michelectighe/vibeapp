export function evaluateVoiceFrequency(frequencyHz) {
  let score = 0;
  let label = "";
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
  console.log("eval voice frequency:", score);
  return {
    value: frequencyHz,
    score,
    label,
  };
}

export function evaluateVoiceClarity(clarityScore) {
  let score = Math.round(clarityScore);
  let label = "";
  //console.log("eval voice clarity:", clarityScore);
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
    value: clarityScore,
    score,
    label,
  };
}

export function evaluateVoiceStrength(strengthScore) {
  let score = Math.round(strengthScore);
  let label = "";
  //console.log("eval voice strength:", strengthScore);
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
  let score = 50;
  let label = "";
  let description = "";
  //console.log("eval emotion:", emotion);
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
    value: emotion,
    score,
    label,
    description,
  };
}
