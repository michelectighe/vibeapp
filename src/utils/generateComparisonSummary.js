import { getFullMetricComparison } from "./getFullMetricComparison";
export const generateComparisonSummary = (myResult, sharedResult) => {
  const fieldsToCompare = [
    "emotionScore",
    "heartRateScore",
    "motionScore",
    "voiceFrequencyScore",
    "voiceClarityScore",
    "voiceStrengthScore",
    "environmentScore",
  ];

  const extractScoreFromMetric = (metric) => {
    try {
      if (typeof metric === "string") metric = JSON.parse(metric);
      return typeof metric?.score === "number" ? metric.score : null;
    } catch {
      return null;
    }
  };
const comparisons = [];

fieldsToCompare.forEach((key) => {
  console.log('key:', key)
  const myScore = extractScoreFromMetric(myResult[key]);
  const theirScore = extractScoreFromMetric(sharedResult[key]);
  console.log('myScore:', myScore)
  console.log('theirScore:', theirScore)
  if (myScore == null || theirScore == null) return;

  const comparisonResult = getFullMetricComparison(myScore, theirScore, key);

  comparisons.push({
    key,
    ...comparisonResult,
    myScore,
    theirScore,
  });
});

  return comparisons;
};
