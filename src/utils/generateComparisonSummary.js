import { getFullMetricComparison } from "./getFullMetricComparison";
export const generateComparisonSummary = (myResult, sharedResult) => {
  const fieldsToCompare = [
    "hawkinsScore",
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

      if (typeof metric === "number") return metric; // Handle raw numbers like hawkinsScore

      if (typeof metric?.score === "number") return metric.score;

      return null;
    } catch {
      return null;
    }
  };

const comparisons = [];

fieldsToCompare.forEach((key) => {
  const myScore = extractScoreFromMetric(myResult[key]);
  const theirScore = extractScoreFromMetric(sharedResult[key]);
  if (myScore == null || theirScore == null) return;

  const comparisonResult = getFullMetricComparison(myScore, theirScore, key);

  comparisons.push({
    key,
    ...comparisonResult,
    myScore,
    theirScore,
  });
});

const countByAlignment = {
  aligned: 0,
  slightlyDifferent: 0,
  moderatelyDifferent: 0,
  completelyUnaligned: 0,
};

comparisons.forEach((item) => {
  countByAlignment[item.alignmentLevel]++;
});

// Optional: assign weights if you want to compute a “closeness score”
const weightedScore =
  countByAlignment.aligned * 3 +
  countByAlignment.slightlyDifferent * 2 +
  countByAlignment.moderatelyDifferent * 1;

let overallSummary = "";

if (countByAlignment.aligned >= comparisons.length * 0.7) {
  overallSummary = "You and your match are deeply aligned across most areas.";
} else if (countByAlignment.completelyUnaligned >= 2) {
  overallSummary = "There are major vibrational differences between you.";
} else if (countByAlignment.moderatelyDifferent > countByAlignment.aligned) {
  overallSummary = "You share some common ground, but also several contrasts.";
} else {
  overallSummary = "You’re somewhat aligned, with subtle energetic differences.";
}



return {
  overallSummary,
  comparisons,
};

};
