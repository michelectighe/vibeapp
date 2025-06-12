import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  cameraContainer: {
    //  backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    //  marginHorizontal: 20,
    padding: 10,
    flex: 1,
    width: SCREEN_WIDTH * 0.7, // ✅ Force full width
    maxWidth: "70%", // ✅ Ensure it doesn’t shrink
    alignSelf: "center", // ✅ Take full horizontal space of parent
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    overflow: "hidden",
  },
  cameraPlaceholder: {
    flex: 1,
    width: "100%",
  },
  infoContainer: {
    marginTop: 0,
    paddingHorizontal: 0,
    paddingVertical: 1,
    //  backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.45,
    //   backgroundColor: "blue",
  },
  gradient: {
    borderWidth: 0.7,
    borderColor: Colors.white,
    width: "100%",
    height: "100%",
    //   padding: -10,
  },
  gradientCamera: {
    borderWidth: 0.7,
    borderColor: Colors.white,
  //  width: "100%",
   // height: "100%",
    //   padding: -10,
  },
  labelTitle: {
    fontSize: 18,
    // fontWeight: "600",
    color: Colors.buttonText,
    marginTop: 10,
    marginBottom: 12,
    textAlign: "center",
    FontFamily: Fonts.body,
  },
  sideBySide: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  leftColumn: {
    flex: 1,
    height: "95%",
    paddingLeft: 10,
  },
  largeCard: {
    height: "87%", // Taller card for background sound
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 12,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "grey", // soft white line, adjust for dark background
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 16,
    borderRadius: 0.5,
  },
  rightColumn: {
    height: "93%",
    flex: 1,
    gap: 10,
    paddingRight: 10,
  },

  iconItem: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 12,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    //    justifyContent: "center",
  },
  iconLabel: {
    fontSize: 14,
    fontFamily: Fonts.body,
    color: Colors.buttonText,
    marginBottom: 4,
  },
  iconValue: {
    fontSize: 16,
    fontFamily: Fonts.body,
    fontWeight: "600",
    color: Colors.buttonText,
  },
  shaky: {
    fontSize: 16,
    fontFamily: Fonts.body,
    fontWeight: "300",
    color: Colors.buttonText,
  },
  iconSubValue: {
    fontSize: 13,
    fontFamily: Fonts.body,
    color: Colors.buttonText,
    marginTop: 2,
  },
  successCard: {
    //  backgroundColor: Colors.cardBackground,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    width: "100%",
    height: "100%",
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 14,
    marginTop: 24,
  },
  finishButtonWrapper: {
    width: "80%",
    height: "80%",
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.buttonText,
    marginTop: 10,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    color: Colors.buttonText,
    marginBottom: 26,
    textAlign: "center",
  },
  results: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "#ffffffcc",
    width: "90%",
    alignSelf: "center",
    borderRadius: 16,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 10,

    // ✨ Glowing effect
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 6, // Android fallback
  },

  resultsText: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    color: Colors.buttonText,
    fontFamily: Fonts.body,
    marginVertical: 5,
  },
  resultsGlowWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  resultsGlow: {
    position: "absolute",
    width: "90%",
    height: 60,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 18,
    elevation: 10,
    zIndex: 0,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
