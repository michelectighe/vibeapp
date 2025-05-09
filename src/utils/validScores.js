import { metricRanges } from "@constants";

export const isValidScore = (metricName, score) => {
  const range = metricRanges[metricName];
  if (!range || typeof score !== "number" || isNaN(score)) return false;
  return score >= range.min && score <= range.max;
};

export const formatScoreForDisplay = (score, fallback = "N/A") => {
  if (typeof score !== "number" || isNaN(score) || score < 0) {
    return fallback;
  }
  return Math.round(score); // or score.toFixed(1) if you want decimals
};
