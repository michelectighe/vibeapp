import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH, scale, scaledStyle } from "@/utils";
import { Colors, Fonts } from "@/constants";

 const rawStyles = {
  mirrorWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  lightedBorder: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    borderRadius: SCREEN_WIDTH * 0.4,
    overflow: "hidden",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    position: "relative",
  },

  mirrorContainer: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_WIDTH * 0.75,
    borderRadius: SCREEN_WIDTH * 0.375,
    overflow: "hidden",
    backgroundColor: Colors.cardBackground,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  camera: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },

  placeholder: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: Colors.cardBackground,
    alignSelf: "center",
    marginVertical: 20,
  },
  placeholderText: {
    color: Colors.cardText,
    fontFamily: Fonts.body,
    fontSize: 16,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));