import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  bottomButtons: {
    width: SCREEN_WIDTH * .9,
  },
  toggles: {
    flexDirection: "row",
    justifyContent: "left",
    marginBottom: 20,
    marginLeft: 10,

  },
  switchText: {
    color: Colors.lightText,
    marginLeft: 10,
    marginTop: 5,
  }
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
