import React, { useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { GradientBackground, CustomSpiritualButton } from "@components";
import { useAnalysis } from "@context";
import { cleanupMedia } from "@utils";
import { Colors } from "@constants";
import { useAmbientControlForScreen, useVibeCheckNavigation } from "@hooks";
import { styles } from "./VibeCheckScreen.styles";
import { FadeInSlideText, SectionLayout } from "@/components";

export const VibeCheckScreen = () => {
  useAmbientControlForScreen(false);
  const { goToNextScreen } = useVibeCheckNavigation();

  const navigation = useNavigation();
  const { resetAnalysis } = useAnalysis();
  useEffect(() => {
    //console.log("Mounted");

    return () => {
      //console.log("UNMOUNTED");
    };
  }, []);


  useFocusEffect(
    useCallback(() => {
      const cleanup = async () => {
        try {
          await resetAnalysis();
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
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}>
      <SectionLayout
        topFlex={5}
        middleFlex={0}
        bottomFlex={1}
        equalHeight={false}
        topContent={
          <FadeInSlideText style={styles.descriptionText} text="
            Unlock your vibrational frequency by tuning into the harmony of your voice, movement,
            heart rhythm, surroundings and emotions. This sacred insight guides you toward deeper
            alignment, balance, and energetic elevation."
          />
        }
        bottomContent={
          <View style={styles.buttonContainer}>
            <CustomSpiritualButton
              label="How does this work?"
              onPress={openInfo}
              color={Colors.buttonBackground}
              textColor={Colors.lightText}
            />
            <CustomSpiritualButton
              label="Let's Begin"
              onPress={goToNextScreen}
              color={Colors.buttonBackground}
              textColor={Colors.lightText}
            />
          </View>
        }
      />
    </GradientBackground>
  );
};
