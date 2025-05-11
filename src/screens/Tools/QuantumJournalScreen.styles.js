import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  titleWrapper: {
    position: "absolute",
    top: 70,
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
    fontSize: 24,
    color: Colors.lightText,
    fontFamily: Fonts.AppFont,
  },
  prompt: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
    marginVertical: 20,
    color: Colors.lightText,
    width: "80%",
  },
  inputContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  textInput: {
    backgroundColor: Colors.creamyBeige,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: Colors.darkText,
    fontFamily: Fonts.Script,
    minHeight: 200,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: Colors.deepEarthyBrown,
    padding: 14,
    borderRadius: 16,
    marginTop: 16,
    alignItems: "center",
  },
  saveText: {
    color: Colors.creamyPeach,
    fontWeight: "600",
  },
  bottomText: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
  },
  text: {
    color: Colors.lightText,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
