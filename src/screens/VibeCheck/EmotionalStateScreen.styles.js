import { StyleSheet, Platform } from "react-native";
import { Fonts, Colors } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  cameraView: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  cameraStyle: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    paddingTop: 80,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    // For a bar: height: 80, width: "100%"
  },

  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH,
    heigth: SCREEN_HEIGHT *.4,
    paddingTop: 20,
    paddingBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },


  recordButtonContainer: {
    position: "absolute",
    bottom: 48, // or whatever feels best
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 24,
    color: "white",
    position: "absolute",
    bottom: 100,
    left: 0,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
