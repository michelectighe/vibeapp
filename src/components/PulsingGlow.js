// PulsingGlow.js
import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export const PulsingGlow = ({ size = 40, color = "#7A5735" }) => {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withRepeat(withTiming(1.3, { duration: 1500 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: 0.3,
  }));

  return (
    <Animated.View
      style={[
        styles.glow,
        {
          width: size,
          height: size,
          borderColor: color,
          borderRadius: 16,
        },
        animatedStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  glow: {
    position: "absolute",
    borderWidth: 2,
    backgroundColor: "transparent",
    alignSelf: "center",
  },
});
