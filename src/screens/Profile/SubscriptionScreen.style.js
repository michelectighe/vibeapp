import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  titleWrapper: {
    zIndex: 1,
    position: "absolute",
    top: 120,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "transparent", // or a gradient if needed
  },

  feature: {
    fontSize: 16,
    fontFamily: "AppFont",
    marginBottom: 10,
    color: "#333",
  },
  featuresBox: {
    height: SCREEN_HEIGHT * .6, // or whatever fits nicely on your layout
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignSelf: "center",
    overflow: "hidden",
  },

  featuresScroll: {
    flex: 1,
  },

  subscribeButton: {
    backgroundColor: "#fff",
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
    color: "white",
  },
  success: {
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
