import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { Colors } from "@/constants";
import LottieView from "lottie-react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH, hexToRgba } from "@/utils";

export const GradientBackground = ({ children, colors, modal = false }) => {
  //console.log("gradientColors:", colors);
  if (!colors) {
    colors = [Colors.gradient1, Colors.gradient2, Colors.gradient3];
  }
  if (!modal) {
    colors = hexToRgba(colors, 0.8);
  }
  return (
    <View style={styles.container}>
      <LottieView
        source={require("@assets/lottie/wave.json")}
        autoPlay
        loop
        resizeMode="cover"
        style={styles.backgroundAnimation}
      />

      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  gradient: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  content: {
    //   flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  backgroundAnimation: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    top: 0,
    left: 0,
    //  zIndex: -1,
    opacity: 0.5,
  },
});
