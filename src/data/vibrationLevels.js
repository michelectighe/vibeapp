// data/vibrationLevels.js
import {} from "react-native";
import { Colors } from "@/constants";

export const vibrationLevels = [
  {
    id: "level1",
    label: "Divine Alignment",
    minScore: 85,
    color: Colors.divineColor1,
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
    color2: Colors.divineColor2,
    color3: Colors.divineColor3,
    color4: Colors.divineColor4,
    recommendations: {
      meditations: ["1", "3"], // IDs from `meditationList`
      frequencies: [396, 528], // Hz values from `frequencies`
      breathing: ["box", "deep"], // IDs from `BREATH_PATTERNS`
    },
    historyDescription:
      "You were deeply aligned and spiritually connected during this time. Your intuition and energy were at their peak, and you radiated a strong sense of peace and purpose.",
  },
  {
    id: "level2",
    label: "Transcendent Frequency",
    minScore: 75,
    color: Colors.transcendentColor1,
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
    text4: "Third Eye Activation Meditation – Visualization and chanting to awaken intuition.",
    label5: "Recommended Spiritual Practice:",
    text5: "Sacred Chanting – Recite mantras like 'Om Mani Padme Hum' to elevate vibration.",
    color2: Colors.transcendentColor2,
    color3: Colors.transcendentColor3,
    color4: Colors.transcendentColor4,
    recommendations: {
      meditations: ["1", "3"], // IDs from `meditationList`
      frequencies: [396, 528], // Hz values from `frequencies`
      breathing: ["box", "deep"], // IDs from `BREATH_PATTERNS`
    },
    historyDescription:
      "You experienced a profound sense of inner clarity and purpose. Your intuition was strong, and you flowed through life with peace and elevated awareness.",
  },
  {
    id: "level3",
    label: "Elevated Frequency",
    minScore: 65,
    color: Colors.elevatedColor1,
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
    text4: "Heart Chakra Meditation – Visualizing green energy to cultivate love and forgiveness.",
    label5: "Recommended Spiritual Practice:",
    text5: "Crystal Healing – Carry high-vibration crystals like rose quartz or citrine.",

    color2: Colors.elevatedColor2,
    color3: Colors.elevatedColor3,
    color4: Colors.elevatedColor4,
    recommendations: {
      meditations: ["1", "3"], // IDs from `meditationList`
      frequencies: [396, 528], // Hz values from `frequencies`
      breathing: ["box", "deep"], // IDs from `BREATH_PATTERNS`
    },
    historyDescription:
      "You maintained a high vibrational state, facing challenges with resilience and grace. Positivity and emotional balance were guiding your actions.",
  },
  {
    id: "level4",
    label: "Balanced State",
    minScore: 60,
    color: Colors.balancedColor1,
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
    text4: "Grounding Meditation – Visualizing roots anchoring your energy to the earth.",
    label5: "Recommended Spiritual Practice:",
    text5: "Gratitude Journaling – Writing daily reflections to shift toward positivity.",
    color2: Colors.balancedColor2,
    color3: Colors.balancedColor3,
    color4: Colors.balancedColor4,
    recommendations: {
      meditations: ["1", "3"], // IDs from `meditationList`
      frequencies: [396, 528], // Hz values from `frequencies`
      breathing: ["box", "deep"], // IDs from `BREATH_PATTERNS`
    },
    historyDescription:
      "You were navigating life with steady energy and occasional fluctuations. While moments of clarity emerged, distractions or fatigue may have challenged your focus.",
  },
  {
    id: "level5",
    label: "Neutral State",
    minScore: 55,
    color: Colors.neutralColor1,
    description:
      "Moderate energy levels with fluctuations in mood, focus, and motivation. Some resistance or stress may lower vibration, requiring conscious effort to maintain balance",
    image: require("@assets/images/buttonNeutral.webp"),
    text1: "You feel mentally or emotionally drained, lacking direction or inspiration.",
    label2: "Factors Negatively Impacting Your Score:",
    text2:
      "Overconsumption of technology, social media, or negative news. Unhealthy habits such as poor diet, lack of movement, or substance use. Suppressed emotions or avoidance of personal growth.",
    label3: "How to Increase Your Vibrational Frequency:",
    text3:
      "Set small, achievable goals for personal development. Limit distractions and focus on self-care. Engage in activities that spark creativity and joy.",
    label4: "Recommended Meditation:",
    text4: "Body scan meditation – Releasing tension through mindful awareness.",
    label5: "Recommended Spiritual Practice:",
    text5:
      "Cleansing rituals – Using incense, sound bowls, or water therapy to clear stagnant energy.",
    color2: Colors.neutralColor2,
    color3: Colors.neutralColor3,
    color4: Colors.neutralColor4,
    recommendations: {
      meditations: ["1", "3"], // IDs from `meditationList`
      frequencies: [396, 528], // Hz values from `frequencies`
      breathing: ["box", "deep"], // IDs from `BREATH_PATTERNS`
    },
    historyDescription:
      "Your energy felt moderate and changeable. You may have been managing stress or low motivation, yet remained aware of the need to rebalance.",
  },
  {
    id: "level6",
    label: "Low Resonance",
    minScore: 50,
    color: Colors.lowColor1,
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
    text4: "Ho'oponopono meditation – A Hawaiian practice of forgiveness and emotional healing.",
    label5: "Recommended Spiritual Practice:",
    text5: "Shadow work – Journaling or therapy to confront and heal emotional wounds.",
    color2: Colors.lowColor2,
    color3: Colors.lowColor3,
    color4: Colors.lowColor4,
    recommendations: {
      meditations: ["1", "3"], // IDs from `meditationList`
      frequencies: [396, 528], // Hz values from `frequencies`
      breathing: ["box", "deep"], // IDs from `BREATH_PATTERNS`
    },
    historyDescription:
      "You were likely feeling emotionally drained or disconnected. Persistent stress or negativity may have lowered your vibration and clarity.",
  },
  {
    id: "level7",
    label: "Energy Blockage",
    minScore: 0,
    color: Colors.blockColor1,
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
    text4: "Inner child healing meditation – Connecting with your inner child to heal past wounds.",
    label5: "Recommended Spiritual Practice:",
    text5: "Energy cord cutting – Visualizing the release of toxic energetic ties.",
    color2: Colors.blockColor2,
    color3: Colors.blockColor3,
    color4: Colors.blockColor4,
    recommendations: {
      meditations: ["1", "3"], // IDs from `meditationList`
      frequencies: [396, 528], // Hz values from `frequencies`
      breathing: ["box", "deep"], // IDs from `BREATH_PATTERNS`
    },
    historyDescription:
      "You may have felt stuck or overwhelmed, with limited energy for movement or change. Heavy emotions or external pressures were likely affecting your state.",
  },
];
