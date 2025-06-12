export const normalizeMetricForStorage = (raw, score = null) => {
  if (raw == null) return null;
console.log("normalize raw:", raw);
const result = {
  score: score ?? (typeof raw === "object" && "score" in raw ? raw.score : raw),
};

if (typeof raw === "object") {
  ["value", "bpm", "sdnn", "rmssd", "raw"].forEach((key) => {
    if (raw[key] != null) result[key] = raw[key] || 0;
  });
} else {
  result.value = raw || 0;
}
console.log("normalize return:", result);
  return result || 0;
};
