import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Svg, Defs, RadialGradient, Stop, Rect } from "react-native-svg";

export const FuzzyRectangleGlow = ({
  width,
  height,
  glowColor,
  pulse = true,
  style,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (pulse) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    }
  }, [pulse]);

  const padding = 200; // Extra space around the glow

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: width + padding,
          height: height + padding,
          transform: [{ scale }],
        },
        style,
      ]}
    >
      <Svg height="100%" width="100%">
        <Defs>
          <RadialGradient id="glowGradient" cx="50%" cy="50%" r="60%">
            <Stop offset="0%" stopColor={glowColor} stopOpacity="0.4" />
            <Stop offset="50%" stopColor={glowColor} stopOpacity="0.2" />
            <Stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx={width / 4}
          fill="url(#glowGradient)"
        />
      </Svg>
    </Animated.View>
  );
};
