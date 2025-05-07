import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  bottomButtons: {
    width: SCREEN_WIDTH * 0.9,
  },
  inputGoals: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
    textAlignVertical: "top",
    height: SCREEN_HEIGHT * 0.1,
    width: SCREEN_WIDTH * 0.9,
  },
  subtitle: {
    color: Colors.lightText,
    width: "100%",
    padding: 0,
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
