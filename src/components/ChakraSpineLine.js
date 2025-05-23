// components/ChakraSpineLine.js
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { Colors } from "@/constants";

const chakraColors = [
  // Colors.rootChakra,
  // Colors.sacralChakra,
  // Colors.solarPlexusChakra,
  // Colors.heartChakra,
  // Colors.throatChakra,
  // Colors.thirdEyeChakra,
  // Colors.crownChakra,
  "#FF3E3E", // Root
  "#FF8C00", // Sacral
  "#FFD700", // Solar Plexus
  "#00FF7F", // Heart
  "#1E90FF", // Throat
  "#8A2BE2", // Third Eye
  "#DA70D6", // Crown
];

export const ChakraSpineLine = () => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: false,
      }),
    ).start();
  }, [animation]);


  const swirlOffset = (base, i) =>
    animation.interpolate({
      inputRange: [0, 1],
      outputRange: [(base + i * 0.1) % 1, (base + i * 0.1 + 0.2) % 1],
    });

  return (
    <Svg
      height={SCREEN_HEIGHT}
      width={SCREEN_WIDTH}
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    >
      <Defs>
        <LinearGradient id="swirlingGradient" x1="0" y1="0" x2="0" y2="1">
          {chakraColors.map((color, index) => (
            <Stop key={index} offset={swirlOffset(0, index)} stopColor={color} stopOpacity={0.8} />
          ))}
        </LinearGradient>
      </Defs>

      {/* Chakra color spine */}
      <Rect
        x={SCREEN_WIDTH / 2 - 2}
        y="0"
        width="4"
        height={SCREEN_HEIGHT}
        fill="url(#swirlingGradient)"
        opacity={0.5}
      />

    </Svg>
  );
};
