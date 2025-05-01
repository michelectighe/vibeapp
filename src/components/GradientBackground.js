import React from "react";
import { View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FloatingFeather, AnimatedLogoSmall } from "@components";

const GradientBackground = ({ children, colors, logo = true }) => {
  const gradientColors = colors || ["#5E2B97", "#B18BD7", "#5E2B97"];

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradientColors} style={styles.gradient}>
        <FloatingFeather startX={0} delay={0} /> 
        <FloatingFeather startX={0.1} delay={1000} />
        <FloatingFeather startX={0.6} delay={2000} />
        <FloatingFeather startX={0.1} delay={3000} />
        <FloatingFeather startX={0.4} delay={4000} />
        <FloatingFeather startX={0.8} delay={5000} />
        {logo && <AnimatedLogoSmall />}


        <View style={styles.content}>{children}</View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: "100%",
    //    justifyContent: "center",
    alignItems: "stretch",
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "stretch",
  },
});

export default GradientBackground;
