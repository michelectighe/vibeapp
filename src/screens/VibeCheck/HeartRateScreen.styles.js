import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  cameraContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    //  marginHorizontal: 20,
    padding: 10,
    flex: 1,
    width: SCREEN_WIDTH * 0.7, // ✅ Force full width
    maxWidth: "70%", // ✅ Ensure it doesn’t shrink
    alignSelf: "center", // ✅ Take full horizontal space of parent
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.black,
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
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.4,
  },
  labelTitle: {
    fontSize: 18,
   // fontWeight: "600",
    color: Colors.textDark,
    marginBottom: 16,
    textAlign: "center",
    FontFamily: Fonts.body,
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "50%",
    gap: 16,
  },
  column: {
    flex: 1,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 14,
    color: Colors.textDark,
    FontFamily: Fonts.body,
    width: "100%",
    marginBottom: 9,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  labelResult: {
    fontSize: 14,
  //  fontWeight: "600",
    color: Colors.textDark,
    marginBottom: 16,
    fontFamily: Fonts.body,
  },
  singleRow: {
    width: SCREEN_WIDTH * 0.9,
    marginTop: 8,
  },
  finishButtonWrapper: {
    position: "absolute",
    top: 110, // Just below the camera
    alignSelf: "center",
    width: "70%",
    zIndex: 5,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
