import React, { useMemo,useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";
import { SCREEN_WIDTH } from "@/utils";


const revealText = "Find out more...";

export const ResultsTapZone = ({
  onPress,
  glowColor = "#A3C9F1",
  label = "Tap to view full results",
}) => {
  // ✅ Declare shared values manually at the top level (no loops/hooks inside anything else)
  const c0 = useSharedValue(0); // F
  const c1 = useSharedValue(0); // i
  const c2 = useSharedValue(0); // n
  const c3 = useSharedValue(0); // d
  const c4 = useSharedValue(0); // [space]
  const c5 = useSharedValue(0); // o
  const c6 = useSharedValue(0); // u
  const c7 = useSharedValue(0); // t
  const c8 = useSharedValue(0); // [space]
  const c9 = useSharedValue(0); // m
  const c10 = useSharedValue(0); // o
  const c11 = useSharedValue(0); // r
  const c12 = useSharedValue(0); // e
  const c13= useSharedValue(0); // [space]
  const c14 = useSharedValue(0); // [space]
  const c15 = useSharedValue(0); // [space]

  const charOpacities = [c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12,c13, c14, c15];
  const a0 = useAnimatedStyle(() => ({ opacity: c0.value }));
  const a1 = useAnimatedStyle(() => ({ opacity: c1.value }));
  const a2 = useAnimatedStyle(() => ({ opacity: c2.value }));
  const a3 = useAnimatedStyle(() => ({ opacity: c3.value }));
  const a4 = useAnimatedStyle(() => ({ opacity: c4.value }));
  const a5 = useAnimatedStyle(() => ({ opacity: c5.value }));
  const a6 = useAnimatedStyle(() => ({ opacity: c6.value }));
  const a7 = useAnimatedStyle(() => ({ opacity: c7.value }));
  const a8 = useAnimatedStyle(() => ({ opacity: c8.value }));
  const a9 = useAnimatedStyle(() => ({ opacity: c9.value }));
  const a10 = useAnimatedStyle(() => ({ opacity: c10.value }));
  const a11 = useAnimatedStyle(() => ({ opacity: c11.value }));
  const a12 = useAnimatedStyle(() => ({ opacity: c12.value }));
  const a13 = useAnimatedStyle(() => ({ opacity: c13.value }));
  const a14 = useAnimatedStyle(() => ({ opacity: c14.value }));
  const a15 = useAnimatedStyle(() => ({ opacity: c15.value }));
  const animatedCharStyles = [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15];

  useEffect(() => {
    // Cleanup any ongoing animation on unmount
    return () => {
      charOpacities.forEach((sv) => cancelAnimation(sv));
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const animateLoop = async () => {
      while (mounted) {
        for (let i = 0; i < charOpacities.length; i++) {
          charOpacities[i].value = withTiming(1, {
            duration: 300,
            easing: Easing.out(Easing.ease),
          });
          await new Promise((res) => setTimeout(res, 100));
        }

        await new Promise((res) => setTimeout(res, 1000));

        for (let i = 0; i < charOpacities.length; i++) {
          charOpacities[i].value = withTiming(0, {
            duration: 1000,
          });
        }

        await new Promise((res) => setTimeout(res, 800));
      }
    };

    animateLoop();

    return () => {
      mounted = false;
    };
  }, []);


  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={{ flexDirection: "row", marginTop: 8 }}>
        {revealText.split("").map((char, i) => (
          <Animated.Text
            key={i}
            style={[styles.revealText, { color: glowColor }, animatedCharStyles[i]]}
          >
            {char}
          </Animated.Text>
        ))}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  baseCircle: {
    position: "absolute",
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    borderRadius: SCREEN_WIDTH * 0.125,
    opacity: 0.3,
  },
  pulseCircle: {
    position: "absolute",
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    borderRadius: SCREEN_WIDTH * 0.125,
    borderWidth: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    marginTop: SCREEN_WIDTH * 0.1,
  },
  revealText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
