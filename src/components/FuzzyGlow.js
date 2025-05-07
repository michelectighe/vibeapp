import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Svg, Defs, RadialGradient, Stop, Circle } from "react-native-svg";

export const FuzzyGlow = ({ glowSize, glowColor, pulse = true }) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (pulse) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      );
      pulseAnimation.start();

      return () => pulseAnimation.stop();
    }
  }, [pulse]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -glowSize / 2 }, { translateY: -glowSize / 2 }, { scale }],
        width: glowSize,
        height: glowSize,
      }}
    >
      <Svg height="100%" width="100%">
        <Defs>
          <RadialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={glowColor} stopOpacity="1" />
            <Stop offset="40%" stopColor={glowColor} stopOpacity="0.6" />
            <Stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Circle cx="50%" cy="50%" r="50%" fill="url(#glowGradient)" />
      </Svg>
    </Animated.View>
  );
};
