// BreathWorksScreenStyles.js
import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  middle: {
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: Colors.textDark,
    fontFamily: Fonts.body,
  },
  bottomText: {
    position: "absolute",
    bottom: 100,
  },
  description: {
    fontSize: 24,
    fontFamily: Fonts.body,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
