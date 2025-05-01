import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import HeartRateCamera from "@features/heartRate/HeartRateCamera";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useAnalysis, useMotion, useEnvironment } from "@context";
import { runOnJS } from "react-native-reanimated";
import {
  ProgressDots,
  GradientBackground,
  FloatingPhrase,
  CustomSpiritualButton,
} from "@components";
import { VIBE_CHECK_SCREENS } from "@navigation";
import { debounceLabel } from "@utils";
import { Colors, Fonts } from "@constants";

function HeartRateScreenInner() {
  const route = useRoute();
  const currentIndex = VIBE_CHECK_SCREENS.indexOf(route.name);
  const { setHeartRate, setSound, setMagnitude, setMotion } = useAnalysis();
  const { averageMotion, latestMotion, motionEval, stopMotionTracking } =
    useMotion();
  const {
    environment,
    averageSound,
    averageMagnitude,
    stopEnvironmentTracking,
  } = useEnvironment();
  const [combinedCalm, setCombinedCalm] = useState(0);
  const [spaceLabel, setSpaceLabel] = useState("Neutral");
  const [avgSound, setAvgSound] = useState();
  const [avgMag, setAvgMag] = useState();
  const [avgMotion, setAvgMotion] = useState();
  const [magLabel, setMagLabel] = useState("");
  const [soundLabel, setSoundLabel] = useState("");
  const [motionLabel, setMotionLabel] = useState("");
  const navigation = useNavigation();
  const btnImage = require("@assets/images/chiclet.webp");
  const lastSoundLabelRef = useRef(null);
  const lastMagLabelRef = useRef(null);
  const lastOverallLabelRef = useRef(null);
  const lastMotionLabelRef = useRef(null);
  const lastSetTimestampRef = useRef(null);
  const debounceSoundTimeout = useRef(null);
  const debounceMagTimeout = useRef(null);
  const debounceMotionTimeout = useRef(null);

  const { height, width } = Dimensions.get("window");

  // Correctly use array destructuring with useState
  const [stable, setStablized] = useState(false);

  // Start tracking on focus and clean up when the screen loses focus
  useFocusEffect(
    useCallback(() => {
      setStablized(false);
      return () => {
        try {
          stopMotionTracking();
          stopEnvironmentTracking();
        } catch (error) {
          console.warn("Error during tracking cleanup:", error);
        }
      };
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      try {
        const parent = navigation.getParent?.();
        if (parent && parent.setOptions) {
          parent.setOptions({ tabBarStyle: { display: "none" } });
        }
      } catch (error) {
        console.error("tabbarError heartratescreenFocus:", error);
      }
      return () => {};
    }, [navigation])
  );
  useEffect(() => {
    if (stable && averageSound && averageMagnitude && averageMotion) {
      //console.log("Saving values to analysisContext...");
      setSound(averageSound);
      setMagnitude(averageMagnitude);
      setMotion(averageMotion);
    }
  }, [stable, averageSound, averageMagnitude, averageMotion]);

  // Callback when a stable heart rate reading is detected
  const handleStableReading = (metricsBack) => {
    stopMotionTracking();
    stopEnvironmentTracking();
    setStablized(true);
    //mct   goToNextScreen();
  };
  useEffect(() => {
    if (motionEval && motionEval.label) {
      // setTimeout(() => {
      //  setMotionLabel(motionEval.label);
      debounceLabel({
        newLabel: motionEval.label,
        lastLabelRef: lastMotionLabelRef,
        lastSetTimestampRef: lastSetTimestampRef,
        timeoutRef: debounceMotionTimeout,
        setter: setMotionLabel,
      });
      // }, 100);
    }
  }, [motionEval]);
  useEffect(() => {
    if (
      environment &&
      environment.overall &&
      environment.magnetometer &&
      environment.sound
    ) {
      //        setSoundLabel(environment.sound.label);
      // setTimeout(() => {
      debounceLabel({
        newLabel: environment.sound.label,
        lastLabelRef: lastSoundLabelRef,
        lastSetTimestampRef: lastSetTimestampRef,
        timeoutRef: debounceSoundTimeout,
        setter: setSoundLabel,
      });
      // }, 50);
      //   setMagLabel(environment.magnetometer.label);
      debounceLabel({
        newLabel: environment.magnetometer.label,
        lastLabelRef: lastMagLabelRef,
        lastSetTimestampRef: lastSetTimestampRef,
        timeoutRef: debounceMagTimeout,
        setter: setMagLabel,
      });
      //  }, 10);
      setCombinedCalm(environment.overall.score);
      setSpaceLabel(environment.overall.label); // can debounce this too if needed
    }
  }, [environment]);

  useEffect(() => {
    if (averageMagnitude && averageSound) {
      // //console.log("environment in meditation screen:", environment);
      setAvgSound(averageSound);
      setAvgMag(averageMagnitude);
    }
  }, [averageMagnitude, averageSound]);

  useEffect(() => {
    if (averageMotion) {
      // //console.log("environment in meditation screen:", environment);
      setAvgMotion(averageMotion);
    }
  }, [averageMotion]);

  const goToNextScreen = () => {
    if (currentIndex < VIBE_CHECK_SCREENS.length - 1) {
      const nextScreen = VIBE_CHECK_SCREENS[currentIndex + 1];
      console.log("next screen: ", nextScreen);
      navigation.navigate(nextScreen);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      navigation.goBack();
    }
  };

  return (
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <View style={{ flex: 1, width: "100%", position: "relative" }}>
        {/* FloatingPhrase - Top Left */}
        {/* <View
          style={{
            position: "absolute",
            top: height * 0.2,
            left: "25%",
            zIndex: 10,
          }}
        >
          {soundLabel && <FloatingPhrase label={soundLabel} delay={0} />}
        </View> */}

        {/* Camera centered */}
        <View
          style={{
            position: "absolute",
            top: height * 0.1,
            left: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
          }}
        >
          {!stable && <HeartRateCamera onStableReading={handleStableReading} />}
        </View>
        {/* FloatingPhrase - bottom Right */}
        <View
          style={{
            position: "absolute",
            bottom: height * 0.25,
            right: "15%",
            zIndex: 10,
          }}
        >
          {/* {motionLabel && <FloatingPhrase label={motionLabel} delay={200} />} */}
        </View>

        {/* FloatingPhrase - Bottom Center */}
        <View
          style={{
            position: "absolute",
            bottom: height * 0.1,
            left: 0,
            right: 0,
            alignItems: "center",
            zIndex: 10,
          }}
        >
          {/* {magLabel && <FloatingPhrase label={magLabel} delay={400} />} */}
        </View>
      </View>
      {stable && (
        <View
          style={{
            position: "absolute",
            bottom: 50,
            marginLeft: "5%",
            marginRight: "5%",
            left: 0,
            right: 0,
            width: "90%",
          }}
        >
          <CustomSpiritualButton
            label="Finish"
            onPress={goToNextScreen}
            color={Colors.vcButtonColor}
            textColor={Colors.vcButtonTextColor}
          />
        </View>
      )}
    </GradientBackground>
  );
}

import { EnvironmentProvider, MotionProvider } from "@context";

export default function HeartRateScreen() {
  return (
    <EnvironmentProvider>
      <MotionProvider>
        <HeartRateScreenInner />
      </MotionProvider>
    </EnvironmentProvider>
  );
}
