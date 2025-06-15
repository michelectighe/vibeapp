// src/data/cardsVibeCheck.js
import { Colors } from "@constants";

export const cardsVibeCheck = [
  {
    id: "daily-vibe",
    title: "Daily Vibe Check",
    subtitle: "Tap to check your current frequency",
    //   icon: "sunny-outline", // Ionicon
    image: require("@assets/images/home/vibeCheck.png"),
    screen: {
      name: "VibeCheck", 
      params: { screen: "VibeCheckScreen" }, 
    },
    bgColor: "#a0a0a0",
    bgColor2: "#e0e0e0",
    textColor: Colors.buttonText,
    pulse: true,
    isNews: true,
  },
  {
    id: "recent-results",
    title: "Latest Results",
    subtitle: "",
    image: "",
    screen: {
      name: "VibeCheck",
      params: { screen: "Results" },
    },
    bgColor: "#e0e0e0",
    bgColor2: "#a0a0a0",
    textColor: Colors.buttonText,
    isSquished: true,
  },
];
