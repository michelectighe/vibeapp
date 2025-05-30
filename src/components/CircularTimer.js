import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Colors } from "@/constants";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularTimer = ({
  duration = 60000,
  size = 120,
  strokeWidth = 4,
  color = Colors.colorTimer,
  onComplete = () => {},
}) => {
  const progress = useRef(new Animated.Value(0)).current;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        onComplete(); // 🔥 Tell parent the timer finished
      }
    });
  }, [duration]); // eslint-disable-line react-hooks/exhaustive-deps

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circumference],
  });

  return (
    <Svg width={size} height={size} style={{ position: "absolute" }}>
      <Circle
        stroke={Colors.surface}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <AnimatedCircle
        stroke={color}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference}, ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        rotation="-90"
        originX={size / 2}
        originY={size / 2}
      />
    </Svg>
  );
};
