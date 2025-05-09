import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "@utils";
import { Colors, Fonts } from "@constants";

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
    color: Colors.lightText,
    fontFamily: Fonts.AppFont,
  },
  scrollView: {
    paddingHorizontal: 16,
    marginTop: 50,
  },
  scrollContent: {
    paddingBottom: 160,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
