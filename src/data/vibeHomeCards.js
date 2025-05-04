// src/data/vibeHomeCards.js
import { Colors } from "@constants";
export const vibeHomeCards = [
  {
    id: "daily-vibe",
    title: "Daily Vibe Check",
    subtitle: "Tap to check your current frequency",
    //   icon: "sunny-outline", // Ionicon
    image: require("@assets/images/home/vibe.png"),
    screen: "VibeCheck", // or whatever screen it should open
    textColor: Colors.lightText,
  },
  {
    id: "vibe-match",
    title: "Vibe Match",
    subtitle: "See if you're in sync",
    // icon: "leaf-outline",
    image: require("@assets/images/home/match.png"),
    screen: {
      name: "VibeMatch", // <- This is the tab name
      params: { screen: "ShareScreen" }, // <- This is the nested screen
    },
    textColor: Colors.darkText,
  },
  {
    id: "streaks",
    title: "Streaks",
    subtitle: "See how consistent you’ve been",
    //   icon: "flame-outline",
    image: require("@assets/images/home/streaks.png"),
    screen: {
      name: "StreakStack", // <- This is the tools stack name
      params: { screen: "StreakScreen" }, // <- This is the nested screen
    },
    textColor: Colors.lightText,
  },
  {
    id: "healing-tools",
    title: "Inner Work",
    subtitle: "Explore the tools to heal, reflect, and grow",
    // icon: "leaf-outline",
    image: require("@assets/images/home/innerWork.png"),
    screen: {
      name: "InnerWork", // <- This is the tools stack name
      params: { screen: "ToolsMainScreen" }, // <- This is the nested screen
    },
    textColor: Colors.lightText,
  },
];
