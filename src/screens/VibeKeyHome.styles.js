import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  titleWrapper: {
    position: "absolute",
    top: 120,
    width: SCREEN_WIDTH,
    alignItems: "center",
    backgroundColor: "transparent",
  },

  scrollView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
    divider: {
  height: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.15)', // soft white line, adjust for dark background
  marginTop: 20,
  marginHorizontal: 16,
  borderRadius: 0.5,
},
  scrollContent: {
   // paddingTop: 50, // this matches the height of your title/logo area
    // paddingHorizontal: 20,
   // paddingBottom: 250,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
