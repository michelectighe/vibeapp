import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";



const rawStyles = {
  topContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
  },
  welcomeText: {
    position: "absolute",
    top: 0,
    marginBottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 24,
    color: "white",
    fontWeight: "600",
    fontFamily: Fonts.AppFont,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    marginTop: 50,
  },
  scrollContent: {
    paddingBottom: 160,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
