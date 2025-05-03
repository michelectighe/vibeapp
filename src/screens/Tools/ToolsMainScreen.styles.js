import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "@utils";
import { Colors, Fonts } from "@constants";

const rawStyles = {
  topContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
  },
  welcomeText: {
    position: "absolute",
    top: -30,
    marginBottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 36,
    color: "white",
    fontWeight: "600",
    fontFamily: Fonts.Script,
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
