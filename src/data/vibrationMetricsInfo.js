export const vibrationMetricsInfo = {
  voiceFrequencyScore: {
    label: "Voice Frequency",
    range: [85, 255],
    explanation: "A balanced vocal pitch suggests emotional harmony. Ideal range is 85–255 Hz.",
    unit: "Hz",
  },
  voiceEmotionScore: {
    label: "Vocal Emotion",
    range: [20, 100],
    explanation:
      "Measures emotional tone of your voice. Lower scores may be a reflection of anger or sadness, while higher scores indicate happiness.",
    unit: "",
  },
  voiceStrengthScore: {
    label: "Voice Strength",
    range: [-20, -5],
    explanation:
      "Represents the loudness of your voice, measured in decibels (dB). Higher values indicate a stronger vocal presence. A typical speaking voice ranges from -20 dB to -10 dB, while -5 dB or higher reflects a powerful tone.",
    unit: "dB",
  },
  bpmScore: {
    label: "Heart Rate",
    range: [60, 100],
    explanation:
      "Ideal resting heart rate for adults is 60–100 bpm. Deviations may reflect stress or fatigue.",
    unit: "bpm",
  },
  hrvScore: {
    label: "Heart Rate Variability",
    range: [20, 80],
    explanation:
      "HRV reflects your nervous system's balance and adaptability. A higher HRV usually indicates strong stress resilience and recovery capacity. However, excessively high HRV may reflect abnormal rhythms or overtraining. Values between 60–100 ms are considered optimal for most healthy adults.",
    unit: "ms",
  },

  motionScore: {
    label: "Motion / Stillness",
    range: [-1, 0.25],
    explanation:
      "Measures physical activity or restlessness(between 0 and 2.5 motion variation). Lower scores are more calm/meditative.",
    unit: "m/s²",
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
  hawkinsScore: {
    label: "Consciousness - Hawkins scale",
    range: [0, 1000],
    explanation:
      "A vibrational frequency scale from 0 to 1000 that maps different emotional and spiritual states. Higher scores represent elevated levels of awareness, peace, and energy — while lower scores reflect limiting states like fear or shame. A score above 200 indicates a positive, empowering state of being.",
    unit: "",
  },
};
