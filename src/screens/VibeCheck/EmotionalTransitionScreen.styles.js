import { StyleSheet } from "react-native";
import { Fonts, Colors } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  quoteText: {
    fontSize: 48,
    fontFamily: Fonts.script,
    color: Colors.textLight,
    marginLeft: 50,
    marginRight: 50,
    textAlign: "center",
    lineHeight: 64,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
