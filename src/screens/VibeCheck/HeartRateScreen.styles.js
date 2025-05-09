import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  cameraContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 10,
    flex: 1,
    width: "90%", // ✅ Force full width
    maxWidth: "90%", // ✅ Ensure it doesn’t shrink
    alignSelf: "stretch", // ✅ Take full horizontal space of parent
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    overflow: "hidden",
  },
  cameraPlaceholder: {
    flex: 1,
    width: "100%",
  },
  infoContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  labelTitle: {
    fontSize: 20,
    fontFamily: Fonts.medium,
    marginBottom: 10,
    color: Colors.lightText,
  },
  label: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.lightText,
    marginBottom: 4,
    textAlign: "center",
  },
  labelResult: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.darkText,
    marginBottom: 4,
    textAlign: "center",
  },
  finishButtonWrapper: {
    position: "absolute",
    bottom: 10,
    marginLeft: "5%",
    marginRight: "5%",
    left: 0,
    right: 0,
    width: "90%",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
