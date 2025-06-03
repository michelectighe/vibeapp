import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";

const CARD_WIDTH = SCREEN_WIDTH * 0.9;

const rawStyles = {
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  infoContainer: {
    backgroundColor: "transparent",
    // borderRadius: 16,
    width: "100%",
    height: SCREEN_HEIGHT * 0.75,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  card: {
    overflow: "hidden",
    width: CARD_WIDTH,
    height: "60%",
    alignSelf: "center",
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginBottom: 18,
    backgroundColor: "rgba(255,255,255,0.50)", // soft semi-transparent if BlurView isn't supported
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
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
    //  justifyContent: "space-between",
    width: "100%",
    height: "100%",
    gap: 15,
    backgroundColor: "transparent",
  },

  leftColumn: {
    flex: 1,
    backgroundColor: "transparent",
  },
  dividerLeft: {
    height: 1,
    backgroundColor: "grey", // soft white line, adjust for dark background
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: CARD_WIDTH * 0.01,
    borderRadius: 0.5,
    width: CARD_WIDTH * 0.8,
  },
  dividerRight: {
    height: 1,
    marginTop: 10,
    marginBottom: 20,
    // this is just for padding so the rows line up
  },
  rightColumn: {
    backgroundColor: "transparent",
    flex: 1,
  },

  largeCard: {
    height: "93%", // Taller card for background sound
    backgroundColor: "transparent",
    padding: 12,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  subLargeCardTall: {
    height: "50%",
  },
  subLargeCardShort: {
    height: "40%",
    backgroundColor: "transparent",
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
  iconSubValue: {
    fontSize: 13,
    fontFamily: Fonts.body,
    color: Colors.textDark,
    marginTop: 2,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
