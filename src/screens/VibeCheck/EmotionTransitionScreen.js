import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import { VIBE_CHECK_SCREENS } from "@navigation/screens";
import { styles } from "./EmotionalTransitionScreen.styles";
import {
  GradientBackground,
  TypewriterText,
  FloatingPhrase,
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
    setCurrentSaying(buddhistSayings[randomIndex]);

    const timer = setTimeout(() => {
      if (currentIndex < VIBE_CHECK_SCREENS.length - 1) {
        const nextScreen = VIBE_CHECK_SCREENS[currentIndex + 1];
        navigation.navigate(nextScreen);
      }
    }, 5000); // 5-second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <View style={styles.container}>
        {/* Quote */}
        <TypewriterText
          text={currentSaying}
          delay={50}
          style={styles.quoteText}
        />
      </View>
    </GradientBackground>
  );
};
