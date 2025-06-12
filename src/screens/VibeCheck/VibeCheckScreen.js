import React, { useCallback, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { GradientBackground, CustomSpiritualButton } from "@components";
import { useAnalysis } from "@context";
import { cleanupMedia } from "@utils";
import { Colors } from "@constants";
import { useAmbientControlForScreen, useVibeCheckNavigation } from "@hooks";
import { styles } from "./VibeCheckScreen.styles";
import { FadeInSlideText, SectionLayout } from "@/components";
import { hexToRgba } from "@/utils";

export const VibeCheckScreen = () => {
  useAmbientControlForScreen(false);
  const { goToNextScreen } = useVibeCheckNavigation();
  const continueOpacity = useRef(new Animated.Value(0)).current;

  const startAnalysis = async () => {
    await resetAnalysis();
    goToNextScreen();
  };
  const navigation = useNavigation();
  const { resetAnalysis } = useAnalysis();
  useEffect(() => {
    //console.log("Mounted");

    return () => {
      //console.log("UNMOUNTED");
    };
  }, []);
  useEffect(() => {
    Animated.timing(continueOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useFocusEffect(
    useCallback(() => {
      const cleanup = async () => {
        try {
          await cleanupMedia(true, true, true, null, true);
        } catch (e) {
          console.warn("cleanup failed in VibeCheckMain screen:", e);
        }
      };
      cleanup();
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  );

  const openInfo = () => navigation.navigate("MetricInfoScreen");

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <SectionLayout
        topFlex={2}
        middleFlex={0}
        bottomFlex={1}
        equalHeight={false}
        safe={true}
        topContent={
          <FadeInSlideText
            style={styles.descriptionText}
            position={-300}
            text="
            Unlock your vibrational frequency by tuning into the harmony of your voice, movement,
            heart rhythm, surroundings and emotions. This sacred insight guides you toward deeper
            alignment, balance, and energetic elevation."
          />
        }
        bottomContent={
          <Animated.View style={[styles.buttonContainer, { opacity: continueOpacity }]}>
            <CustomSpiritualButton
              label="How does this work?"
              onPress={openInfo}
              color={hexToRgba(Colors.buttonBackground)}
              textColor={Colors.buttonText}
            />
            <CustomSpiritualButton
              label="Let's Begin"
              onPress={startAnalysis}
              color={hexToRgba(Colors.buttonBackground)}
              textColor={Colors.buttonText}
            />
          </Animated.View>
        }
      />
    </GradientBackground>
  );
};
