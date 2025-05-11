import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Svg, Circle } from "react-native-svg";
import { Colors } from "@/constants";
export const SparkleOverlay = ({ width, height }) => {
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.9,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sparkleData = [
    { cx: 5, cy: 60, r: 2 },
    { cx: 80, cy: 0, r: 1.5 },
    { cx: 240, cy: 90, r: 2.5 },
    { cx: 200, cy: 20, r: 2 },
    { cx: 10, cy: 240, r: 1.8 },
  ];

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -width / 2 }, { translateY: -height / 2 }],
        width,
        height,
        opacity,
      }}
      pointerEvents="none"
    >
      <Svg width="100%" height="100%">
        {sparkleData.map((s, i) => (
          <Circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={Colors.white} opacity={0.8} />
        ))}
      </Svg>
    </Animated.View>
  );
};
