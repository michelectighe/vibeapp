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
    marginTop: 40,
  },
  contentContainer: {
    paddingBottom: 160,
  },
  };

  export const styles = StyleSheet.create(scaledStyle(rawStyles));