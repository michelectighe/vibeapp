import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  titleWrapper: {
    position: "absolute",
    top: 75,
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
    color: Colors.white,
    fontFamily: Fonts.title,
  },
  prompt: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
    // marginVertical: 20,
    width: "80%",
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
    // margin: 16,
    fontSize: 16,
    color: Colors.textDark,
    fontFamily: Fonts.journal,
    minHeight: SCREEN_HEIGHT * 0.4,
    textAlignVertical: "top",
    marginBottom: 20,
    overflow: "hidden",
  },
  // saveButton: {
  //   padding: 14,
  //   borderRadius: 16,
  //   marginTop: 16,
  //   alignItems: "center",
  // },
  bottomText: {
    marginTop: 10,
    justifyContent: "center",
  },
  bottomNote: {
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
