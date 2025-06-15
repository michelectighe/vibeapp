// components/CardGradient.js
import React from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export const CardGradient = ({ children, style, colors = ["#e0e0e0", "#a0a0a0"] }) => {
  return (
    <LinearGradient
      colors={colors}
      style={[styles.cardContainer, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
  //  overflow: "hidden",
  },

});
