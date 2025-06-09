// src/data/cardsVibeCheck.js
import { Colors } from "@constants";

export const cardsVibeCheck = [
  {
    id: "daily-vibe",
    title: "Daily Vibe Check",
    subtitle: "Tap to check your current frequency",
    //   icon: "sunny-outline", // Ionicon
    image: require("@assets/images/home/vibe.png"),
    screen: {
      name: "VibeCheck", // <- This is the tab name
      params: { screen: "VibeCheckScreen" }, // <- This is the nested screen
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
    // subtitle: "See your most recent results and recommendations",
    subtitle: null,
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
