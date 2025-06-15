// components/AnimatedDivider.js
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export const AnimatedDivider = ({
  width = 200,
  height = 4,
  color = "#ffffff",
  glowIntensity = 0.6,
}) => {
  const glowOpacity = useSharedValue(glowIntensity);

  useEffect(() => {
    glowOpacity.value = withRepeat(withTiming(1, { duration: 1500 }), -1, true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <Animated.View
      style={[styles.divider, { width, height, backgroundColor: color }, animatedStyle]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    borderRadius: 8,
    marginVertical: 8,
    alignSelf: "center",
  },
});
