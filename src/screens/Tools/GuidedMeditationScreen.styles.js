// GuidedMeditationScreenStyles.js
import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  card: {
    backgroundColor: Colors.buttonLightBackground,
    width: SCREEN_WIDTH * 0.9,
    alignContent: "center",
    borderRadius: 16,
    padding: 30,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 0,
    color: Colors.lightText,
    textAlign: "center",
    fontFamily: Fonts.Script,
    backgroundColor: "transparent",
  },
  description: {
    fontSize: 16,
    color: Colors.lightText,
    textAlign: "center",
    marginBottom: 12,
    fontFamily: Fonts.Script,
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
  titleWrapper: {
    marginTop: 0,
    marginBottom: 0,
    alignItems: "center",
    backgroundColor: "transparent",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
