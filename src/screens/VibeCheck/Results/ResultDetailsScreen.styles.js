import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@utils";

const rawStyles = {
  root: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
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
    fontSize: 36,
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
    paddingTop: 210, // this matches the height of your title/logo area
    //   paddingHorizontal: 20,
    paddingBottom: 160,
  },
  textContainer: {
    margin: 20,
    marginTop: 0,
    borderRadius: 20,
    padding: 20,
  },
  overallText: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.textLight,
  },
  textHeader: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textLight,
  },
  chicletHeader: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.textLight,
    marginBottom: 10,
  },
  chicletWrapper: {
    marginTop: 10,
    marginBottom: 10,
    gap: 10,
    alignItems: "center",
  },
  finalNote: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.textLight,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
