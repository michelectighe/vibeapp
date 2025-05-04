export function evaluateEnvironment({ soundLevelDb, magnetometerValue }) {
  // SOUND SCORE
  let soundScore = 100 - soundLevelDb;
  let soundLabel = "unknown";
  // //console.log("eval this sound:", soundScore);
  // //console.log("eval this mag:", magnetometerValue);

  if (soundScore >= 80) {
    soundLabel = "Whispering stillness";
  } else if (soundScore >= 55) {
    soundLabel = "Soft hum of life";
  } else if (soundScore >= 45) {
    soundLabel = "Energetic surroundings";
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

  // OVERALL SCORE
  const overallScore = Math.round((soundScore + magnetometerScore) / 2);

  let overallLabel = "Poor location";
  if (overallScore >= 80) overallLabel = "Excellent location";
  else if (overallScore >= 60) overallLabel = "Good location";
  else if (overallScore >= 40) overallLabel = "Fair location";
  else overallLabel = "Poor location";

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
