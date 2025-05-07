import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  buttonWrapper: {
    width: SCREEN_WIDTH * 0.9,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
