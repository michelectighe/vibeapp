// ChakraDetailModalStyles.js
import { StyleSheet, Dimensions } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = scaledStyle(
  StyleSheet.create({
    expandingCard: {
      position: "absolute",
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      padding: 24,
    },
    title: {
      fontSize: 32,
      fontFamily: Fonts.AppTitle,
      color: Colors.white,
      marginBottom: 10,
    },
    description: {
      fontSize: 18,
      fontFamily: Fonts.AppFont,
      color: Colors.white,
      marginHorizontal: 20,
      textAlign: "center",
    },
    score: {
      marginTop: 10,
      fontSize: 20,
      fontWeight: "bold",
      color: Colors.white,
    },
    insightContainer: {
      marginTop: 30,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderRadius: 12,
      padding: 16,
    },
    insightTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: Colors.white,
      marginBottom: 8,
      textAlign: "center",
    },
    insightAdvice: {
      fontSize: 16,
      color: Colors.white,
      textAlign: "center",
    },
  }),
);
