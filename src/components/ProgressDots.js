import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants";

export const ProgressDots = ({ currentIndex, totalScreens }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalScreens }).map((_, index) => (
        <View
          key={index}
          style={[styles.dot, currentIndex === index ? styles.activeDot : styles.inactiveDot]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
 //   marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "yellow",
    transform: [{ scale: 1.2 }],
  },
  inactiveDot: {
    backgroundColor: Colors.lightGray,
  },
});
