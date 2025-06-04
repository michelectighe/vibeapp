// utils/compareResults.js
export const compareResults = (myResult, senderResult) => {
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
    const recipientVal = myResult[key];
    const senderVal = senderResult[key];
    if (recipientVal != null && senderVal != null) {
      const diff = Math.abs(recipientVal - senderVal);
      const threshold = 10;
      if (diff < threshold) {
        similarities.push({ key, recipientVal, senderVal });
      } else {
        differences.push({ key, recipientVal, senderVal });
      }
    }
  });

  return { similarities, differences };
};
