import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {

    titleWrapper: {
    position: "absolute",
    top: 100,
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
    color: Colors.textLight,
    fontFamily: Fonts.body,
  },
    subTitle: {
    position: "absolute",
    top: 50,
    marginBottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    color: Colors.textLight,
    fontFamily: Fonts.body,
  },
  selectorContainer: {
    width: SCREEN_WIDTH,
  }
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
