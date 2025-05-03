// src/data/toolsCards.js
import { Colors } from "@constants";
export const toolsCards = [
  {
    id: "daily-meditation",
    title: "Daily Meditation",
    subtitle: "Take a few minutes to ground yourself",
    // icon: "leaf-outline",
    image: require("@assets/images/home/meditate.png"),
    screen: {
      name: "InnerWork", // <- This is the tab name
      params: { screen: "GuidedMeditationScreen" }, // <- This is the nested screen
    },
    textColor: Colors.lightTextColor,
  },
  {
    id: "daily-frequencies",
    title: "Healing Sounds",
    subtitle: "Let the sounds heal you",
    //  icon: "leaf-outline",
    image: require("@assets/images/home/sounds.png"),
    screen: {
      name: "InnerWork", // <- This is the tab name
      params: { screen: "FrequenciesScreen" }, // <- This is the nested screen
    },
    textColor: Colors.darkTextColor,
  },
  {
    id: "journal-prompts",
    title: "Journal Prompts",
    subtitle: "Release with your pen",
    //  icon: "cloud-outline",
    image: require("@assets/images/home/journal.png"),
    screen: {
      name: "InnerWork", // <- This is the tab name
      params: { screen: "QuantumJournalScreen" }, // <- This is the nested screen
    },
    textColor: Colors.darkTextColor,
  },
  {
    id: "breath-work",
    title: "Breath Work",
    subtitle: "Breathe your nervous system into a peaceful state",
    //  icon: "cloud-outline",
    image: require("@assets/images/home/breath.png"),
    screen: {
      name: "InnerWork", // <- This is the tools stack name
      params: { screen: "BreathWorksScreen" }, // <- This is the nested screen
    },
    textColor: Colors.lightTextColor,
  },
  {
    id: "shadow-work",
    title: "Shadow Work",
    subtitle: "Let your light shine on your darkness",
    //  icon: "cloud-outline",
    image: require("@assets/images/home/shadow.png"),
    screen: {
      name: "InnerWork", // <- This is the tab name
      params: { screen: "QuantumJournalScreen" }, // <- This is the nested screen
    },
    textColor: Colors.lightTextColor,
  },
];
