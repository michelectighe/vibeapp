// MotivationalMirrorCard.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import LinearGradient from "react-native-linear-gradient";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH, hexToRgba } from "@/utils";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";


const MIRROR_HEIGHT = SCREEN_HEIGHT * .3;

// ...imports remain unchanged

export const MotivationMirrorScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice("front");
  const mirrorOpacity = useSharedValue(1);
  const isMirrored = useSharedValue(false);
  const rotation = useSharedValue(0); // from 0 to 180

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      if (status === "granted" || status === "authorized") {
        setHasPermission(true);
      }
    })();
  }, []);

  // useEffect(() => {
  //   const loopAnimation = () => {
  //     mirrorOpacity.value = withRepeat(
  //       withSequence(
  //         withTiming(0, { duration: 1000 }),
  //         withTiming(1, { duration: 1000 }, () => {
  //           isMirrored.value = !isMirrored.value;
  //         }),
  //       ),
  //       -1,
  //     );
  //   };

  //   loopAnimation();
  // }, []);
  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(withTiming(180, { duration: 2000 }), withTiming(0, { duration: 2000 })),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const rotateY = `${rotation.value}deg`;

    const opacity = interpolate(rotation.value, [0, 90, 180], [1, 0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return {
      transform: [{ rotateY }],
      opacity,
      backfaceVisibility: "visible", // prevents text from showing mirrored unintentionally
    };
  });

  if (!device || !hasPermission) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Loading mirror...</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.mirrorTextWrapper}>
          <Animated.Text style={[styles.animatedMirrorText, animatedStyle]}>Mirror</Animated.Text>
        </View>
        <View style={styles.mirrorWrapper}>
          {/* Glowing lighted border */}
          <LinearGradient colors={["#ffffff", "#ffd700", "#ffffff"]} style={styles.lightedBorder}>
            <View style={styles.mirrorContainer}>
              <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={false}
              />
              <LinearGradient
                colors={["rgba(255,255,255,0.05)", "rgba(0,0,0,0.2)"]}
                style={StyleSheet.absoluteFill}
              />
            </View>
          </LinearGradient>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_HEIGHT * 0.25,
    alignSelf: "center",
    backgroundColor: "transparent",
    marginBottom: 50,
    borderRadius: 30,
    padding: 10,
    justifyContent: "center",
  },
  cardGradient: {
    flex: 1,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
  },
  mirrorWrapper: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  lightedBorder: {
    width: SCREEN_WIDTH * 0.45,
    height: SCREEN_WIDTH * 0.45,
    borderRadius: SCREEN_WIDTH * 0.24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    shadowColor: "#ffd700",
    shadowOpacity: 0.9,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 0 },
    elevation: 25,
  },

  mirrorContainer: {
    width: SCREEN_WIDTH * 0.42,
    height: SCREEN_WIDTH * 0.42,
    borderRadius: SCREEN_WIDTH * 0.21,
    overflow: "hidden",
    backgroundColor: Colors.cardBackground,
  },

  placeholder: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: Colors.cardBackground,
    alignSelf: "center",
    marginVertical: 20,
  },
  placeholderText: {
    color: Colors.cardText,
    fontFamily: Fonts.body,
    fontSize: 16,
  },
  mirrorTextWrapper: {
    // position: "absolute",
    // top: 10,
    // left: 20,
    // right: 20,
    alignItems: "center",
    marginBottom: -20,
  },

  animatedMirrorText: {
    fontSize: 28,
    fontFamily: Fonts.journal,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#d0d0d0", // optional: override if SilverText styles are too complex to animate
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)", // soft white line, adjust for dark background
  //  marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 0.5,
  },
});
