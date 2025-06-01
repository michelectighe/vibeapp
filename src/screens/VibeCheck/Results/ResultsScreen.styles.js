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
    paddingTop: SCREEN_HEIGHT * 0.07,

    //    alignItems: "center",
    //   justifyContent: "space-evenly",
    //   paddingHorizontal: SCREEN_WIDTH * 0.06,
  },
  descriptionBox: {
    marginTop: SCREEN_HEIGHT * 0.02,
    // marginBottom: 30,
    borderRadius: 30,
    padding: 20,
    paddingBottom: 0,
    maxWidth: SCREEN_WIDTH * 0.9,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "flex-start",
    width: "90%",
    //   paddingBottom: 60,
  },
  descriptionText: {
    color: Colors.textLight,
    fontSize: SCREEN_HEIGHT * 0.022,
    textAlign: "center",
  },
  infoButton: {
    //    position: "absolute",
    bottom: 10,
    padding: 10,
    marginTop: 10,
    zIndex: 10,
  },
  infoIcon: {
    fontSize: 36,
  },
  navButtons: {
  //  position: "absolute",
   // bottom: 0,
    marginTop: 50,
    width: "80%",
  },
  loading: {
    marginTop: 20,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
