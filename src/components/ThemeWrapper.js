import React, {} from "react";
import { View, StyleSheet } from "react-native";
import { GradientBackground } from "./GradientBackground";
import { Colors, Fonts } from "@constants";

export const ThemeWrapper = ({ children }) => {
  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}>
      <View style={styles.content}>{children}</View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1, // Ensures child screens render correctly
  },
});
