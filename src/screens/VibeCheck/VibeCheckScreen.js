import React, { useCallback } from "react";
import { View, Text, SafeAreaView } from "react-native";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import {
  GradientBackground,
  HomeButton,
  CustomSpiritualButton,
} from "@components";
import { VIBE_CHECK_SCREENS } from "@navigation/screens";
import { useAnalysis } from "@context";
import { cleanupMedia } from "@utils";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./VibeCheckScreen.styles";
import { globalStyles } from "@styles";
import { SectionLayout } from "@/components";

export const VibeCheckScreen = () => {
  useAmbientControlForScreen(false);
  const navigation = useNavigation();
  const route = useRoute();
  const currentIndex = VIBE_CHECK_SCREENS.indexOf(route.name);
  const { resetAnalysis } = useAnalysis();

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
    }, [])
  );

  const goToNextScreen = () => {
    if (currentIndex < VIBE_CHECK_SCREENS.length - 1) {
      navigation.navigate(VIBE_CHECK_SCREENS[currentIndex + 1]);
    }
  };

  const openInfo = () => navigation.navigate("MetricInfoScreen");

  return (
    <GradientBackground
      colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}
    >
      <SectionLayout
        topFlex={3}
        middleFlex={0}
        bottomFlex={1}
        equalHeight={false}
        topContent={
          <Text style={styles.descriptionText}>
            Unlock your vibrational frequency by tuning into the harmony of your
            voice, movement, heart rhythm, surroundings and emotions. This
            sacred insight guides you toward deeper alignment, balance, and
            energetic elevation.
          </Text>
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
