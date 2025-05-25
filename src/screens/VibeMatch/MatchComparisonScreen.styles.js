import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@utils";
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
    color: Colors.white,
    fontFamily: Fonts.body,
  },
  scrollContent: {
    backgroundColor: "transparent",
    paddingTop: 250,
    paddingHorizontal: 0,
    paddingBottom: 160,
    width: SCREEN_WIDTH * 0.9,
  },
  summary: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    color: Colors.textLight,
    fontFamily: Fonts.body,
  },
  scroll: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  scrollContent: {
    paddingBottom: 160,
  },
  sectionTitle: {
    fontSize: 22,
    color: Colors.lightGray,
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 8,
  },
  noData: {
    color: Colors.mediumGray,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 10,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
