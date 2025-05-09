import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  /** @type {import('react-native').ViewStyle} */
  bottomButtons: {
    backgroundColor: "transparent",
    width: SCREEN_WIDTH * 0.9,
    justifyContent: "flex-start"
  },
  toggles: {
    flexDirection: "row",
    justifyContent: "left",
    marginBottom: 20,
    marginLeft: 10,
  },
  switchText: {
    color: Colors.lightText,
    marginLeft: 10,
    marginTop: 5,
  },
  inputGoals: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
   // textAlignVertical: "top",
    //height: SCREEN_HEIGHT * 0.1,
  //  width: SCREEN_WIDTH * 0.9,
    textAlign: "center", 
  },
  subtitle: {
    color: Colors.lightText,
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
