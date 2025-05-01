export function evaluateEnvironment({ soundLevelDb, magnetometerValue }) {
  // SOUND SCORE
  let soundScore = 100 - soundLevelDb;
  let soundLabel = "unknown";
  // //console.log("eval this sound:", soundScore);
  // //console.log("eval this mag:", magnetometerValue);

  if (soundScore >= 80) {
    soundLabel = "whispering stillness";
  } else if (soundScore >= 55) {
    soundLabel = "soft hum of life";
  } else if (soundScore >= 45) {
    soundLabel = "energetic surroundings";
  } else {
    soundLabel = "chaotic vibration";
  }

  // MAGNETOMETER SCORE
  let magnetometerScore = 0;
  let magnetometerLabel = "interference";

  if (magnetometerValue === 0 || isNaN(magnetometerValue)) {
    magnetometerScore = 10;
    magnetometerLabel = ""; // invalid
  } else if (magnetometerValue >= 25 && magnetometerValue <= 65) {
    magnetometerScore = 100;
    magnetometerLabel = "natural resonance";
  } else if (magnetometerValue > 65 && magnetometerValue < 100) {
    magnetometerScore = 50;
    magnetometerLabel = "urban pulse";
  } else if (magnetometerValue >= 100) {
    magnetometerScore = 20;
    magnetometerLabel = "electric tension";
  } else {
    magnetometerScore = 30;
    magnetometerLabel = ""; // uncertain
  }

  // OVERALL SCORE
  const overallScore = Math.round((soundScore + magnetometerScore) / 2);

  let overallLabel = "poor";
  if (overallScore >= 80) overallLabel = "excellent";
  else if (overallScore >= 60) overallLabel = "good";
  else if (overallScore >= 40) overallLabel = "fair";
  else overallLabel = "poor";

  return {
    sound: {
      value: soundLevelDb,
      score: soundScore,
      label: soundLabel,
    },
    magnetometer: {
      value: magnetometerValue,
      score: magnetometerScore,
      label: magnetometerLabel,
    },
    overall: {
      score: overallScore,
      label: overallLabel,
    },
  };
}
