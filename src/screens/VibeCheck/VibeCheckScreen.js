import React, {
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Animated,
  SafeAreaView,
} from "react-native";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
//import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

import { useWindowDimensions } from "react-native";
import {
  ProgressDots,
  GradientBackground,
  HomeButton,
  CustomSpiritualButton,
} from "@components";
import { VIBE_CHECK_SCREENS } from "@navigation"; // ✅ Import once, use everywhere
import { useAnalysis } from "@context";
import { fadeOutMusic } from "@services"; // adjust path if needed
import { cleanupMedia } from "@utils";
import { Fonts, Colors } from "@constants";

const VibeCheckScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentIndex = VIBE_CHECK_SCREENS.indexOf(route.name);
  const { width } = useWindowDimensions();
  const { resetAnalysis } = useAnalysis();

  useFocusEffect(
    useCallback(() => {
      const cleanup = async () => {
        try {
          await resetAnalysis(); // clear all previous test values
          await fadeOutMusic();
          await cleanupMedia(
            (useAudio = true),
            (useSoundLevel = true),
            (useCamera = true),
            (frameProcessorActiveRef = null),
            (isAudioRecording = true)
          );
        } catch (e) {
          console.warn("cleanup failed in VibeCheckMain screen:", e);
        }
      };
      cleanup();
    }, [])
  );

  useEffect(() => {
    const cleanup = async () => {
      try {
        await resetAnalysis(); // clear all previous test values
        await fadeOutMusic();
        await cleanupMedia(
          (useAudio = true),
          (useSoundLevel = true),
          (useCamera = true),
          (frameProcessorActiveRef = null),
          (isAudioRecording = true)
        );
      } catch (e) {
        console.warn("cleanup failed in VibeCheckMain screen:", e);
      }
    };
    cleanup();
  }, []);

  const goToNextScreen = () => {
    if (currentIndex < VIBE_CHECK_SCREENS.length - 1) {
      const nextScreen = VIBE_CHECK_SCREENS[currentIndex + 1];
      //console.log("nextScreen:", nextScreen);
      navigation.navigate(nextScreen);
    }
  };
  const openInfo = () => {
    navigation.navigate("MetricInfoScreen");
  };
  const goBack = () => {
    if (currentIndex > 0) {
      navigation.goBack();
    }
  };

  // const swipeGesture = Gesture.Pan().onEnd((event) => {
  //   if (event.translationX < 50 && event.velocityX < 0) {
  //     // Swipe left → Go forward
  //     runOnJS(goToNextScreen)();
  //   } else if (event.translationX > 50 && event.velocityX > 0) {
  //     // Swipe right → Go back
  //     runOnJS(goBack)();
  //   }
  // });

  // description: "Analyze your frequency using motion, voice, heart rate, environment, emotions, and sleep.",

  const backgroundImage = require("@assets/images/backgroundVibeCheck.webp");

  return (
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <View
          style={{ flex: 1, width: "100%", height: "100%" }}
          className="items-center"
        >
          {/* <ImageBackground
          style={{ flex: 1, width: "100%", height: "100%" }}
          source={backgroundImage}
          resizeMode="cover"
        > */}
          <HomeButton />

          {/* Description */}
          <View
            style={{ flex: 1, alignContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                marginTop: "5%",
                marginBottom: 50,
                textAlign: "center",
                color: Colors.textPrimary,
                fontFamily: Fonts.AppFont,
                padding: 30,
                fontSize: 24,
              }}
            >
              Unlock your vibrational frequency by tuning into the harmony of
              your voice, movement, heart rythm, surroundings and emotions. This
              sacred insight guides you toward deeper alignment, balance, and
              energetic elevation.
            </Text>
            <View
              style={{
                position: "absolute",
                bottom: "10%",
                width: "90%",
                alignContent: "center",
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
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
          {/* </ImageBackground> */}
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({});

export default VibeCheckScreen;
