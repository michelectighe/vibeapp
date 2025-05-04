import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  container: {
    flex: 1,
    marginTop: "25%",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  cameraContainer: {
    marginTop: 0,
    width: "120",
    height: 120,
    borderRadius: 80,
    backgroundColor: "#ccc",
    marginBottom: 10,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  bpmText: {
    textAlign: "center",
    color: "#ffffff",
  },
  rmssdText: {
    color: "#ffffff",
    fontFamily: "AppFont",
    textAlign: "center",
    marginBottom: 2,
    fontSize: 14,
  },
  warningText: {
    color: "#ffffff",
    marginTop: 20,
    fontSize: 24,
    borderColor: "black",
    textAlign: "center",
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  stableText: {
    fontSize: 36,
    color: "#ffffff",
    textAlign: "center",
  },
  absoluteFull: {
    flex: 1,
    width: "100%",
    position: "relative",
  },
  cameraWrapper: {
    position: "absolute",
    top: 80, // fallback if no height provided
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  bottomRight: {
    position: "absolute",
    bottom: 100,
    right: "15%",
    zIndex: 10,
  },
  bottomCenter: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  finishButtonWrapper: {
    position: "absolute",
    bottom: 50,
    marginLeft: "5%",
    marginRight: "5%",
    left: 0,
    right: 0,
    width: "90%",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
