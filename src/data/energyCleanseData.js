// data/energyCleanseData.js
export const getEnergyCleanseContent = (score) => {
  if (score >= 80) {
    return {
      meditations: [
        { id: "m1", title: "Radiance & Light", file: "radiance.mp3" },
        { id: "m2", title: "Divine Flow", file: "divine.mp3" },
      ],
      frequencies: [
        { id: "f1", title: "963 Hz – Pineal Activation", file: "963hz.mp3" },
        { id: "f2", title: "852 Hz – Intuition Boost", file: "852hz.mp3" },
      ],
    };
  } else if (score >= 60) {
    return {
      meditations: [
        { id: "m3", title: "Balance & Clarity", file: "balance.mp3" },
        { id: "m4", title: "Grounding Presence", file: "grounding.mp3" },
      ],
      frequencies: [
        { id: "f3", title: "528 Hz – Love & Healing", file: "528hz.mp3" },
        { id: "f4", title: "396 Hz – Release Fear", file: "396hz.mp3" },
      ],
    };
  } else {
    return {
      meditations: [
        { id: "m5", title: "Calm in the Storm", file: "calmstorm.mp3" },
        { id: "m6", title: "Safe & Supported", file: "safe.mp3" },
      ],
      frequencies: [
        { id: "f5", title: "174 Hz – Pain Relief", file: "174hz.mp3" },
        { id: "f6", title: "285 Hz – Healing Tissue", file: "285hz.mp3" },
      ],
    };
  }
};
