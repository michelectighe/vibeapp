// FrequenciesScreenStyles.js
import { StyleSheet, StatusBar } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginTop: "10%",
    paddingTop: StatusBar.currentHeight || 20,
    alignItems: "center",
  },
  titleWrapper: {
    flex: 1,
    paddingBottom: 85,
    alignItems: "center",
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 24,
    textAlign: "center",
    fontFamily: Fonts.AppFont,
    fontWeight: "bold",
  },
  frequencyList: {
    marginBottom: 20,
  },
  touchableWrapper: {
    width: "100%",
    height: 48,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 5,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  labelWrapper: {
    backgroundColor: "transparent",
    padding: 2,
    borderRadius: 20,
  },
  freqText: {
    color: Colors.textPrimary,
    fontFamily: Fonts.AppFont,
    fontSize: 24,
    textAlign: "center",
  },
  descriptionText: {
    color: Colors.textPrimary,
    fontFamily: Fonts.AppFont,
    fontSize: 12,
    textAlign: "center",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
