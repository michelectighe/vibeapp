// BreathWorksScreenStyles.js
import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },

  title: {
    fontSize: 24,
    textAlign: "center",
    color: Colors.darkText,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
