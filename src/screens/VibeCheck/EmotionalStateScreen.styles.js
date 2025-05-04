import { StyleSheet, Platform } from "react-native";
import { Fonts, Colors } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  innerContainer: {
    position: "absolute",
    top: "15%",
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginTop: 0,
    backgroundColor: "red"
  },
  glowWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  cameraContainer: {
    width: "60%",
    aspectRatio: 3 / 4,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "transparent",
    elevation: 10,
    marginTop: 0,
    backdropFilter: Platform.OS === "web" ? "blur(10px)" : undefined,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraView: {
    position: "absolute",
    overflow: "hidden",
    width: "90%",
    height: "90%",
    zIndex: 1,
    borderRadius: 30,
  },
  cameraStyle: {
    width: "100%",
    height: "100%",
    zIndex: 10,
  },
  fuzzyGlow: {
    position: "absolute",
    // top: -50,
    //left: "15%",
    width: "100%",
    height: "100%",
    //zIndex: 0,
    opacity: 1,
  },
  textContainer: {
    alignItems: "center",
    width: "100%",
    paddingBottom: 20,
  },
  statusText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 18,
    width: "100%",
  },
  instructions: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 18,
    padding: 10,
    width: "85%",
    color: "#fff", // Adjust according to themeColors if needed
  },
  promptText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    color: Colors.lightText,
    fontFamily: Fonts.AppFont,
    letterSpacing: 1,
  },

  phraseBox: {
    backgroundColor: Colors.buttonBackground,
    width: "90%",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginVertical: 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },

  phraseText: {
    fontSize: 28,
    fontStyle: "italic",
    textAlign: "center",
    color: Colors.lightText,
    fontFamily: Fonts.AppFont,
  },
  continueContainer: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 30,
    alignItems: "center",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
