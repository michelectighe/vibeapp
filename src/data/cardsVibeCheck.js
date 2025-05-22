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
    textColor: Colors.textLight,
    pulse: true,
  },
  {
    id: "recent-results",
    title: "Most Recent Results",
    subtitle: "See your most recent results and recommendations",
    image: "",
    screen: {
      name: "VibeCheck",
      params: { screen: "Results" },
    },
    textColor: Colors.textLight,
    bgColor: Colors.textDark,
    isSquished: true,
  },
];
