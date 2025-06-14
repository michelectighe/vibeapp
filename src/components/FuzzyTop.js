import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Svg, Defs, RadialGradient, Stop, Circle , Rect} from "react-native-svg";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "@/utils";

export const FuzzyTop = ({ glowSize, glowColor, pulse = false, externalScale }) => {
  const internalScale = useRef(new Animated.Value(1)).current;
  const BASE_GLOW_CONTAINER_SIZE = SCREEN_WIDTH / 6;

  useEffect(() => {
    if (pulse && !externalScale) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(internalScale, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(internalScale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      );
      pulseAnimation.start();

      return () => pulseAnimation.stop();
    }
  }, [pulse, externalScale]); // eslint-disable-line react-hooks/exhaustive-deps

  const scaleToUse = externalScale ?? internalScale;

  return (
    <Animated.View
      style={{
        width: BASE_GLOW_CONTAINER_SIZE,
        height: BASE_GLOW_CONTAINER_SIZE,
        justifyContent: "center",
        alignItems: "center",
        transform: [
          {
            scale: Animated.multiply(scaleToUse, glowSize / BASE_GLOW_CONTAINER_SIZE),
          },
        ],
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
        <Rect x="0" y="0" width={SCREEN_WIDTH*.5} height="90%" fill="url(#glowGradient)" rx="0" ry="0" />
      </Svg>
    </Animated.View>
  );
};

