// data/vibrationLevels.js
import { Platform } from "react-native";

export const vibrationLevels = [
  {
    id: "level1",
    label: "Divine Alignment",
    minScore: 91,
    color: "#5a35cd",
    description:
      "A state of profound spiritual connection and harmony with the universe. Intuition is fully awakened, bringing peace, clarity, and the ability to manifest effortlessly",
    image: require("@assets/images/buttonDivine.webp"),

    text1:
      "You are in complete harmony with the universe, radiating love, joy, and peace. Manifestation comes effortlessly, and you attract abundance with ease.",
    label2: "How to Maintain & Elevate:",
    text2:
      "Balance spiritual practice with physical grounding. Stay connected with supportive communities to maintain alignment. Continue practicing gratitude, forgiveness, and service to others.",
    label3: "Recommended Meditation:",
    text3:
      "Samadhi Meditation – Deep contemplation that dissolves the ego and merges consciousness with the divine.",
    label4: "Recommended Spiritual Practice:",
    text4:
      "Light Body Activation – Visualizing your entire being filled with divine light to strengthen your energetic field.",
    label5: "Be Mindful of:",
    text5: "Over exertion or spiritual burnout from excessive energy work.",
    color2: "#c8bfff",
  },
  {
    id: "level2",
    label: "Transcendent Frequency",
    minScore: 81,
    color: "#004aad",
    description:
      "Elevated energy, profound clarity, and an expanded sense of self. Intuition and manifestation are strong, with a deep sense of peace and purpose",
    image: require("@assets/images/buttonTranscendent.webp"),

    text1:
      "You have strong intuition and emotional resilience. Life flows smoothly, though occasional doubts or distractions may arise.",
    label2: "How to Increase your Vibrational Frequency:",
    text2:
      "Practice self-reflection and clear limiting beliefs. Surround yourself with high-energy environments and uplifting influences. Incorporate breathwork to sustain inner clarity.",
    label3: "Factors Negatively Impacting Your Vibrational Frequency:",
    text3:
      "Exposure to subtle negative energy through people, media, or stress. Self-doubt or reluctance to fully trust your spiritual path. Unresolved emotions that resurface periodically.",
    label4: "Recommended Meditation:",
    text4:
      "Third Eye Activation Meditation – Visualization and chanting to awaken intuition.",
    label5: "Recommended Spiritual Practice:",
    text5:
      "Sacred Chanting – Recite mantras like 'Om Mani Padme Hum' to elevate vibration.",
    color: "#004aad",
  },
  {
    id: "level3",
    label: "Elevated Frequency",
    minScore: 71,
    color: "#46c9fe",
    description:
      "Consistent positivity and emotional balance. Personal energy remains strong, and challenges are managed with resilience, though occasional dips occur.",
    image: require("@assets/images/buttonElevated.webp"),
    text1:
      "You maintain a mostly positive outlook, but external stressors or occasional self-doubt affect your energy.",
    label2: "How to Increase your Vibrational Frequency:",
    text2:
      "Establish a structured spiritual routine. Engage in heart-centered practices like gratitude and compassion. Reduce distractions and focus on personal growth.",
    label3: "Factors Negatively Impacting Your Vibrational Frequency:",
    text3:
      "Unbalanced lifestyle, emotional overwhelm, or mental clutter. Frequent overstimulation or lack of rest.",
    label4: "Recommended Meditation:",
    text4:
      "Heart Chakra Meditation – Visualizing green energy to cultivate love and forgiveness.",
    label5: "Recommended Spiritual Practice:",
    text5:
      "Crystal Healing – Carry high-vibration crystals like rose quartz or citrine.",

    color2: "#d6f4ff",
  },
  {
    id: "level4",
    label: "Balanced State",
    minScore: 61,
    color: "#29b554",
    description:
      "Steady energy with manageable fluctuations. Emotional and mental states can shift, but there is a consistent effort toward growth and maintaining stability",
    image: require("@assets/images/buttonBalanced.webp"),
    text1:
      "Your energy fluctuates, and while you experience moments of clarity, you often feel drained or distracted.",
    label2: "Factors Negatively Impacting Your Score:",
    text2:
      "Lack of spiritual focus or motivation. Being influenced by negative environments or people. Over reliance on logic and skepticism, blocking deeper intuition.",
    label3: "How to Raise Your Vibrational Frequency:",
    text3:
      "Cleanse your energy regularly with smudging or salt baths. Reduce exposure to negativity in media and conversations. Spend time in nature for grounding.",
    label4: "Recommended Meditation:",
    text4:
      "Grounding Meditation – Visualizing roots anchoring your energy to the earth.",
    label5: "Recommended Spiritual Practice:",
    text5:
      "Gratitude Journaling – Writing daily reflections to shift toward positivity.",
    color2: "#c1f0d0",
  },
  {
    id: "level5",
    label: "Neutral State",
    minScore: 51,
    color: "#ffd200",
    description:
      "Moderate energy levels with fluctuations in mood, focus, and motivation. Some resistance or stress may lower vibration, requiring conscious effort to maintain balance",
    image: require("@assets/images/buttonNeutral.webp"),
    text1:
      "You feel mentally or emotionally drained, lacking direction or inspiration.",
    label2: "Factors Negatively Impacting Your Score:",
    text2:
      "Overconsumption of technology, social media, or negative news. Unhealthy habits such as poor diet, lack of movement, or substance use. Suppressed emotions or avoidance of personal growth.",
    label3: "How to Increase Your Vibrational Frequency:",
    text3:
      "Set small, achievable goals for personal development. Limit distractions and focus on self-care. Engage in activities that spark creativity and joy.",
    label4: "Recommended Meditation:",
    text4:
      "Body scan meditation – Releasing tension through mindful awareness.",
    label5: "Recommended Spiritual Practice:",
    text5:
      "Cleansing rituals – Using incense, sound bowls, or water therapy to clear stagnant energy.",
    color2: "#fff5cc",
  },
  {
    id: "level6",
    label: "Low Resonance",
    minScore: 41,
    color: "#ff7a00",
    description:
      "Persistent feelings of fatigue, negativity, or disconnection. External stressors and unresolved issues are present, requiring deep work for realignment",
    image: require("@assets/images/buttonLow.webp"),
    text1:
      "Stress, fatigue, and negativity dominate your energy. You may feel disconnected from your purpose.",
    label2: "Factors Negatively Impacting Your Vibrational Frequency:",
    text2:
      "Unresolved trauma, fear, or past experiences weighing on your energy. Persistent negative self-talk and limiting beliefs. Being in toxic relationships or environments.",
    label3: "How to Increase Your Vibrational Frequency:",
    text3:
      "Seek emotional healing through therapy or shadow work. Shift focus to positive affirmations and self-compassion. Spend time in uplifting environments and connect with supportive people.",
    label4: "Recommended Meditation:",
    text4:
      "Ho'oponopono meditation – A Hawaiian practice of forgiveness and emotional healing.",
    label5: "Recommended Spiritual Practice:",
    text5:
      "Shadow work – Journaling or therapy to confront and heal emotional wounds.",

    color2: "#ffd2a6",
  },
  {
    id: "level7",
    label: "Energy Blockage",
    minScore: 0,
    color: "#db0808",
    description:
      "A low state where physical, emotional, or mental barriers prevent growth. Feelings of being stuck or overwhelmed, requiring focused effort and healing practices to elevate vibration",
    image: require("@assets/images/buttonBlocked.webp"),
    text1: "You feel disconnected, overwhelmed, and stuck in negative cycles.",
    label2: "Factors Negatively Impacting Your Score:",
    text2:
      "Deep emotional wounds or unresolved inner turmoil. Lack of purpose, direction, or motivation to change. Surrounded by low-frequency influences or toxic energy.",
    label3: "How to Increase Your Vibrational Frequency:",
    text3:
      "Prioritize professional support (therapists, energy healers, or mentors). Engage in movement-based practices to release stagnant energy. Set small, realistic goals for self-improvement.",
    label4: "Recommended Meditation:",
    text4:
      "Inner child healing meditation – Connecting with your inner child to heal past wounds.",
    label5: "Recommended Spiritual Practice:",
    text5:
      "Energy cord cutting – Visualizing the release of toxic energetic ties.",
    color2: "#ffb3b3",
  },
];
