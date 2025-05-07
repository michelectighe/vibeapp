import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text } from "react-native";
import { HeartRateCamera } from "@features/heartRate/HeartRateCamera";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAnalysis, useMotion, useEnvironment } from "@context";
import { GradientBackground, SectionLayout } from "@components";
import { debounceLabel } from "@utils";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { EnvironmentProvider, MotionProvider } from "@context";
import { styles } from "./HeartRateScreen.styles";

function HeartRateScreenInner() {
  const { setSound, setMagnitude, setMotion } = useAnalysis();
  const { averageMotion, motionEval, stopMotionTracking } = useMotion();
  const { environment, averageSound, averageMagnitude, stopEnvironmentTracking } = useEnvironment();

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
        console.log("leaving heartrate");
        stopMotionTracking();
        stopEnvironmentTracking();
      };
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  );

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent?.();
      parent?.setOptions({ tabBarStyle: { display: "none" } });
      return () => {
        console.log("leaving secons focus effect");
      };
    }, [navigation]),
  );

  useEffect(() => {
    if (stable && averageSound && averageMagnitude && averageMotion) {
      setSound(averageSound);
      setMagnitude(averageMagnitude);
      setMotion(averageMotion);
    }
  }, [stable, averageSound, averageMagnitude, averageMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStableReading = () => {
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

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}>
      <SectionLayout
        topFlex={1}
        middleFlex={3}
        bottomFlex={3}
        topContent={<View />}
        middleContent={
          <View style={styles.cameraContainer}>
            <HeartRateCamera onStableReading={handleStableReading} />
          </View>
        }
        bottomContent={
          <View style={styles.infoContainer}>
            <Text style={styles.labelTitle}>What else is being measured?</Text>
            <Text style={styles.label}>Backgroung Sound</Text>
            <Text style={styles.labelResult}>{soundLabel}</Text>
            <Text style={styles.label}>Surrounding Magnetic Field</Text>
            <Text style={styles.labelResult}>{magLabel}</Text>
            <Text style={styles.label}>Your Motion</Text>
            <Text style={styles.labelResult}>{motionLabel}</Text>
            <Text style={styles.label}>Overall location Vibration</Text>
            <Text style={styles.labelResult}>{spaceLabel}</Text>
          </View>
        }
      />
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
