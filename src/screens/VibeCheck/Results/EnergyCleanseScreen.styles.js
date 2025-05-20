import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_WIDTH } from "@/utils";

const rawStyles = {
  titleWrapper: {
    position: "absolute",
    top: 100,
    width: SCREEN_WIDTH,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    position: "absolute",
    top: 0,
    marginBottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 24,
    color: Colors.lightText,
    fontFamily: Fonts.body,
  },
  subTitle: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    color: Colors.lightText,
    fontFamily: Fonts.body,
  },
  middle: {},
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
    textAlign: "center",
    marginBottom: 0,
    marginTop: 10,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 100,
    padding: 10,
  },
  closeIcon: {
    fontSize: 24,
    color: Colors.veryDarkGray,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
