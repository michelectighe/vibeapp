import React, { useState, useEffect, useRef, useCallback } from "react";
import { View } from "react-native";
import { HeartRateCamera } from "@features/heartRate/HeartRateCamera";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useAnalysis, useMotion, useEnvironment } from "@context";
import { GradientBackground, CustomSpiritualButton } from "@components";
import { VIBE_CHECK_SCREENS } from "@navigation";
import { debounceLabel } from "@utils";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { EnvironmentProvider, MotionProvider } from "@context";
import { styles } from "./HeartRateScreen.styles";

function HeartRateScreenInner() {
  const route = useRoute();
  const currentIndex = VIBE_CHECK_SCREENS.indexOf(route.name);
  const { setHeartRate, setSound, setMagnitude, setMotion } = useAnalysis();
  const { averageMotion, motionEval, stopMotionTracking } = useMotion();
  const {
    environment,
    averageSound,
    averageMagnitude,
    stopEnvironmentTracking,
  } = useEnvironment();
  const [stable, setStablized] = useState(false);
  const [spaceLabel, setSpaceLabel] = useState("Neutral");
  const [magLabel, setMagLabel] = useState("");
  const [soundLabel, setSoundLabel] = useState("");
  const [motionLabel, setMotionLabel] = useState("");

  const navigation = useNavigation();
  const lastSoundLabelRef = useRef(null);
  const lastMagLabelRef = useRef(null);
  const lastMotionLabelRef = useRef(null);
  const lastSetTimestampRef = useRef(null);
  const debounceSoundTimeout = useRef(null);
  const debounceMagTimeout = useRef(null);
  const debounceMotionTimeout = useRef(null);

  useFocusEffect(
    useCallback(() => {
      setStablized(false);
      return () => {
        stopMotionTracking();
        stopEnvironmentTracking();
      };
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent?.();
      parent?.setOptions({ tabBarStyle: { display: "none" } });
    }, [navigation])
  );

  useEffect(() => {
    if (stable && averageSound && averageMagnitude && averageMotion) {
      setSound(averageSound);
      setMagnitude(averageMagnitude);
      setMotion(averageMotion);
    }
  }, [stable, averageSound, averageMagnitude, averageMotion]);

  const handleStableReading = (metricsBack) => {
    stopMotionTracking();
    stopEnvironmentTracking();
    setStablized(true);
  };

  useEffect(() => {
    if (motionEval?.label) {
      debounceLabel({
        newLabel: motionEval.label,
        lastLabelRef: lastMotionLabelRef,
        lastSetTimestampRef,
        timeoutRef: debounceMotionTimeout,
        setter: setMotionLabel,
      });
    }
  }, [motionEval]);

  useEffect(() => {
    if (environment?.overall && environment.magnetometer && environment.sound) {
      debounceLabel({
        newLabel: environment.sound.label,
        lastLabelRef: lastSoundLabelRef,
        lastSetTimestampRef,
        timeoutRef: debounceSoundTimeout,
        setter: setSoundLabel,
      });
      debounceLabel({
        newLabel: environment.magnetometer.label,
        lastLabelRef: lastMagLabelRef,
        lastSetTimestampRef,
        timeoutRef: debounceMagTimeout,
        setter: setMagLabel,
      });
      setSpaceLabel(environment.overall.label);
    }
  }, [environment]);

  const goToNextScreen = () => {
    if (currentIndex < VIBE_CHECK_SCREENS.length - 1) {
      navigation.navigate(VIBE_CHECK_SCREENS[currentIndex + 1]);
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
      <View style={styles.absoluteFull}>
        <View style={styles.cameraWrapper}>
          {!stable && <HeartRateCamera onStableReading={handleStableReading} />}
        </View>
        {/* Add FloatingPhrase views here if needed */}
      </View>
      {stable && (
        <View style={styles.finishButtonWrapper}>
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

export const HeartRateScreen = () => {
  useAmbientControlForScreen(false);
  return (
    <EnvironmentProvider>
      <MotionProvider>
        <HeartRateScreenInner />
      </MotionProvider>
    </EnvironmentProvider>
  );
};
