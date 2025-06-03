import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  cameraContainer: {
    backgroundColor: Colors.surface,
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
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.45,
    //   backgroundColor: "blue",
  },
  labelTitle: {
    fontSize: 18,
    // fontWeight: "600",
    color: Colors.textDark,
    marginBottom: 16,
    textAlign: "center",
    FontFamily: Fonts.body,
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "50%",
    gap: 16,
  },
  column: {
    flex: 1,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 14,
    color: Colors.textDark,
    FontFamily: Fonts.body,
    width: "100%",
    marginBottom: 9,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  labelResult: {
    fontSize: 14,
    //  fontWeight: "600",
    color: Colors.textDark,
    marginBottom: 16,
    fontFamily: Fonts.body,
  },
  singleRow: {
    width: SCREEN_WIDTH * 0.9,
    marginTop: 8,
  },

  // New styles to add in HeartRateScreen.styles.js
  sideBySide: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,

    //    backgroundColor: "red",
  },

  leftColumn: {
    flex: 1,
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
    height: "85%",
    flex: 1,
    justifyContent: "space-between",
    gap: 12,
  },

  largeCard: {
    height: "93%", // Taller card for background sound
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 12,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },

  iconItem: {
    width: "100%",
    height: "34.5%",
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
    color: Colors.textDark,
    marginBottom: 4,
  },
  iconValue: {
    fontSize: 16,
    fontFamily: Fonts.body,
    fontWeight: "600",
    color: Colors.textDark,
  },
  shaky: {
    fontSize: 16,
    fontFamily: Fonts.body,
    fontWeight: "300",
    color: Colors.textDark,
  },
  iconSubValue: {
    fontSize: 13,
    fontFamily: Fonts.body,
    color: Colors.textDark,
    marginTop: 2,
  },
  successCard: {
    backgroundColor: Colors.surface,
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
    color: Colors.textDark,
    marginTop: 10,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    color: Colors.textDark,
    marginBottom: 26,
    textAlign: "center",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
