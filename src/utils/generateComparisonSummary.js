//import { metricComparisonDescriptions } from "@/data";
import { getFullMetricComparison } from "./getFullMetricComparison";

export const generateComparisonSummary = (myResult, sharedResult) => {
  console.log("MY RESULT:", myResult);
  console.log("SHARED RESULT:", sharedResult);

  const fieldsToCompare = [
    "emotionScore",
    "heartRateScore",
    "motionScore",
    "voiceFrequencyScore",
    "voiceClarityScore",
    "voiceStrengthScore",
    "environmentScore",
    "hawkinsScore",
  ];

  const comparisons = [];

  const extractValue = (val) => {
    if (val == null) return null;
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      const value = JSON.parse(val);
      return value.value;
    }
    if (typeof val === "object" && "value" in val) return parseFloat(val.value);
    return null;
  };

  const extractScore = (val) => {
    console.log("showtype:", typeof val, val);
    
    if (val == null) return null;
    if (typeof val === "number") return val;
    if (typeof val === "object" && "score" in val) return parseFloat(val.score);
    if (typeof val === "object" && "bpm" in val) return parseFloat(val.bpm);
    if (typeof val === "string") {
      const value = JSON.parse(val);
      console.log('VALUE IS NOW:', value)
      if ("score" in value) {
        return parseFloat(value.score);
      } else if ("value" in value) {
        return parseFloat(value.value);
      } else if ("bpm" in value) {
        return parseFloat(value.bpm);
      } else return parseFloat(value);
    } else {
      return null;
    }
 //   return null;
  };

  fieldsToCompare.forEach((key) => {
    const myScore = extractScore(myResult[key]);
    const theirScore = extractScore(sharedResult[key]);
    const theirVal = extractValue(sharedResult[key]);
    const myVal = extractValue(myResult[key]);
    console.log("WHAT ARE WE LOOKING AT:", key, myScore, theirScore);
    const comparisonResult = getFullMetricComparison(myScore, theirScore, key);
    console.log("Comparison Result:", comparisonResult);
  });
};
// //console.log('you val:', myVal)
// if (myScore != null && theirScore != null) {
//   const diff = Math.abs(myScore - theirScore);
//   let category = "";
//   let type = "";

//   if (diff < 5) {
//     category = "aligned";
//     type = "similarity";
//   } else if (diff < 15) {
//     category = "slightlyDifferent";
//     type = "difference";
//   } else if (diff < 30) {
//     category = "moderatelyDifferent";
//     type = "difference";
//   } else {
//     category = "completelyUnaligned";
//     type = "difference";
//   }
//   //  console.log('key:', key)
//   const label = metricComparisonDescriptions[key]?.label || key;
//   //console.log('label:', label);
//   const description = metricComparisonDescriptions[key]?.descriptions[category] || "";

// {
//     label: metric.label,
//     alignmentLevel: alignment,
//     comparisonText,
//     myScore,
//     theirScore,
//     myDescription,
//     theirDescription,
//   };

// comparisons.push({
//   key,
//   myVal,
//   theirVal,
//   difference: diff,
//   type,
//   category,
//   label,
//   description,
// });

// const vibeDelta = Math.abs(myResult.overallVibrationScore - sharedResult.overallVibrationScore);
// let summary = "";
// if (vibeDelta < 10) {
//   summary = "are almost energetically identical — a powerful resonance!";
// } else if (vibeDelta < 20) {
//   summary = "are deeply attuned in most areas - a natural pair.";
// } else if (vibeDelta < 40) {
//   summary = "show a balanced contrast — complementary in many ways.";
// } else if (vibeDelta < 60) {
//   summary = "reveal a vibrational gap, but growth happens in contrast.";
// } else {
//   summary = "are on very different frequencies — a lesson in polarity.";
// }

// return {
//   comparisons,
//   overallSummary: summary,
// };
//};
