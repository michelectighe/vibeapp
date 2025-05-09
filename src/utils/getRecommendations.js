export const getRandomFromArray = (array) => {
    if (!Array.isArray(array) || array.length === 0) return null;
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  };
  

import { meditationList, frequencies, breathingPatterns } from "@data";
export const getVibeRecommendations = ({
    vibrationLevel,
  }) => {
    const { recommendations } = vibrationLevel;
    if (!recommendations) return {};
  
    const meditationId = getRandomFromArray(recommendations.meditations);
    const frequencyHz = getRandomFromArray(recommendations.frequencies);
    const breathingId = getRandomFromArray(recommendations.breathing);
  
    return {
      meditation: meditationList.find((m) => m.id === meditationId),
      frequency: frequencies.find((f) => f.hz === frequencyHz),
      breathing: breathingPatterns.find((b) => b.id === breathingId),
    };
  };
  