export function evaluateEnvironment({ soundLevelDb, magnetometerValue, percentGood }) {
  // SOUND SCORE
 // //console.log('percentGood:', percentGood)
  let soundScore = 100 - soundLevelDb;
  let soundLabel = "unknown";
  // ////console.log("eval this sound:", soundScore);
  // ////console.log("eval this mag:", magnetometerValue);

  // if (soundScore >= 80) {
  //   soundLabel = "Whispering stillness";
  // } else if (soundScore >= 55) {
  //   soundLabel = "Soft hum of life";
  // } else if (soundScore >= 45 && percentGood >= 50) {
  //   soundLabel = "Lively & Energetic surroundings";
  // } else if (soundScore >= 45 && percentGood <=49.99) {
  //   soundLabel = "Disturbingly energetic surroundings";
  // } else if (soundScore < 45 && percentGood >= 50 ) {
  //   soundLabel = "Loud but peaceful surroundings";
  // } else
  //   {
  //   soundLabel = "Chaotic vibration";
  // }
  if (percentGood >= 80) {
    soundLabel = "Whispering stillness";
  } else if (percentGood >= 55) {
    soundLabel = "Soft hum of life";
  } else if ( percentGood >= 50) {
    soundLabel = "Lively & Energetic surroundings";
  } else if (percentGood >= 40) {
    soundLabel = "Disturbing surroundings";
  } else
    {
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
 // //console.log("percentGood:", percentGood)
 // //console.log("magnetometerScore:", magnetometerScore)
////console.log('magnetometer', magnetometerScore)
  const overallScore = (Number(percentGood) + Number(magnetometerScore))/2;
  const rounded = Math.round(overallScore);
////console.log('overall', overallScore)
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
