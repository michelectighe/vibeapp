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
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <View style={styles.container}>
          <HomeButton />
          <View style={styles.content}>
            <Text style={styles.descriptionText}>
              Unlock your vibrational frequency by tuning into the harmony of
              your voice, movement, heart rhythm, surroundings and emotions.
              This sacred insight guides you toward deeper alignment, balance,
              and energetic elevation.
            </Text>
            <View style={styles.buttonContainer}>
              <CustomSpiritualButton
                label="How does this work?"
                onPress={openInfo}
                color={Colors.vcButtonColor}
                textColor={Colors.vcButtonTextColor}
              />
              <CustomSpiritualButton
                label="Let's Begin"
                onPress={goToNextScreen}
                color={Colors.vcButtonColor}
                textColor={Colors.vcButtonTextColor}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};
