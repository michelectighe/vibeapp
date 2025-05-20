// src/data/toolsCards.js
import { Colors } from "@constants";
export const cardsVibeMatch = [
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
      textColor: Colors.textLight,
    },
  {
    id: "match-history",
    title: "Match History",
    subtitle: "See who you vibed with the most",
    //  icon: "leaf-outline",
    image: require("@assets/images/home/matchHistory.png"),
    screen: {
      name: "VibeMatch", // <- This is the tab name
      params: { screen: "ShareScreen" }, // <- This is the nested screen
    },
    textColor: Colors.textLight,
  },
  {
    id: "match-comparison",
    title: "Match Comparison",
    subtitle: "How well matdhed are you",
    //  icon: "cloud-outline",
    image: require("@assets/images/home/matchComp.png"),
    screen: {
      name: "VibeMatch", // <- This is the tab name
      params: { screen: "ShareScreen" }, // <- This is the nested screen
    },
    textColor: Colors.textLight,
  },
];
