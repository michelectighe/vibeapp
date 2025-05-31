import { StyleSheet, Platform } from "react-native";
import { Fonts, Colors } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  glowWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  cameraContainer: {
    width: "80%",
    aspectRatio: 4 / 4,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "transparent",
    elevation: 10,
    marginTop: 20,
    backdropFilter: Platform.OS === "web" ? "blur(10px)" : undefined,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,

  },
  cameraView: {
    position: "absolute",
    overflow: "hidden",
    width: "90%",
    height: "90%",
    zIndex: 11,
    borderRadius: 30,
  },
  cameraStyle: {
    width: "100%",
    height: "100%",
    zIndex: 12,
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
  statusText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 18,
    width: "100%",
  },
  textContainer: {
    alignItems: "center",
    width: "100%",
  //  paddingBottom: 20,
    height: "90%",
  },
  promptText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 0,
    marginBottom: 20,
    color: Colors.textDark,
    fontFamily: Fonts.body,
    letterSpacing: 1,
  },

  phraseBox: {
    justifyContent: "center",
    width: "100%",
    height: "45%",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    // marginVertical: 20,
    //   alignSelf: "center",
    shadowColor: Colors.black,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 15,
  },
  phraseText: {
    fontSize: 24,
    textAlign: "center",
    color: Colors.textLight,
    fontFamily: Fonts.body,
  },
  // continueContainer: {
  //   position: "absolute",
  //   bottom: 50,
  //   width: "90%",
  //   alignItems: "center",
  // },
  continueContainer: {
   justifyContent: "space-between",
    backgroundColor: Colors.surface,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    width: "90%",
    height: "90%",
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 14,
    marginTop: 24,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
