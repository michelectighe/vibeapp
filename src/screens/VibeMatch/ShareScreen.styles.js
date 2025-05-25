import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  titleWrapper: {
    position: "absolute",
    top: 100,
    width: SCREEN_WIDTH,
    alignItems: "center",
    backgroundColor: "transparent",
    zIndex: 2,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    color: Colors.white,
    fontFamily: Fonts.body,
  },

  subTitle: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    color: Colors.textLight,
    fontFamily: Fonts.body,
  },
  scrollContent: {
    backgroundColor: "transparent",
    paddingTop: 150,
    paddingHorizontal: 0,
    paddingBottom: 160,
    width: SCREEN_WIDTH * 0.9,
  },
  options: {
    borderRadius: 20,
    marginTop: 20,
    //  overflow: "hidden",
    backgroundColor: Colors.surface,
    flexDirection: "row",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.9,

    gap: 20,
  },
  shareAs: {
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: "space-between",
    //  height: "100%",
    gap: 0,
  },
  anonymous: {
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: "space-between",
    ////   height: "100%",
    gap: 10,
  },
  anonymousText: {
    color: Colors.textLight,
  },
  input: {
    width: SCREEN_WIDTH * 0.6,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 0,
    marginTop: 5,
    fontSize: 16,
  },

  selectorContainer: {
    width: SCREEN_WIDTH,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
