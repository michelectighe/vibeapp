import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  titleWrapper: {
    position: "absolute",
    top: "50%",
    width: SCREEN_WIDTH,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  prompt: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 0,
    width: "80%",
    fontFamily: Fonts.body,
  },
  inputContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  textInput: {
    borderRadius: 16,
    fontSize: 16,
    fontFamily: Fonts.journal,
    minHeight: SCREEN_HEIGHT * 0.2,
    maxHeight: SCREEN_HEIGHT * 0.3,
    minWidth: SCREEN_WIDTH * 0.9,
    maxWidth: SCREEN_WIDTH * 0.9,
    textAlignVertical: "top",
    marginTop: 20,
    overflow: "hidden",
  },

  bottomText: {
    marginTop: 10,
    justifyContent: "center",
    width: SCREEN_WIDTH * 0.9,
  },
  savedMessage: {
    fontFamily: Fonts.body,
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  bottomNote: {
    position: "absolute",
    bottom: "30%",
    fontFamily: Fonts.body,
    fontSize: 16,
    textAlign: "center",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
