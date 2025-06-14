import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";
import { scaledStyle } from "@utils";
import { Colors } from "@/constants";

const rawStyles = {
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: Colors.white,
  },

  titleWrapper: {
    marginTop: "20%",
    width: SCREEN_WIDTH,
    alignItems: "center",
    backgroundColor: "transparent",
  },

  score: {
    fontSize: SCREEN_HEIGHT * 0.06,
    fontWeight: "bold",
    textAlign: "center",
    textShadowRadius: 2,
    textShadowOffset: { width: 2, height: 2 },
  },
  label: {
    fontSize: SCREEN_HEIGHT * 0.05,
    color: Colors.white,
    textAlign: "center",
    textShadowRadius: 2,
    textShadowOffset: { width: 2, height: 2 },
  },
  innerContent: {
    paddingTop: SCREEN_HEIGHT * 0.07,
  },
  descriptionBox: {
    marginTop: SCREEN_HEIGHT * 0.02,
    height: SCREEN_HEIGHT * 0.4,
    borderRadius: 30,
    padding: 20,
    paddingBottom: 10,
    maxWidth: SCREEN_WIDTH * 0.9,
    alignItems: "center",
    alignSelf: "center",

    width: "90%",
  },
  descriptionText: {
    color: Colors.textLight,
    fontSize: SCREEN_HEIGHT * 0.022,
    textAlign: "center",
  },
  iconInfo: {
    backgroundColor: "transparent",
  },
  navButtons: {
    marginTop: 50,
    width: "80%",
  },
  loading: {
    marginTop: 20,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
