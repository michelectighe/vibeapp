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
    marginTop: "5%",
    marginBottom: 50,
    textAlign: "center",
    color: Colors.textPrimary,
    fontFamily: Fonts.AppFont,
    padding: 30,
    fontSize: 24,
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
