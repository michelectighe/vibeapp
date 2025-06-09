// src/data/toolsCards.js
import { Colors } from "@constants";
export const cardsTools = [
  // {
  //   id: "daily-meditation",
  //   title: "Daily Meditation",
  //   subtitle: "Take a few minutes to ground yourself",
  //   icon: "leaf-outline",
  //   image: require("@assets/images/home/meditate.png"),
  //   screen: {
  //     name: "Tools", // <- This is the tab name
  //     params: { screen: "GuidedMeditationScreen" }, // <- This is the nested screen
  //   },
  //   textColor: Colors.textLight,
  // },
  // {
  //   id: "daily-frequencies",
  //   title: "Healing Sounds",
  //   subtitle: "Let the sounds heal you",
  //   icon: "musical-notes-outline",
  //   image: require("@assets/images/home/sounds.png"),
  //   screen: {
  //     name: "Tools", // <- This is the tab name
  //     params: { screen: "FrequenciesScreen" }, // <- This is the nested screen
  //   },
  //   textColor: Colors.textLight,
  // },
  // {
  //   id: "journal-prompts",
  //   title: "Journal Prompts",
  //   subtitle: "Release with your pen",
  //   icon: "create-outline",
  //   image: require("@assets/images/home/journal.png"),
  //   screen: {
  //     name: "Tools", // <- This is the tab name
  //     params: { screen: "JournalListScreen" }, // <- This is the nested screen
  //   },
  //   textColor: Colors.textLight,
  // },
  // {
  //   id: "awareness-checkin",
  //   title: "Awareness Check In",
  //   subtitle: "Breathe your nervous system into a peaceful state",
  //   icon: "cloud-outline",
  //   image: require("@assets/images/home/breath.png"),
  //   screen: {
  //     name: "Tools",
  //     params: { screen: "AwarenessCheckinScreen" },
  //   },
  //   textColor: Colors.textLight,
  // },
  {
    id: "breath-work",
    title: "Breath Work",
    subtitle: "Breathe into a peaceful state",
    icon: "cloud-outline",
    image: require("@assets/images/home/breath.png"),
    screen: {
      name: "Tools", // <- This is the tools stack name
      params: { screen: "BreathWorksScreen" }, // <- This is the nested screen
    },
    bgColor: Colors.cardBackground,
    textColor: Colors.cardText,
    pulseSub: true,
  },

  {
    id: "energy-reset",
    title: "Energy Reset",
    subtitle: "Time to reset your nervous system",
    //  icon: "cloud-outline",
    image: require("@assets/images/home/shadow.png"),
    screen: {
      name: "Tools", // <- This is the tab name
      params: { screen: "EnergyResetScreen" }, // <- This is the nested screen
    },
    bgColor: Colors.cardBackground,
    textColor: Colors.cardText,
  },

  // {
  //   id: "vibe-history",
  //   title: "Vibe History",
  //   subtitle: "See how your vibe changes over time",
  //   //   icon: "flame-outline",
  //   image: require("@assets/images/home/streaks.png"),
  //   screen: {
  //     name: "Tools", // <- This is the tools stack name
  //     params: { screen: "VibeHistory" }, // <- This is the nested screen
  //   },
  //   bgColor: Colors.cardBackground,
  //   textColor: Colors.cardText,
  // },
  // {
  //   id: "notes",
  //   title: "Daily Goals",
  //   subtitle: "Jot down your daily goals",
  //   // icon: "leaf-outline",
  //   image: require("@assets/images/home/goals.png"),
  //   screen: {
  //     name: "Streaks", // <- This is the tab name
  //     params: { screen: "StreakScreen" }, // <- This is the nested screen
  //   },
  //   bgColor: Colors.cardBackground,
  //   textColor: Colors.cardText,
  // },
];
