import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { AnimatedLogoSmall } from "./AnimatedLogoSmall";
import { FloatingFeather } from "./FloatingFeather";
import { globalStyles } from "@/styles";
import { Colors } from "@/constants";
import LottieView from "lottie-react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";

export const GradientBackground = ({ children, colors, logo = false }) => {
 // const gradientColors = colors || [Colors.white, Colors.white, Colors.white];

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
        colors={colors} // tweak these as needed
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <View style={styles.content}>{children}</View>
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
    width: "100%",
  },
  content: {
    flex: 1,
    width: "100%",
  },
    backgroundAnimation: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  //  zIndex: -1,
    opacity: .5,
  },
});
