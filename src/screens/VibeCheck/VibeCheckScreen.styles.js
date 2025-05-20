import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  content: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  descriptionText: {
    justifyContent: "center",
    textAlign: "center",
    color: Colors.lightText,
    fontFamily: Fonts.body,
    padding: 30,
    fontSize: 18,
  },
  buttonContainer: {
    position: "absolute",
    bottom: "10%",
    width: "90%",
    alignContent: "center",
    alignItems: "center",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
