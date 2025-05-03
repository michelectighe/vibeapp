// styles/globalStyles.js

import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  scrollView: {
    paddingHorizontal: 16,
    marginTop: 50,
  },
  scrollContent: {
    paddingBottom: 160,
  },
};

export const globalStyles = StyleSheet.create(scaledStyle(rawStyles));
