// styles/globalStyles.js

import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_WIDTH } from "@utils";

const rawStyles = {
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    position: "relative",
  },
  formContainer: {
    width: SCREEN_WIDTH * 0.9,
    alignItems: "stretch",
    alignSelf: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  input: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingHorizontal: 12,
    marginBottom: 15,
    width: "100%",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    color: Colors.black,
  },
  scrollView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  scrollContent: {
    paddingTop: 170, // this matches the height of your title/logo area
    paddingHorizontal: 20,
    paddingBottom: 160,
  },
  titleWrapper: {
    width: "100%",
    // backgroundColor: "red",
    alignSelf: "center", // or a gradient if needed
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    color: Colors.textDark,
    fontFamily: Fonts.bodyBold,
  },
  subTitle: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.textDark,
    fontFamily: Fonts.bodyBold,
  },
  link: {
    alignSelf: "flex-start",
    color: Colors.white,
    marginBottom: 20,
    fontSize: 18,
  },
};

export const globalStyles = StyleSheet.create(scaledStyle(rawStyles));
