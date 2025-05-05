import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  link: {
    color: Colors.lightText,
    marginBottom: 20,
    fontSize: 18,
    alignText: "center",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
