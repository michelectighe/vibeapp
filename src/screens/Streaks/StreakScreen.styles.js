// StreakScreen.styles.js
import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";

const rawStyles = {
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  streakTitle: {
    marginTop: 0,
    marginBottom: 10,
    fontSize: 24,
    color: Colors.textDark,
    fontFamily: Fonts.title,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.textDark,
    fontFamily: Fonts.body,
    textAlign: "center",
    marginBottom: 0,
  },
  notesArea: {
    flex: 3,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
    //   backgroundColor: "red"
  },
  bottomSection: {
    flex: 1,
    justifyContent: "left",
    alignItems: "left",
    paddingBottom: 150,
    paddingHorizontal: 10,
  },
  localModalContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
