import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  titleWrapper: {
    //  position: "absolute",
    //  top: 100,
    width: SCREEN_WIDTH,
    alignItems: "center",
    backgroundColor: "transparent",
    //   zIndex: 2,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    color: Colors.textLight,
    fontFamily: Fonts.body,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: "italic",
    color: Colors.textLight,
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 12,
  },

  scrollView: {
    width: SCREEN_WIDTH,
  },
  scrollContent: {
    paddingTop: 175, // this matches the height of your title/logo area
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  summary: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    color: Colors.textDark,
    fontFamily: Fonts.body,
  },

  sectionTitle: {
    fontSize: 22,
    color: Colors.textLight,
    fontFamily: Fonts.body,
  //  fontWeight: "bold",
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
