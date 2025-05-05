import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  safeArea: {
    marginTop: 10,
  },
  scrollView: {
    paddingHorizontal: 16,
    marginTop: 50,
  },
  scrollContent: {
    paddingTop: 0, // this matches the height of your title/logo area
    paddingHorizontal: 0,
    paddingBottom: 100,
  },
  contentContainer: {
    paddingBottom: 2000,
  },
  };

  export const styles = StyleSheet.create(scaledStyle(rawStyles));