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
    color: Colors.textLight,
    fontFamily: Fonts.body,
    padding: 30,
    fontSize: 24,
  },
  // buttonContainer: {
  //   position: "absolute",
  //   bottom: "30%",
  //   width: "90%",
  //   alignContent: "center",
  //   alignItems: "center",
  // },
  buttonContainer: {
    backgroundColor: "transparent",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    width: "90%",
    height: "80%",
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 14,
    marginTop: 24,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
