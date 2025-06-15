import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_WIDTH } from "@/utils";

const rawStyles = {
  headerContainer: {
    position: "absolute",
    top: "10%",
    marginTop: "10%",
  },
  overallLabel: {
    textAlign: "center",
    color: Colors.white,
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 },
    fontSize: 28,
    marginBottom: 50,
  },
  subTitle: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    color: Colors.white,
    fontFamily: Fonts.body,
  },
  middle: {},
  gratitude: {
    marginTop: 10,
    width: SCREEN_WIDTH * 0.6,
    alignSelf: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    //  fontWeight: "bold",
    marginVertical: 8,
    textAlign: "center",
    marginBottom: -10,
    marginTop: 10,
    fontFamily: Fonts.body,
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
    color: Colors.white,
  },
  success: {
    position: "absolute",
    bottom: 70,
    textAlign: "center",
    marginTop: 15,
    fontSize: 18,
    fontFamily: Fonts.body,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
