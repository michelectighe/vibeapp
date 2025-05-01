// utils/compareResults.js
export const compareResults = (myResult, sharedResult) => {
    const fieldsToCompare = [
      "emotionScore",
      "heartRateScore",
      "hrvScore",
      "motionScore",
      "voiceFrequencyScore",
      "voiceClarityScore",
      "voiceStrengthScore",
      "environmentScore",
    ];
  
    const similarities = [];
    const differences = [];
  
    fieldsToCompare.forEach((key) => {
      const myVal = myResult[key];
      const theirVal = sharedResult[key];
      if (myVal != null && theirVal != null) {
        const diff = Math.abs(myVal - theirVal);
        const threshold = 10;
        if (diff < threshold) {
          similarities.push({ key, myVal, theirVal });
        } else {
          differences.push({ key, myVal, theirVal });
        }
      }
    });
  
    return { similarities, differences };
  };
  