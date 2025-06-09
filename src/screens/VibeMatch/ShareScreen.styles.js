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
    zIndex: 2,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    color: Colors.textLight,
    fontFamily: Fonts.body,
  },

  subTitle: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    color: Colors.textLight,
    fontFamily: Fonts.body,
  },
  noResults: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    color: Colors.textLight,
    fontFamily: Fonts.body,
  },
  scrollContent: {
    backgroundColor: "transparent",
    paddingTop: 150,
    paddingHorizontal: 0,
    paddingBottom: 160,
    width: SCREEN_WIDTH * 0.9,
  },
  newVibe: {
    marginBottom: 30,
    width: SCREEN_WIDTH * 0.8,
  },

  selectorContainer: {
    width: SCREEN_WIDTH,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
