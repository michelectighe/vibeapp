export const normalizeMetricForStorage = (raw, score = null) => {
  if (raw == null) return null;

  const result = {
    score: score ?? (typeof raw === "object" && "score" in raw ? raw.score : raw),
  };

  if (typeof raw === "object") {
    ["value", "bpm", "sdnn", "rmssd", "raw"].forEach((key) => {
      if (raw[key] != null) result[key] = raw[key];
    });
  } else {
    result.value = raw;
  }

  return result;
};
