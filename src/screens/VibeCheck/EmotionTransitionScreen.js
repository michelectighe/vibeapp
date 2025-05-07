import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import { VIBE_CHECK_SCREENS } from "@navigation/screens";
import { styles } from "./EmotionalTransitionScreen.styles";
import { globalStyles } from "@styles";
import {
  GradientBackground,
  TypewriterText,
  FloatingPhrase,
  SectionLayout,
} from "@components";

import { Fonts, Colors, buddhistSayings } from "@constants";
import { useAmbientControlForScreen } from "@hooks";

export const EmotionTransitionScreen = () => {
  useAmbientControlForScreen(false);
  const navigation = useNavigation();
  const route = useRoute();
  const currentIndex = VIBE_CHECK_SCREENS.indexOf(route.name);
  const { height } = useWindowDimensions();
  const [currentSaying, setCurrentSaying] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * buddhistSayings.length);
    const saying = buddhistSayings[randomIndex];
    setCurrentSaying(saying);

    const typewriterDelay = 50; // match the delay used in TypewriterText
    const totalTypingTime = saying.length * typewriterDelay;

    const bufferTime = 2000; // optional buffer after typing ends
    const totalDelay = totalTypingTime + bufferTime;

    const timer = setTimeout(() => {
      if (currentIndex < VIBE_CHECK_SCREENS.length - 1) {
        const nextScreen = VIBE_CHECK_SCREENS[currentIndex + 1];
        navigation.navigate(nextScreen);
      }
    }, totalDelay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GradientBackground
      colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}
    >
      <SectionLayout
        topFlex={0}
        middleFlex={1}
        bottomFlex={0}
        middleContent={
          <>
            <TypewriterText
              text={currentSaying}
              delay={50}
              style={styles.quoteText}
            />
          </>
        }
      />
    </GradientBackground>
  );
};
