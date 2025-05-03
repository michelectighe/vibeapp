import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

export const AnimatedLabel = ({ label = "" }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      delay: 500, // add a small delay for dramatic effect
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: 0,
      duration: 1200,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.Text
      style={{
        position: "absolute",
        top: "45%",
        width: "100%",
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        transform: [{ translateY }],
        opacity,
      }}
    >
      {label}
    </Animated.Text>
  );
};


