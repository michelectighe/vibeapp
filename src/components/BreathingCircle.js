import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "@constants";

const { width } = Dimensions.get("window");

export const BreathingCircle = ({ pattern }) => {
  const [phase, setPhase] = useState("Inhale");
  const phaseRef = useRef("Inhale");

  const [counter, setCounter] = useState(pattern.inhale);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const startPhase = (nextPhase, duration, scaleTo) => {
    setPhase(nextPhase);
    phaseRef.current = nextPhase;

    setCounter(1);
    if (nextPhase === "Inhale" || nextPhase === "Exhale") {
      Animated.timing(scaleAnim, {
        toValue: scaleTo,
        duration: duration * 1000,
        useNativeDriver: true,
      }).start();
    }
    let t = 1;
    setCounter(t);

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
        startPhase("Hold", pattern.hold1, 1.2);
        break;
      case "Hold":
        startPhase("Exhale", pattern.exhale, 1);
        break;
      case "Exhale":
        if (pattern.hold2 > 0) {
          startPhase("Hold After Exhale", pattern.hold2, 1);
        } else {
          startPhase("Inhale", pattern.inhale, 1.5);
        }
        break;
      case "Hold After Exhale":
        startPhase("Inhale", pattern.inhale, 1.5);
        break;
      default:
        startPhase("Inhale", pattern.inhale, 1.5);
    }
  };

  useEffect(() => {
    startPhase("Inhale", pattern.inhale, 1.5);
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.circleWrapper}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        />
        <Text style={styles.counterInside}>{counter}</Text>
      </View>

      <Text style={styles.phase}>
        {phase.includes("Hold") ? "Hold" : phase}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  circle: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: Colors.vcButtonColor,
    marginBottom: 40,
  },
  phase: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    color: Colors.vcTextColor,
  },
  counter: {
    fontSize: 48,
    fontWeight: "300",
  },
  circleWrapper: {
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
    color: Colors.vcButtonTextColor, // or a color that contrasts with the circle
  },
});


