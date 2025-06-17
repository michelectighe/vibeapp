import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";
import { scaledStyle } from "@utils";
import { Colors } from "@/constants";

const rawStyles = {
  container: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    marginTop: 120,
    backgroundColor: "transparent",
  },
  titleWrapper: {
    marginTop: "20%",
    width: SCREEN_WIDTH,
    alignItems: "center",
    backgroundColor: "transparent",
    marginBottom: 20,
    paddingHorizontal: 20,
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
    textAlign: "center",
    textShadowRadius: 2,
    textShadowOffset: { width: 2, height: 2 },
    marginBottom: 10,
  },
  divider: { alignSelf: "center", marginVertical: 16 },
  innerContent: {
    position: "relative",
    paddingTop: SCREEN_HEIGHT * 0.07,
    width: SCREEN_WIDTH,
  },

  descriptionBox: {
    height: SCREEN_HEIGHT * 0.45,
    borderRadius: 16,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    width: SCREEN_WIDTH * 0.9,
    borderWidth: 1,
  },
  descriptionText: {
    fontSize: SCREEN_HEIGHT * 0.022,
    textAlign: "center",
    padding: 15,
  },
  iconInfo: {
    backgroundColor: "transparent",
    marginBottom: 0,
    paddingBottom: 10,
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
