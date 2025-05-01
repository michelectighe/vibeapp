import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { GradientBackground } from "@components";
import { Colors, Fonts } from "@constants";

export default function ThemeWrapper({ children }) {
  return (
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <View style={styles.content}>{children}</View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1, // Ensures child screens render correctly
  },
});
