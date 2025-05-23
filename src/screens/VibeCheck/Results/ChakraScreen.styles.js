import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { scaledStyle } from "@utils";

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
    fontSize: 28,
    color: Colors.white,
    fontFamily: Fonts.body,
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
    paddingTop: 20, // this matches the height of your title/logo area
    paddingHorizontal: 20,
    paddingBottom: 160,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
