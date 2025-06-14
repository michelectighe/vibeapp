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
    fontFamily: Fonts.body,
  },
  bottomText: {
    position: "absolute",
    bottom: 150,
  },
  description: {
    fontSize: 18,
    fontFamily: Fonts.body,
  },
  timing: {
    fontSize: 18,
    fontFamily: Fonts.body,
    marginTop: 10,
  }
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
