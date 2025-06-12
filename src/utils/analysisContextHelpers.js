// utils/parseMetric.js
export const parseMetric = (val) => {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      console.log("ParseReturn:", null);
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
  //  voiceEmotionScore,
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
    throat: typeof voiceStrengthScore === "number" ? Math.round(voiceStrengthScore) : 0,
    thirdEye: typeof voiceFrequencyScore === "number" ? Math.round(voiceFrequencyScore) : 0,
    crown: typeof overallVibrationScore === "number" ? Math.round(overallVibrationScore) : 0,
  };
};

// utils/calculateOverallVibe.js
export const calculateOverallVibe = (scores) => {
  console.log("scores in calc:", scores);
  const totalWeight = scores.reduce(
    (sum, { score, weight }) => sum + (score != -1 ? weight : weight/2),
    0,
  );
  console.log("totalWeight:", totalWeight);
  const weightedSum = scores.reduce(
    (sum, { score, weight }) => sum + (score != -1 ? score * weight : weight/2),
    0,
  );
  console.log("weightedsum", weightedSum);
  const averageScore = totalWeight > 0 ? weightedSum / totalWeight : 0;
  const clamped = Math.max(0, Math.min(averageScore, 100)); // just in case

  // Scale from ~56–82 to 200–1000 (Hawkins range)
  const hawkinsInput = Math.min(clamped, 82); // optional soft cap
  const hawkins = 200 + ((Math.max(56, hawkinsInput) - 56) / 26) * 800;

  return {
    overallScore: Math.round(clamped),
    hawkins: Math.round(hawkins),
  };
};

