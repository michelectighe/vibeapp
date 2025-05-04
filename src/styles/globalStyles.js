// styles/globalStyles.js

import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    position: "relative",
  },
  scrollView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
   scrollContent: {
    paddingTop: 230, // this matches the height of your title/logo area
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  titleWrapper: {
    zIndex: 1,
    position: "absolute",
    top: 130,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "transparent", // or a gradient if needed
  },
  title: {
    position: "absolute",
    top: 0,
    marginBottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 30,
    color: Colors.darkText,
    fontFamily: Fonts.AppFontBold,
  },
};

export const globalStyles = StyleSheet.create(scaledStyle(rawStyles));
