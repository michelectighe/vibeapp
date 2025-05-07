export const calculateVariance = (data) => {
  if (data.length === 0) return 0;
  const mean = data.reduce((sum, d) => sum + d.intensity, 0) / data.length;
  return data.reduce((sum, d) => sum + Math.pow(d.intensity - mean, 2), 0) / data.length;
};

export const removeOutliers = (data, factor = 2) => {
  if (data.length < 3) return data;
  const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
  const std = Math.sqrt(data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length);
  return data.filter((val) => Math.abs(val - mean) <= factor * std);
};

export const smoothData = (data, windowSize = 5) => {
  if (data.length < windowSize) return data;
  const smoothed = [];
  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    let count = 0;
    const start = Math.max(0, i - Math.floor(windowSize / 2));
    const end = Math.min(data.length, i + Math.ceil(windowSize / 2));
    for (let j = start; j < end; j++) {
      sum += data[j].intensity;
      count++;
    }
    smoothed.push({ intensity: sum / count, timestamp: data[i].timestamp });
  }
  return smoothed;
};

export const detectHeartbeats = (redData) => {
  const heartbeats = [];
  // Set threshold to 60% of the maximum intensity in the window.
  const maxIntensity = Math.max(...redData.map((d) => d.intensity));
  const threshold = maxIntensity * 0.6;
  for (let i = 1; i < redData.length - 1; i++) {
    const prev = redData[i - 1].intensity;
    const current = redData[i].intensity;
    const next = redData[i + 1].intensity;
    if (current > prev && current > next && current > threshold) {
      heartbeats.push(redData[i].timestamp);
    }
  }
  return heartbeats;
};

export const formatTimestampWithMs = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = new Date(timestamp);
  return `${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })}.${date.getMilliseconds().toString().padStart(3, "0")}`;
};

export const calculateHRVAndBPM = (heartbeats) => {
  if (heartbeats.length < 2) return { bpm: null, sdnn: null, rmssd: null };
  const rrIntervals = [];
  for (let i = 1; i < heartbeats.length; i++) {
    rrIntervals.push(heartbeats[i] - heartbeats[i - 1]);
  }
  const avgRR = rrIntervals.reduce((acc, val) => acc + val, 0) / rrIntervals.length;
  const bpm = Math.round(60000 / avgRR);

  const meanRR = avgRR;
  const sdnn =
    Math.sqrt(
      rrIntervals.reduce((sum, rr) => sum + Math.pow(rr - meanRR, 2), 0) / (rrIntervals.length - 1),
    ) || 0;

  const successiveDiffs = [];
  for (let i = 1; i < rrIntervals.length; i++) {
    successiveDiffs.push(rrIntervals[i] - rrIntervals[i - 1]);
  }
  const rmssd =
    Math.sqrt(
      successiveDiffs.reduce((sum, diff) => sum + diff * diff, 0) / (successiveDiffs.length || 1),
    ) || 0;
  return { bpm, sdnn, rmssd };
};
