import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { scaledStyle } from "@utils";

const rawStyles = {
  screen: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
    textAlign: "center",
    fontSize: 36,
    fontFamily: Fonts.Script,
    marginBottom: 10,
  },
  card: {
    height: 180,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 7,
    overflow: "hidden",
    position: "relative",
  },
  textOverlay: {
    zIndex: 1,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.veryDarkGray,
    marginBottom: 4,
  },
  meaning: {
    fontSize: 16,
    color: Colors.darkGray,
    marginBottom: 6,
  },
  score: {
    fontSize: 16,
    color: Colors.black,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 22,
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
    color: Colors.veryDarkGray,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
