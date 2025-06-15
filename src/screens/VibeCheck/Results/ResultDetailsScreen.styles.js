import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";

const rawStyles = {
  root: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  overallLabel: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    textAlign: "center",
    color: Colors.white,
    textShadowRadius: 2,
    textShadowOffset: { width: 2, height: 3},
    fontSize: 42,
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
    paddingTop: 70, // this matches the height of your title/logo area
    //   paddingHorizontal: 20,
    paddingBottom: 160,
  },
  textContainer: {
    width: SCREEN_WIDTH * .7,
    alignSelf: "center",
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    borderWidth: .5,
    borderColor: Colors.white,
    //  paddingVertical: 10,
  },
  overallText: {
    textAlign: "center",
    fontSize: 18,
    paddingVertical: 20,
    paddingHorizontal: 20,
    color: Colors.textLight,
  },
  textHeader: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textLight,
  },
  chicletHeader: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 20,
    marginBottom: 10,
  },
  chicletWrapper: {
    width: SCREEN_WIDTH *.6,
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 20,
    gap: 10,

  },
  finalNote: {
    textAlign: "center",
    fontSize: 18,
    paddingVertical: 20,
    paddingHorizontal: 20,
    color: Colors.textLight,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
