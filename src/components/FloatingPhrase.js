// --- FloatingPhrase.js ---

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import { Fonts, Colors } from "@constants";

const FloatingPhrase = ({ label, delay = 0 }) => {
  const [displayedLabel, setDisplayedLabel] = useState(label);
  const lastLabelRef = useRef(label);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const randomXOffset = useMemo(() => Math.random() * 20 - 10, []); // between -10 and +10
  const randomYOffset = useMemo(() => Math.random() * 10 - 5, []); // subtle vertical offset

  const animationInterval = useRef(null);

  const startAnimation = () => {
    opacity.setValue(0);
    translateX.setValue(0);
    translateY.setValue(0);
    rotate.setValue(0);

    // Continuous sway
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(rotate, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: 10,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(rotate, {
            toValue: -1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: -30,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -20,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }).start();
      }, 1500);
    });
  };

  useEffect(() => {
    if (label !== lastLabelRef.current) {
      lastLabelRef.current = label;
      setDisplayedLabel(label);
      startAnimation();
    }
  }, [label]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      startAnimation();
      animationInterval.current = setInterval(() => {
        startAnimation();
      }, 8000);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(animationInterval.current);
    };
  }, []);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-10deg", "0deg", "10deg"],
  });

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: Animated.add(
              translateY,
              new Animated.Value(randomYOffset)
            ),
          },
          {
            translateX: Animated.add(
              translateX,
              new Animated.Value(randomXOffset)
            ),
          },
          { rotate: rotateInterpolate },
        ],
      }}
    >
      <Text style={styles.floatingText}>{displayedLabel}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  floatingText: {
    fontSize: 36,
    fontStyle: "italic",
    color: "#935116",
    textShadowColor: "#fff2e0",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
 //   fontFamily: Fonts.Script,
  },
});

export default React.memo(FloatingPhrase, (prev, next) => {
  return prev.label === next.label;
});
