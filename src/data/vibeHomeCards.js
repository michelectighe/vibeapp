// src/data/vibeHomeCards.js

export const vibeHomeCards = [
  {
    id: "daily-vibe",
    title: "Daily Vibe Check",
    subtitle: "Tap to check your current frequency",
    //   icon: "sunny-outline", // Ionicon
    image: require("@assets/images/home/vibe.png"),
    screen: "VibeCheck", // or whatever screen it should open
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
  },
  {
    id: "streaks",
    title: "Streaks",
    subtitle: "See how consistent you’ve been",
    //   icon: "flame-outline",
    image: require("@assets/images/home/streaks.png"),
    screen: "Streaks", // placeholder
  },
  {
    id: "daily-meditation",
    title: "Daily Meditation",
    subtitle: "Take a few minutes to ground yourself",
    // icon: "leaf-outline",
    image: require("@assets/images/home/meditate.png"),
    screen: {
      name: "Meditate", // <- This is the tab name
      params: { screen: "GuidedMeditations" }, // <- This is the nested screen
    },
  },
  {
    id: "daily-frequencies",
    title: "Healing Sounds",
    subtitle: "Let the sounds heal you",
    //  icon: "leaf-outline",
    image: require("@assets/images/home/sounds.png"),
    screen: {
      name: "Meditate", // <- This is the tab name
      params: { screen: "Frequencies" }, // <- This is the nested screen
    },
  },
  {
    id: "journal-prompts",
    title: "Journal Prompts",
    subtitle: "Release with your pen",
    //  icon: "cloud-outline",
    image: require("@assets/images/home/journal.png"),
    screen: {
      name: "VibeCheck", // <- This is the tab name
      params: { screen: "JournalScreen" }, // <- This is the nested screen
    },
  },
  {
    id: "breath-work",
    title: "Breath Work",
    subtitle: "Breathe your nervous system into a peaceful state",
    //  icon: "cloud-outline",
    image: require("@assets/images/home/breath.png"),
    screen: {
      name: "Tools", // <- This is the tools stack name
      params: { screen: "BreathWorksScreen" }, // <- This is the nested screen
    },
  },
  {
    id: "shadow-work",
    title: "Shadow Work",
    subtitle: "Let your light shine on your darkness",
    //  icon: "cloud-outline",
    image: require("@assets/images/home/shadow.png"),
    screen: {
      name: "VibeCheck", // <- This is the tab name
      params: { screen: "JournalScreen" }, // <- This is the nested screen
    },
  },
];
