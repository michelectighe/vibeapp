import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  fullScreenContainer: {
    flex: 1,
  },
  topContainer: {
    alignItems: "center",
  },
  welcomeText: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 28,
    color: "white",
    fontWeight: "600",
    marginBottom: 10,
  },
  welcomeQuestion: {
    position: "absolute",
    top: 100,
    width: "80%",
    textAlign: "center",
    fontSize: 24,
    color: "white",
    fontWeight: "600",
    marginBottom: 10,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    width: "80%",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
