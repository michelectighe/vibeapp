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
    paddingTop: 120,
    marginBottom: 50,
  },
  scrollContent: {
    paddingTop: 0, // this matches the height of your title/logo area
    paddingBottom: 100,
  },

};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
