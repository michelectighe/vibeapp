// src/data/toolsCards.js
import { Colors } from "@constants";
export const cardsVibeMatch = [
  {
    id: "vibe-match",
    title: "Vibe Match",
    subtitle: "See if you're in sync",
    // icon: "leaf-outline",
    image: require("@assets/images/home/match2.png"),
    screen: {
      name: "VibeMatch",
      params: { screen: "ShareScreen" },
    },
    bgColor: Colors.cardBackground,
    textColor: Colors.cardText,
    divider: true,
  },

  {
    id: "match-history",
    title: "Match History",
    subtitle: "See your best matches",
    //  icon: "cloud-outline",
    image: require("@assets/images/home/matchComp.png"),
    screen: {
      name: "VibeMatch",
      params: { screen: "MatchListScreen" },
    },
    bgColor: Colors.cardBackground,
    textColor: Colors.cardText,
  },
];
