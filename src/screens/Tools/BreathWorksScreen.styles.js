// BreathWorksScreenStyles.js
import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 30,
  },
  patternTitle: {
    fontSize: 26,
    fontWeight: "600",
    fontFamily: Fonts.body,
    marginBottom: 10,
  },
  timerLabel: { 
    marginBottom: 20, 
  },

  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 4,
  },

  description: {
    fontSize: 16,
    fontFamily: Fonts.body,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 12,
  },

  phaseText: {
    fontSize: 32,
    fontFamily: Fonts.body,
    color: Colors.white,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  timer: {
    fontSize: 48,
    fontWeight: "300",
    color: Colors.white,
    textAlign: "center",
    marginTop: 8,
  },

  scrollContainer: {
    flexGrow: 0,
    width: SCREEN_WIDTH,
  },

  // Optional horizontal card styling override
  selectorContainer: {
    height: SCREEN_HEIGHT * 0.2,
    paddingBottom: 10,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
