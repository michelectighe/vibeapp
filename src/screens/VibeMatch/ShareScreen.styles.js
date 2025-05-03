import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "transparent",
  },
  innerContainer: {
    paddingTop: 0,
    paddingHorizontal: "5%",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
