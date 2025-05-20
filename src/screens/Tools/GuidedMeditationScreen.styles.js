// GuidedMeditationScreenStyles.js
import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  card: {
    backgroundColor: Colors.cardBackground,
    width: SCREEN_WIDTH * 0.9,
    alignContent: "center",
    borderRadius: 16,
    padding: 30,
    marginVertical: 12,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  titleWrapper: {
    marginTop: "30%",
    marginBottom: 0,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 22,
    color: Colors.darkText,
    textAlign: "center",
    fontFamily: Fonts.body,
    backgroundColor: "transparent",
  },
  description: {
    fontSize: 16,
    color: Colors.darkText,
    textAlign: "center",
    marginBottom: 12,
    fontFamily: Fonts.body,
  },
  button: {
    backgroundColor: Colors.buttonBackground,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.lightText,
    fontSize: 18,
    fontWeight: "500",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
