import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollInner: {
    marginHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  };

  export const styles = StyleSheet.create(scaledStyle(rawStyles));
