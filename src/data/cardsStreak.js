// src/data/toolsCards.js
import { Colors } from "@constants";
export const cardsStreak = [
  {
    id: "streaks",
    title: "Streaks",
    subtitle: "See how consistent you’ve been",
    //   icon: "flame-outline",
    image: require("@assets/images/home/streaks.png"),
    screen: {
      name: "StreakStack", // <- This is the tools stack name
      params: { screen: "VibeHistory" }, // <- This is the nested screen
    },
    textColor: Colors.lightText,
  },
  {
    id: "notes",
    title: "Daily Goals",
    subtitle: "Jot down your daily goals",
    // icon: "leaf-outline",
    image: require("@assets/images/home/meditate.png"),
    screen: {
      name: "Streaks", // <- This is the tab name
      params: { screen: "StreakScreen" }, // <- This is the nested screen
    },
    textColor: Colors.lightText,
  },
];
