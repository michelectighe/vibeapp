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
  top: {
    paddingTop: 60,
    // paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 50,
    marginTop: 20,
    textAlign: "center",
    color: Colors.mediumText,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
