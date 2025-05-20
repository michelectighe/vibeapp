// src/data/toolsCards.js
import { Colors } from "@constants";
export const cardsMeditationScan = [

  {
    id: "med-space",
    title: "Meditation Scan",
    subtitle: "Measure the space for peacefulness",
    // icon: "leaf-outline",
    image: require("@assets/images/home/scan.png"),
    screen: {
      name: "Scan", // <- This is the tab name
      params: { screen: "MeditationSpaceScreen" }, // <- This is the nested screen
    },
    textColor: Colors.lightText,
  },
 
];
