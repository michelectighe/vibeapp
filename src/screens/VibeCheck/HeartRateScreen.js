import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, Animated } from "react-native";
import { HeartRateCamera } from "@features/heartRate/HeartRateCamera";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAnalysis, useMotion, useEnvironment } from "@context";
import { GradientBackground, SectionLayout, CustomSpiritualButton } from "@components";
import { debounceLabel } from "@utils";
import { Colors } from "@constants";
import { useAmbientControlForScreen ,useVibeCheckNavigation} from "@hooks";
import { EnvironmentProvider, MotionProvider } from "@context";
import { styles } from "./HeartRateScreen.styles";
import { hexToRgba } from "@/utils";

function HeartRateScreenInner() {
  const { goToNextScreen } = useVibeCheckNavigation();
  const { setSound, setMagnitude, setMotion, setEnvironment } = useAnalysis();
  const { motionEval, stopMotionTracking, isFidgeting, sessionStdDev } = useMotion();
  const {
    environment,
    vibeList,
    soundLabels,
    averageSound,
    averageMagnitude,
    averageEnvironment,
    stopEnvironmentTracking,
  } = useEnvironment();
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const [stable, setStablized] = useState(false);
  const [spaceLabel, setSpaceLabel] = useState("Neutral");
  const [magLabel, setMagLabel] = useState("");
  const [magValue, setMagValue] = useState();
  const [soundLabel, setSoundLabel] = useState("");
  const [soundValue, setSoundValue] = useState();
  const [vibeListCat, setVibeListCat] = useState("");
  const [topSoundLabels, setTopSoundLabels] = useState("");
  const [motionLabel, setMotionLabel] = useState("");

  const navigation = useNavigation();
  const lastSoundLabelRef = useRef(null);
  const lastMagLabelRef = useRef(null);
  const lastMotionLabelRef = useRef(null);
  const lastSetTimestampRef = useRef(null);
  const debounceSoundTimeout = useRef(null);
  const debounceMagTimeout = useRef(null);
  const debounceMotionTimeout = useRef(null);
  const successCardOpacity = useRef(new Animated.Value(0)).current;
  const detailsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(async () => {
      Animated.timing(detailsOpacity, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }).start();
    }, 1600);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setStablized(false);
      return () => {
        stopMotionTracking();
        stopEnvironmentTracking();
      };
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  );

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent?.();
      parent?.setOptions({ tabBarStyle: { display: "none" } });
      return () => {};
    }, [navigation]),
  );

  useEffect(() => {
    if (stable) {
      if (averageMagnitude) setMagnitude(averageMagnitude);
      else setMagnitude("skipped");
      if (averageEnvironment) setEnvironment(averageEnvironment);
      else setEnvironment("skipped");
      if (averageSound) setSound(averageSound);
      else setSound("skipped");
      if (sessionStdDev) setMotion(sessionStdDev);
      else setMotion("skipped");
    }
  }, [stable, averageSound, averageMagnitude, sessionStdDev, averageEnvironment]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStableReading = () => {
    stopMotionTracking();
    stopEnvironmentTracking();
    setStablized(true);
    Animated.timing(successCardOpacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
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

      setVibeListCat(vibeList);
      setTopSoundLabels(soundLabels);
      setSoundValue(environment.sound.value);
      setMagValue(environment.magnetometer.value);
      setSpaceLabel(environment.overall.label);
    }
  }, [environment]);

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <SectionLayout
        topFlex={3}
        middleFlex={0.5}
        bottomFlex={4}
        topContent={
          <>
            {!stable && (
              <View style={styles.cameraContainer}>
                <HeartRateCamera onStableReading={handleStableReading} />
              </View>
            )}
            {stable && (
              <Animated.View style={[styles.finishButtonWrapper, { opacity: successCardOpacity }]}>
                <View style={styles.successCard}>
                  <Text style={styles.successTitle}>✔️ Vibe Check Complete</Text>
                  <Text style={styles.successSubtitle}>
                    We’ve gathered everything we need. Ready to see your results?
                  </Text>
                  <CustomSpiritualButton
                    label="Reveal My Frequency"
                    onPress={goToNextScreen}
                    color={hexToRgba(Colors.buttonBackground)}
                    textColor={Colors.buttonText}
                  />
                </View>
              </Animated.View>
            )}
          </>
        }
        bottomContent={
          vibeListCat &&
          environment && (
            <Animated.View style={[styles.infoContainer, { opacity: detailsOpacity }]}>
              <Text style={styles.labelTitle}>What else is being measured?</Text>
              <View style={styles.sideBySide}>
                <View style={styles.leftColumn}>
                  <View style={styles.largeCard}>
                    <Text style={styles.iconLabel}>🎧 Background Sound</Text>
                    <Text style={[styles.iconValue, { height: "15%" }]}>
                      {""}
                      {soundLabel}
                    </Text>
                    <View style={styles.divider} />
                    <Text style={[styles.iconValue, { opacity: 0.75 }]}>Detected Tones</Text>
                    {topSoundLabels.map((label, i) => (
                      <Text key={i} style={[styles.iconSubValue, {}]}>
                        {""}
                        {label}
                      </Text>
                    ))}
                  </View>
                </View>

                <View style={styles.rightColumn}>
                  <View style={[styles.iconItem, { height: "38%" }]}>
                    <Text style={styles.iconLabel}>📡 Magnetic Field</Text>
                    <Text style={styles.iconValue}>
                      {""}
                      {magLabel}
                    </Text>
                    <Text style={styles.iconSubValue}>
                      {""}
                      {magValue.toFixed(1)} µT
                    </Text>
                  </View>
                  <View style={[styles.iconItem, { height: "45.5%" }]}>
                    <Text style={styles.iconLabel}>🧘 Your Motion</Text>
                    <Text style={styles.iconValue} numberOfLines={2}>
                      {""}
                      {motionLabel}
                    </Text>
                    {isFidgeting && <Text style={styles.shaky}>shaky</Text>}
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.iconItem,
                  { flexDirection: "row", gap: 11, height: "13%", marginTop: "-9%" },
                ]}
              >
                <Text style={[styles.iconLabel, { marginTop: 0, marginBottom: 1 }]}>📍 Location Vibe</Text>
                <Text style={styles.iconValue} numberOfLines={2}>
                  {""} {spaceLabel}
                </Text>
              </View>
            </Animated.View>
          )
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

