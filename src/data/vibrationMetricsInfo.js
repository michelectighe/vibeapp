export const vibrationMetricsInfo = {
  voiceFrequencyScore: {
    label: "Voice Frequency",
    range: [20, 100],
    explanation: "A balanced vocal pitch suggests emotional harmony. Ideal range is 85–255 Hz.",
    unit: "Hz",
  },
  voiceClarityScore: {
    label: "Voice Clarity",
    range: [20, 100],
    explanation:
      "Measures the consistency of your vocal pitch. Higher scores reflect a more focused and steady voice, while lower scores may indicate scattered or emotional speech.",
    unit: "%", // or use "pts" or "score" if you want a fake unit
  },
  voiceStrengthScore: {
    label: "Voice Strength",
    range: [20, 100],
    explanation: "Represents the loudness of your voice, measured in decibels (dB). Higher values indicate a stronger vocal presence. A typical speaking voice ranges from -20 dB to -10 dB, while -5 dB or higher reflects a powerful tone.",
    unit: "dB",
  },
  rawBPM: {
    label: "Heart Rate",
    range: [60, 100],
    explanation: "Ideal resting heart rate for adults is 60–100 bpm. Deviations may reflect stress or fatigue.",
    unit: "bpm",
  },
  rawHRV: {
    label: "Heart Rate Variability",
    range: [20, 80],
    explanation:
      "HRV reflects your nervous system's balance and adaptability. A higher HRV usually indicates strong stress resilience and recovery capacity. However, excessively high HRV may reflect abnormal rhythms or overtraining. Values between 60–100 ms are considered optimal for most healthy adults.",
    unit: "ms",
  },
  
  motionScore: {
    label: "Motion / Stillness",
    range: [20, 100],
    explanation: "Measures physical activity or restlessness. Higher scores are more calm/meditative.",
    unit: "%",
  },
  environmentScore: {
    label: "Environmental Vibe",
    range: [30, 100],
    explanation: "Score based on ambient noise, magnetics, and vibe. Higher = more peaceful.",
    unit: "%",
  },
  emotionScore: {
    label: "Emotional State",
    range: [40, 100],
    explanation: "Determined from facial expression. Higher = more elevated emotional state.",
    unit: "%",
  },
  overallVibrationScore: {
    label: "Overall Vibration",
    range: [40, 100],
    explanation: "Aggregate vibration score across all metrics. Higher = more elevated frequency.",
    unit: "%",
  },
};
