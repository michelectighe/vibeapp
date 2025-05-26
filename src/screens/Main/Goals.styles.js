// Goals.styles.js
import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_WIDTH } from "@/utils";

const rawStyles = {
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    width: SCREEN_WIDTH,
  },
  streakTitle: {
    marginTop: 0,
    marginBottom: 10,
    fontSize: 24,
    color: Colors.textLight,
    fontFamily: Fonts.title,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.textLight,
    fontFamily: Fonts.body,
    textAlign: "center",
    marginBottom: 20,
  },
  notesArea: {
    flex: 4,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
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
