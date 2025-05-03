import { StyleSheet } from "react-native";
import { Fonts, Colors } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "transparent",
  },
  quoteText: {
    fontSize: 48,
    fontFamily: Fonts.Script,
    color: Colors.vcButtonTextColor,
    marginLeft: 50,
    marginRight: 50,
    textAlign: "center",
    lineHeight: 64,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
