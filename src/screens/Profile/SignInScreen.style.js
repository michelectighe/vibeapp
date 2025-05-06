import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  error: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  eyeIcon: {
    padding: 8,
  },
  forgot: {
    alignSelf: "flex-start",
    color: "white",
    marginTop: 0,
    fontSize: 14,
    marginBottom: 20,
    backgroundColor: "red"
  },

};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
