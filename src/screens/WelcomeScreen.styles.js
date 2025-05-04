import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  topContainer: {
    flex: 1,
    marginTop: "10%",
    width: "100%",
    alignItems: "center",
  },
  welcomeText: {
    width: "80%",
    textAlign: "center",
    fontSize: 28,
    color: Colors.darkText,
    // fontWeight: "600",
    marginBottom: 20,
    fontFamily: Fonts.AppFontBold,
  },
  cardScrollContainer: {
    marginTop: 30,
    height: 200,
  },

  cardScrollContent: {
    paddingHorizontal: 20,
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
    fontSize: 22,
    fontWeight: "600",
    color: Colors.darkText,
    marginBottom: 6,
    fontFamily: Fonts.AppFont,
    textAlign: "center",
  },

  cardDescription: {
    fontSize: 16,
    color: Colors.darkText,
    fontFamily: Fonts.AppFont,
    textAlign: "justify",
  },
  buttonWrapper: {
    alignSelf: "center",
    width: "80%",
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
