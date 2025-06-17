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
    marginTop: 10,
  },
  timing: {
    fontSize: 18,
    fontFamily: Fonts.body,
    marginTop: 10,
  },
  timer: {
    fontSize: 48,
    fontWeight: "300",
    color: Colors.white,
    textAlign: "center",
    marginTop: 8,
  },
  timerLabel: {
    marginBottom: 20,
    textAlign: "center",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
