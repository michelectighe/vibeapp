import { metricComparisonDescriptions } from "@/data";
export const generateComparisonSummary = (myResult, sharedResult) => {
  const fieldsToCompare = [
    "emotionScore",
    "heartRateScore",
   // "hrvScore", // note: you might want to remove these if unused
    "motionScore",
    "voiceFrequencyScore",
    "voiceClarityScore",
    "voiceStrengthScore",
    "environmentScore",
  ];


  const comparisons = [];

  const extractScore = (val) => {
    if (val == null) return null;
    if (typeof val === "number") return val;
    if (typeof val === "object" && "score" in val) return parseFloat(val.score);
    return null;
  };

  fieldsToCompare.forEach((key) => {
    const myVal = extractScore(myResult[key]);
    const theirVal = extractScore(sharedResult[key]);

    if (myVal != null && theirVal != null) {
      const diff = Math.abs(myVal - theirVal);
      let category = "";
      let type = "";

      if (diff < 5) {
        category = "aligned";
        type = "similarity";
      } else if (diff < 15) {
        category = "slightlyDifferent";
        type = "difference";
      } else if (diff < 30) {
        category = "moderatelyDifferent";
        type = "difference";
      } else {
        category = "completelyUnaligned";
        type = "difference";
      }
      //  console.log('key:', key)
      const label = metricComparisonDescriptions[key]?.label || key;
      //console.log('label:', label);
      const description = metricComparisonDescriptions[key]?.descriptions[category] || "";
      comparisons.push({
        key,
        myVal,
        theirVal,
        difference: diff,
        type,
        category,
        label,
        description,
      });
    }
  });

  const vibeDelta = Math.abs(myResult.overallVibrationScore - sharedResult.overallVibrationScore);
  let summary = "";
  if (vibeDelta < 10) {
    summary = "are almost energetically identical — a powerful resonance!";
  } else if (vibeDelta < 20) {
    summary = "are deeply attuned with only subtle shifts between you.";
  } else if (vibeDelta < 40) {
    summary = "show a balanced contrast — complementary in many ways.";
  } else if (vibeDelta < 60) {
    summary = "reveal a vibrational gap, but growth happens in contrast.";
  } else {
    summary = "are on very different frequencies — a lesson in polarity.";
  }

  return {
    comparisons,
    overallSummary: summary,
  };
};
