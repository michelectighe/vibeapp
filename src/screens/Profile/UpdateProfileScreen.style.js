import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  /** @type {import('react-native').ViewStyle} */
    titleWrapper: {
    position: "absolute",
    top: 100,
    width: SCREEN_WIDTH,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    position: "absolute",
    top: 0,
    marginBottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 30,
    color: Colors.darkText,
    fontFamily: Fonts.AppFont,
  },
  toggles: {
    flexDirection: "row",
    justifyContent: "left",
    marginBottom: 20,
    marginLeft: 10,
  },
  switchText: {
    color: Colors.lightText,
    marginLeft: 10,
    marginTop: 5,
  },
  inputGoals: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
    // textAlignVertical: "top",
    //height: SCREEN_HEIGHT * 0.1,
    //  width: SCREEN_WIDTH * 0.9,
    textAlign: "center",
  },
  subtitle: {
    color: Colors.lightText,
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
  bottomButtons: {
    backgroundColor: "transparent",
    width: SCREEN_WIDTH * 0.9,
    justifyContent: "flex-start",
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  justifyContent: "center",
  alignItems: "center",
},

modalContent: {
  backgroundColor: Colors.cardBackground || "#FFF8EE",
  borderRadius: 16,
  padding: 24,
  width: "80%",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  alignItems: "center",
},

modalText: {
  fontSize: 16,
  color: Colors.darkText,
  marginBottom: 16,
  textAlign: "center",
  fontFamily: Fonts.AppFont || undefined,
},

modalButton: {
  backgroundColor: Colors.buttonBackground,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
},

modalButtonText: {
  color: Colors.lightText,
  fontWeight: "bold",
  fontSize: 16,
},

};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
