import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  top: {
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: Colors.darkText,
  },
  prompt: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
    color: Colors.lightText,
    width: "70%",
  },
  inputContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  textInput: {
    backgroundColor: "#FFF8EE",
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
    backgroundColor: "#7D4F20",
    padding: 14,
    borderRadius: 16,
    marginTop: 16,
    alignItems: "center",
  },
  saveText: {
    color: "#FDEBD0",
    fontWeight: "600",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
