import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "@constants";
import { FuzzyGlow } from "./FuzzyGlow";

const { width } = Dimensions.get("window");

export const BreathingCircle = ({
  pattern,
  fuzzyColor = "white",
  textColor = Colors.buttonText,
}) => {
  const [phase, setPhase] = useState("Inhale");
  const phaseRef = useRef("Inhale");
  const [counter, setCounter] = useState(pattern.inhale);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const phaseColors = {
    Inhale: fuzzyColor,
    Exhale: fuzzyColor,
    Hold: fuzzyColor,
    "Hold After Exhale": fuzzyColor,
  };

  const animatePhaseLabel = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const startPhase = (nextPhase, duration, scaleTo) => {
    setPhase(nextPhase);
    phaseRef.current = nextPhase;
    animatePhaseLabel();

    setCounter(1);

    if (nextPhase === "Inhale" || nextPhase === "Exhale") {
      Animated.timing(scaleAnim, {
        toValue: scaleTo,
        duration: duration * 1000,
        useNativeDriver: true,
      }).start();
    }

    let t = 1;
    const interval = setInterval(() => {
      t++;
      setCounter(t);
      if (t > duration) {
        clearInterval(interval);
        next();
      }
    }, 1000);
  };

  const next = () => {
    switch (phaseRef.current) {
      case "Inhale":
        startPhase("Hold", pattern.hold1, 1.1);
        break;
      case "Hold":
        startPhase("Exhale", pattern.exhale, 1.0);
        break;
      case "Exhale":
        if (pattern.hold2 > 0) {
          startPhase("Hold After Exhale", pattern.hold2, 1);
        } else {
          startPhase("Inhale", pattern.inhale, 2);
        }
        break;
      case "Hold After Exhale":
        startPhase("Inhale", pattern.inhale, 2);
        break;
      default:
        startPhase("Inhale", pattern.inhale, 2);
    }
  };

  useEffect(() => {
    startPhase("Inhale", pattern.inhale, 2);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const glowColor = phaseColors[phase] || Colors.white;

  return (
    <View style={styles.wrapper}>
      <View style={styles.circleWrapper}>
        <FuzzyGlow
          glowColor={glowColor}
          glowSize={width * 0.5}
          pulse={false}
          externalScale={scaleAnim}
        />
        {counter !== 0 && (
          <Text style={[styles.counterInside, { color: Colors.white }]}>{counter}</Text>
        )}
      </View>

      <Animated.Text
        style={[
          styles.phase,
          {
            color: fuzzyColor,
            opacity: fadeAnim,
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.95, 1],
                }),
              },
            ],
          },
        ]}
      >
        {phase.includes("Hold") ? "Hold" : phase}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  phase: {
    fontSize: 36,
    marginTop: 50,
    marginBottom: 20,
    fontFamily: Fonts.body,
  },
  circleWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 40,
    width: width * 0.5,
    height: width * 0.5,
  },
  counterInside: {
    position: "absolute",
    top: 50,
    bottom: 0,
    fontSize: 48,
    fontWeight: "300",
  },
});
