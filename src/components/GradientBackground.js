import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { AnimatedLogoSmall } from "./AnimatedLogoSmall";
import { FloatingFeather } from "./FloatingFeather";
import { globalStyles } from "@/styles";
import { Colors } from "@/constants";

export const GradientBackground = ({ children, colors, logo = false }) => {
  const gradientColors = colors || [Colors.white, Colors.white, Colors.white];

  return (
    <View style={globalStyles.container}>
      <LinearGradient
      colors={['#355c4d', '#295c50', '#4e4938']}
     //   colors={colors} // tweak these as needed
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={{ flex: 1 }}
      >

        <View style={styles.content}>{children}</View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: "100%",
  },
  content: {
    flex: 1,
    width: "100%",
  },
});
