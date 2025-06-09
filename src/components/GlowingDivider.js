// components/GlowingAnimatedDivider.js
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const GlowingDivider = ({
  width = 60,
  height = 4,
  glowColor = "#ffffff",
  glowIntensity = 0.6,
}) => {
  const glowOpacity = useSharedValue(glowIntensity);

  useEffect(() => {
    glowOpacity.value = withRepeat(withTiming(1, { duration: 1500 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <AnimatedLinearGradient
      colors={[`${glowColor}00`, `${glowColor}aa`, `${glowColor}00`]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={[styles.divider, animatedStyle, { width, height, shadowColor: glowColor }]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    borderRadius: 8,
    marginVertical: 8,
    alignSelf: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
});
