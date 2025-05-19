import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { styles } from "./EmotionalTransitionScreen.styles";
import { GradientBackground, FadeInSlideText, SectionLayout } from "@components";

import { Fonts, Colors, buddhistSayings } from "@constants";
import { useAmbientControlForScreen, useVibeCheckNavigation } from "@hooks";



export const EmotionTransitionScreen = () => {
  const { goToNextScreen } = useVibeCheckNavigation();
  useAmbientControlForScreen(false);
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
      goToNextScreen();
    }, totalDelay);

    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}>
      <SectionLayout
        topFlex={0}
        middleFlex={1}
        bottomFlex={0}
        middleContent={
          <>
            <FadeInSlideText text={currentSaying} delay={50} style={styles.quoteText} />


          </>
        }
      />
    </GradientBackground>
  );
};
