// static/journalPrompts.js
export const getJournalPrompts = (score) => {
  if (score >= 80) {
    return [
      {
        id: "j1",
        prompt: "What makes you feel deeply connected to your higher self?",
      },
      {
        id: "j2",
        prompt: "Describe a moment you experienced pure flow or synchronicity.",
      },
    ];
  } else if (score >= 60) {
    return [
      {
        id: "j3",
        prompt: "What thoughts or habits help you stay emotionally balanced?",
      },
      {
        id: "j4",
        prompt: "What does spiritual alignment look like for you right now?",
      },
    ];
  } else {
    return [
      {
        id: "j5",
        prompt: "What are the biggest emotional weights you are carrying today?",
      },
      {
        id: "j6",
        prompt: "What would you say to your younger self right now?",
      },
    ];
  }
};
