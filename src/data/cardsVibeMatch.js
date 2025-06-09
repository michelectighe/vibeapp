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
    bgColor: Colors.cardBackground,
    textColor: Colors.cardText,
  },

  {
    id: "match-history",
    title: "Match History",
    subtitle: "See your best matches",
    //  icon: "cloud-outline",
    image: require("@assets/images/home/matchComp.png"),
    screen: {
      name: "VibeMatch", // <- This is the tab name
      params: { screen: "MatchListScreen" }, // <- This is the nested screen
    },
    bgColor: Colors.cardBackground,
    textColor: Colors.cardText,
  },
];
