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


function HeartRateScreenInner() {
  const { goToNextScreen } = useVibeCheckNavigation();
  const { setSound, setMagnitude, setMotion, setEnvironment } = useAnalysis();
  const { averageMotion, motionEval, stopMotionTracking } = useMotion();
  const { environment, averageSound, averageMagnitude, averageEnvironment, stopEnvironmentTracking } = useEnvironment();
  const buttonOpacity = useRef(new Animated.Value(1)).current;
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
        //     //console.log("leaving heartrate");
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
        //       //console.log("leaving secons focus effect");
      };
    }, [navigation]),
  );

  useEffect(() => {
    //console.log('USE EFFECT ENV:', averageEnvironment)
    //console.log('averageSound:', averageSound);
    //console.log('averageMotion:', averageMotion);
    //console.log('averageMag:', averageMagnitude)
    if (stable && averageMagnitude && averageMotion && averageEnvironment) {
      setSound(averageSound);
      setMagnitude(averageMagnitude);
      setMotion(averageMotion);
      setEnvironment(averageEnvironment);
    }
  }, [stable, averageSound, averageMagnitude, averageMotion, averageEnvironment]); // eslint-disable-line react-hooks/exhaustive-deps

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
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <SectionLayout
        topFlex={1}
        middleFlex={4}
        bottomFlex={3}
        topContent={<View />}
        middleContent={
          <>
            {!stable && (
          <View style={styles.cameraContainer}>
            <HeartRateCamera onStableReading={handleStableReading} />
          </View>
            )}
            {stable && (

              <Animated.View style={[styles.finishButtonWrapper, { opacity: buttonOpacity }]}>
                <CustomSpiritualButton
                  label="Finish"
                  onPress={goToNextScreen}
                  color={Colors.buttonBackground}
                  textColor={Colors.textDark}
                />
              </Animated.View>

            )}
          </>
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
