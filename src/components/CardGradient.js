// components/CardGradient.js
import React from "react";
import { View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export const CardGradient = ({ children, style, colors = ["#e0e0e0", "#a0a0a0"] }) => {
  return (
    <LinearGradient
      colors={colors}
      style={[styles.cardContainer, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children} {/* Let content expand fully */}
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 18 }, // more vertical drop
    shadowOpacity: 0.3, // slightly darker
    shadowRadius: 26, // more blur = softer & higher
    elevation: 12, // for Android
    overflow: "hidden",
  },
  innerContent: {
    paddingVertical: 10,
  },
});
