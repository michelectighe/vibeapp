// utils/parseMetric.js
export const parseMetric = (val) => {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return null;
    }
  }
  return val;
};

// utils/normalizeInverted.js
export const normalizeInverted = (value, min, max) => {
  const clamped = Math.min(Math.max(value, min), max);
  return 100 - ((clamped - min) / (max - min)) * 100;
};

// utils/calculateChakraScores.js
export const calculateChakraScores = ({
  motionScore,
  emotionScore,
  hrvScore,
  voiceStrengthScore,
  heartRateScore,
  environmentScore,
  voiceClarityScore,
  voiceFrequencyScore,
  overallVibrationScore,
}) => {
  const safeAvg = (a, b) => {
    const values = [a, b].filter((v) => typeof v === "number" && !isNaN(v));
    return values.length > 0
      ? Math.round(values.reduce((sum, v) => sum + v, 0) / values.length)
      : 0;
  };

  return {
    root: typeof motionScore === "number" ? Math.round(motionScore) : 0,
    sacral: typeof emotionScore === "number" ? Math.round(emotionScore) : 0,
    solarPlexus: safeAvg(hrvScore, voiceStrengthScore),
    heart: safeAvg(heartRateScore, environmentScore),
    throat: typeof voiceClarityScore === "number" ? Math.round(voiceClarityScore) : 0,
    thirdEye: typeof voiceFrequencyScore === "number" ? Math.round(voiceFrequencyScore) : 0,
    crown: typeof overallVibrationScore === "number" ? Math.round(overallVibrationScore) : 0,
  };
};

// utils/calculateOverallVibe.js
export const calculateOverallVibe = (scores) => {
  const totalWeight = scores.reduce(
    (sum, { score, weight }) => sum + (score != null ? weight : 0),
    0
  );

  const weightedSum = scores.reduce(
    (sum, { score, weight }) => sum + (score != null ? score * weight : 0),
    0
  );

  const averageScore = totalWeight > 0 ? weightedSum / totalWeight : 0;
  const clamped = Math.max(0, Math.min(averageScore, 100)); // just in case

  // Scale from ~56–82 to 200–1000 (Hawkins range)
  const hawkinsInput = Math.min(clamped, 82); // optional soft cap
  const hawkins = 200 + ((Math.max(56, hawkinsInput) - 56) / 26) * 800;

  return {
    overallScore: Math.round(clamped),
    hawkinsScore: Math.round(hawkins),
  };
};

