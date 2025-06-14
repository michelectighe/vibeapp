import React from "react";
import { View, StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { FuzzyTop } from "./FuzzyTop"; // assuming this is a glow element
import { Colors } from "@/constants";

export const ResultsBackground = ({ children, glowColor }) => {
  return (
    <View style={styles.container}>
      {/* Top-right glow */}
      <View style={[styles.fuzzy, styles.topRight]}>
        <FuzzyTop glowSize={SCREEN_WIDTH * 2} glowColor={glowColor} />
      </View>

      {/* Bottom-left glow */}
      <View style={[styles.fuzzy, styles.bottomLeft]}>
        <FuzzyTop glowSize={SCREEN_WIDTH * 2} glowColor={glowColor} />
      </View>

      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: "relative",
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  fuzzy: {
    position: "absolute",
    zIndex: 0,
  },
  topRight: {
    top: 100,
    right: 100,
  },
  bottomLeft: {
    bottom: 100,
    left: 100,
    zIndex: -1,
    transform: [{ rotate: "180deg" }],
  },
});
