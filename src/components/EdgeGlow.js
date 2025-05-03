import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { Svg, Defs, RadialGradient, Stop, Rect } from "react-native-svg";

export const EdgeGlow = ({
  width = 250,
  height = 180,
  borderRadius = 20,
  glowColor = "#FFD700",
  pulse = true,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (pulse) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [pulse]);

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width,
        height,
        borderRadius,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <Animated.View
        style={{
          width: width,
          height: height,
          transform: [{ scale }],
        }}
      >
        <Svg width="100%" height="100%">
          <Defs>
            <RadialGradient id="edgeGlowGradient" cx="50%" cy="50%" r="80%">
              <Stop offset="0%" stopColor={glowColor} stopOpacity="0" />
              <Stop offset="70%" stopColor={glowColor} stopOpacity="0.15" />
              <Stop offset="100%" stopColor={glowColor} stopOpacity="0.4" />
            </RadialGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width={width}
            height={height}
            fill="url(#edgeGlowGradient)"
            rx={borderRadius}
            ry={borderRadius}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

