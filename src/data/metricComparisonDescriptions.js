export const metricComparisonDescriptions = {
  emotionScore: {
    label: "Emotional State",
    descriptions: {
      aligned: "You're both feeling emotionally in sync — a strong emotional resonance.",
      slightlyDifferent: "There's a slight emotional shift between you.",
      moderatelyDifferent: "Your emotional energies differ noticeably.",
      completelyUnaligned: "You're feeling very different emotions right now.",
    },
    scoreMeanings: [
      { min: 0, max: 25, description: "emotionally turbulent" },
      { min: 26, max: 50, description: "some emotional unrest" },
      { min: 51, max: 75, description: "calm and steady" },
      { min: 76, max: 100, description: "centered and emotionally balanced" },
    ],
  },
  heartRateScore: {
    label: "Heart Rate",
    descriptions: {
      aligned: "Your heart rates are nearly identical — a strong physiological match.",
      slightlyDifferent: "Small differences in heart rate — not significant.",
      moderatelyDifferent: "Moderate heart rate gap — potentially different energy states.",
      completelyUnaligned:
        "Heart rates are very different — likely different physical or emotional states.",
    },
    scoreMeanings: [
      { min: 0, max: 55, description: "very relaxed or low energy" },
      { min: 56, max: 75, description: "balanced and healthy rhythm" },
      { min: 76, max: 100, description: "elevated or stressed state" },
    ],
  },
  motionScore: {
    label: "Motion / Stillness",
    descriptions: {
      aligned: "You're both equally still or equally active — very in sync.",
      slightlyDifferent: "A mild difference in movement levels.",
      moderatelyDifferent: "One of you is more active — different energy expressions.",
      completelyUnaligned:
        "Completely different motion profiles — high contrast in physical energy.",
    },
    scoreMeanings: [
      { min: 0, max: 30, description: "still and grounded" },
      { min: 31, max: 60, description: "mildly active" },
      { min: 61, max: 100, description: "highly energetic or restless" },
    ],
  },
  voiceFrequencyScore: {
    label: "Voice Frequency",
    descriptions: {
      aligned: "You both speak with a similar energetic tone — strong vibrational resonance.",
      slightlyDifferent: "A slight tonal variance between your voices.",
      moderatelyDifferent: "Distinct tonal differences in how you speak.",
      completelyUnaligned: "Your vocal energies are strikingly different.",
    },
    scoreMeanings: [
      { min: 0, max: 25, description: "low frequency — calm or withdrawn" },
      { min: 26, max: 50, description: "mid-low tone — introspective or neutral" },
      { min: 51, max: 75, description: "mid-high tone — expressive and present" },
      { min: 76, max: 100, description: "high frequency — vibrant and alert" },
    ],
  },
  voiceClarityScore: {
    label: "Voice Clarity",
    descriptions: {
      aligned: "Both voices are similarly clear or muffled.",
      slightlyDifferent: "A slight difference in voice clarity.",
      moderatelyDifferent: "Moderate gap in vocal articulation.",
      completelyUnaligned: "One voice is clear, the other quite muffled — a major contrast.",
    },
    scoreMeanings: [
      { min: 0, max: 25, description: "very muffled or unclear" },
      { min: 26, max: 50, description: "somewhat unclear" },
      { min: 51, max: 75, description: "fairly clear" },
      { min: 76, max: 100, description: "very articulate and clear" },
    ],
  },
  voiceStrengthScore: {
    label: "Voice Strength",
    descriptions: {
      aligned: "Your vocal power is nearly the same — aligned presence.",
      slightlyDifferent: "One voice is just a bit stronger than the other.",
      moderatelyDifferent: "Noticeable contrast in vocal energy.",
      completelyUnaligned: "One voice is dominant while the other is subdued.",
    },
    scoreMeanings: [
      { min: 0, max: 25, description: "very soft or withdrawn" },
      { min: 26, max: 50, description: "subtle but audible" },
      { min: 51, max: 75, description: "strong and confident" },
      { min: 76, max: 100, description: "powerful and commanding" },
    ],
  },
  environmentScore: {
    label: "Environmental Energy",
    descriptions: {
      aligned: "You're in similar energetic spaces — well-matched external environments.",
      slightlyDifferent: "Your environments are slightly different in vibrational quality.",
      moderatelyDifferent: "A notable difference in environmental energy.",
      completelyUnaligned: "You're in very different energetic environments.",
    },
    scoreMeanings: [
      { min: 0, max: 25, description: "chaotic or stressful surroundings" },
      { min: 26, max: 50, description: "slightly tense or unbalanced" },
      { min: 51, max: 75, description: "neutral or gently supportive" },
      { min: 76, max: 100, description: "peaceful and energetically uplifting" },
    ],
  },
};
