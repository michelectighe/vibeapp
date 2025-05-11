import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";
import { scaledStyle } from "@utils";
import { Colors } from "@/constants";

const rawStyles = {
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  titleWrapper: {
    position: "absolute",
    top: 100,
    width: SCREEN_WIDTH,
    alignItems: "center",
    backgroundColor: "transparent",
  },

  score: {
    fontSize: SCREEN_HEIGHT * 0.06,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    fontSize: SCREEN_HEIGHT * 0.06,
    color: Colors.white,
    textAlign: "center",
    textShadowRadius: 2,
    textShadowOffset: { width: 2, height: 2 },
  },
  innerContent: {
    flex: 1,
    paddingTop: SCREEN_HEIGHT * 0.1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: SCREEN_WIDTH * 0.06,
  },
  descriptionBox: {
    marginTop: SCREEN_HEIGHT * 0.02,
    borderRadius: 30,
    padding: 20,
    maxWidth: SCREEN_WIDTH * 0.9,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "flex-start",
    width: "90%",
    paddingBottom: 60,
  },
  descriptionText: {
    color: Colors.lightText,
    fontSize: SCREEN_HEIGHT * 0.022,
    textAlign: "center",
  },
  infoButton: {
    position: "absolute",
    bottom: 10,
    padding: 10,
    marginTop: 30,
    zIndex: 10,
  },
  infoImage: {
    width: 24,
    height: 24,
  },
  loading: {
    marginTop: 20,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
