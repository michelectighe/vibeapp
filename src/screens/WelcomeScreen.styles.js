import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";

const rawStyles = {
  welcomeText: {
    width: "100%",
    textAlign: "center",
    fontSize: 28,
    color: Colors.darkText,
  //  marginBottom: 20,
    fontFamily: Fonts.AppFontBold,
  },

  infoCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    width: 280,
    height: "100%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },

  cardTitle: {
    position: "absolute",
    top: "20%",
    left: 0,
    right: 0,
    fontSize: 22,
    color: Colors.darkText,
    marginBottom: 30,
    fontFamily: Fonts.AppFont,
    textAlign: "center",
  },

  cardDescription: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "65%",
   // bottom: "25%",
    fontSize: 16,
    color: Colors.darkText,
    fontFamily: Fonts.AppFont,
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonWrapper: {
    marginTop: "20%",
    width: "90%",
    backgroundColor: "transparent",
  },
  welcomeTextBottom: {
    width: "100%",
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: Colors.darkText,
    fontFamily: Fonts.AppFontBold,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
