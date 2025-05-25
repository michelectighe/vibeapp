import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  titleWrapper: {
    position: "absolute",
  //  top: 100,
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
    fontSize: 30,
    color: Colors.textLight,
    fontFamily: Fonts.body,
  },
  featuresBox: {
    height: "90%", // or whatever fits nicely on your layout
    width: "90%",
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
    overflow: "hidden",
  },
  feature: {
    fontSize: 16,
    fontFamily: "AppFont",
    marginBottom: 10,
    color: Colors.textDark,
  },
  featuresScroll: {
    flex: 1,
  },
  subscribeButton: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "blue", // Your accent color?
  },
  subscribeText: {
    fontSize: 18,
    fontFamily: "AppFont",
    color: Colors.white,
  },
  success: {
    color: Colors.white,
    textAlign: "center",
    marginBottom: 10,
  },
  cancelButton: {
    justifyContent: "center",
    // bottom: 10,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
