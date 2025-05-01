// data/vibrationLevels.js
import { Platform } from "react-native";

export const vibrationLevels = [
  {
    label: "Divine Alignment",
    minScore: 91,
    color: "#5a35cd",
    description:
      "A state of profound spiritual connection and harmony with the universe. Intuition is fully awakened, bringing peace, clarity, and the ability to manifest effortlessly",
    image: require("@assets/images/buttonDivine.webp"),
    url: Platform.select({
      ios: "divine-alignment.mp3",
      android: "raw/divine-alignment", // no hyphens, must be lowercase and underscore
    }),
  },
  {
    label: "Transcendent Frequency",
    minScore: 81,
    color: "#004aad",
    description:
      "Elevated energy, profound clarity, and an expanded sense of self. Intuition and manifestation are strong, with a deep sense of peace and purpose",
    image: require("@assets/images/buttonTranscendent.webp"),
    url: Platform.select({
      ios: "divine-alignment.mp3",
      android: "raw/divine-alignment", // no hyphens, must be lowercase and underscore
    }),
  },
  {
    label: "Elevated Frequency",
    minScore: 71,
    color: "#46c9fe",
    description:
      "Consistent positivity and emotional balance. Personal energy remains strong, and challenges are managed with resilience, though occasional dips occur.",
    image: require("@assets/images/buttonElevated.webp"),
    url: Platform.select({
      ios: "divine-alignment.mp3",
      android: "raw/divine-alignment", // no hyphens, must be lowercase and underscore
    }),
  },
  {
    label: "Balanced State",
    minScore: 61,
    color: "#29b554",
    description:
      "Steady energy with manageable fluctuations. Emotional and mental states can shift, but there is a consistent effort toward growth and maintaining stability",
    image: require("@assets/images/buttonBalanced.webp"),
    url: Platform.select({
      ios: "divine-alignment.mp3",
      android: "raw/divine-alignment", // no hyphens, must be lowercase and underscore
    }),
  },
  {
    label: "Neutral State",
    minScore: 51,
    color: "#ffd200",
    description:
      "Moderate energy levels with fluctuations in mood, focus, and motivation. Some resistance or stress may lower vibration, requiring conscious effort to maintain balance",
    image: require("@assets/images/buttonNeutral.webp"),
    url: Platform.select({
      ios: "divine-alignment.mp3",
      android: "raw/divine-alignment", // no hyphens, must be lowercase and underscore
    }),
  },
  {
    label: "Low Resonance",
    minScore: 41,
    color: "#ff7a00",
    description:
      "Persistent feelings of fatigue, negativity, or disconnection. External stressors and unresolved issues are present, requiring deep work for realignment",
    image: require("@assets/images/buttonLow.webp"),
    url: Platform.select({
      ios: "divine-alignment.mp3",
      android: "raw/divine-alignment", // no hyphens, must be lowercase and underscore
    }),
  },
  {
    label: "Energy Blockage",
    minScore: 0,
    color: "#db0808",
    description:
      "A low state where physical, emotional, or mental barriers prevent growth. Feelings of being stuck or overwhelmed, requiring focused effort and healing practices to elevate vibration",
    image: require("@assets/images/buttonBlocked.webp"),
    url: Platform.select({
      ios: "divine-alignment.mp3",
      android: "raw/divine-alignment", // no hyphens, must be lowercase and underscore
    }),
  },
];
