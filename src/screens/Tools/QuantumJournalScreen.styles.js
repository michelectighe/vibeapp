import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  container: {
    flex: 1,
    backgroundColor: "#FDEBD0",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: "#5C3B1E",
  },
  prompt: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
    color: "#7D4F20",
  },
  inputContainer: {
    flex: 1,
  },
  textInput: {
    backgroundColor: "#FFF8EE",
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: "#3C2F2F",
    minHeight: 200,
    textAlignVertical: "top",
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
