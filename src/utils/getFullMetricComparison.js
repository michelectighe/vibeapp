import { metricComparisonDescriptions } from "@/data";

const getScoreDescription = (score, metricKey) => {
  const metric = metricComparisonDescriptions[metricKey];
  if (!metric || !metric.scoreMeanings) return null;

  const meaning = metric.scoreMeanings.find(({ min, max }) => score >= min && score <= max);
  return meaning?.description || null;
};

const getAlignmentLevel = (myScore, theirScore) => {
  const diff = Math.abs(myScore - theirScore);

  if (diff <= 5) return "aligned";
  if (diff <= 15) return "slightlyDifferent";
  if (diff <= 30) return "moderatelyDifferent";
  return "completelyUnaligned";
};

export const getFullMetricComparison = (myScore, theirScore, metricKey) => {
  const metric = metricComparisonDescriptions[metricKey];
  if (!metric) return null;

  const myDescription = getScoreDescription(myScore, metricKey);
  const theirDescription = getScoreDescription(theirScore, metricKey);

  const alignment = getAlignmentLevel(myScore, theirScore);
  const comparisonText = metric.descriptions[alignment] || "No comparison available.";

  return {
    label: metric.label,
    alignmentLevel: alignment,
    comparisonText,
    myScore,
    theirScore,
    myDescription,
    theirDescription,
  };
};
