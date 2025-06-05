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
  instructionsText: {
    color: "#222",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 24,
    textShadowColor: "rgba(255,255,255,0.7)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: SCREEN_WIDTH,
    paddingTop: 20,
    paddingBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(40,40,40,0.3)",
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  needPhraseText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  phraseBubble: {
    position: "absolute",
    bottom: 140,
    left: SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.8,
    minHeight: 60,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 10,
  },
  phraseText: {
    color: "#222",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  recordButtonContainer: {
    position: "absolute",
    bottom: 48, // or whatever feels best
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
