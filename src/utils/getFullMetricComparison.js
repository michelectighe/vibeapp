import { metricComparisonDescriptions } from "@/data";

const getScoreDescription = (score, metricKey) => {
  const metric = metricComparisonDescriptions[metricKey];
  if (!metric || !metric.scoreMeanings) return null;

  const meaning = metric.scoreMeanings.find(({ min, max }) => score >= min && score <= max);
  return meaning?.description || null;
};

const getAlignmentLevel = (recipientScore, senderScore) => {
  const diff = Math.abs(recipientScore - senderScore);

  if (diff <= 5) return "aligned";
  if (diff <= 15) return "slightlyDifferent";
  if (diff <= 30) return "moderatelyDifferent";
  return "completelyUnaligned";
};

export const getFullMetricComparison = (recipientScore, senderScore, metricKey) => {
  const metric = metricComparisonDescriptions[metricKey];
  if (!metric) return null;

  const recipientDescription = getScoreDescription(recipientScore, metricKey);
  const senderDescription = getScoreDescription(senderScore, metricKey);

  const alignment = getAlignmentLevel(recipientScore, senderScore);
  const comparisonText = metric.descriptions[alignment] || "No comparison available.";

  return {
    label: metric.label,
    alignmentLevel: alignment,
    comparisonText,
    recipientScore,
    senderScore,
    recipientDescription,
    senderDescription,
  };
};
