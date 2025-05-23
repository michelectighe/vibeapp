import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  titleWrapper: {
    position: "absolute",
    top: 10,
    width: SCREEN_WIDTH,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    position: "absolute",
    top: 0,
    marginBottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 28,
    fontFamily: Fonts.title,
  },
  prompt: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 20,
    width: "80%",
    fontFamily: Fonts.body,
  },
  inputContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  textInput: {
    backgroundColor: Colors.textLight,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: Colors.textDark,
    fontFamily: Fonts.journal,
    minHeight: SCREEN_HEIGHT * 0.3,
    maxHeight: SCREEN_HEIGHT * 0.3,
    minWidth: SCREEN_WIDTH * 0.9,
    maxWidth: SCREEN_WIDTH * 0.9,
    textAlignVertical: "top",
    marginBottom: 20,
    marginTop: 20,
    overflow: "hidden",
  },

  bottomText: {
    marginTop: 10,
    justifyContent: "center",
    width: SCREEN_WIDTH *.9,
  },
  bottomNote: {
    position: "absolute",
    bottom: 100,
    fontFamily: Fonts.body,
    fontSize: 16,
    textAlign: "center",
  },
  savedMessage: {
    fontFamily: Fonts.body,
    fontSize: 18,
    textAlign: "center",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
