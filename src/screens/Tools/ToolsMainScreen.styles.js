import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "@utils";
import { Colors, Fonts } from "@constants";

const rawStyles = {
  topContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
  },
  titleWrapper: {
    zIndex: 1,
    position: "absolute",
    top: 120,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "transparent", // or a gradient if needed
  },
  welcomeText: {
    position: "absolute",
    top: 0,
    marginBottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 36,
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
