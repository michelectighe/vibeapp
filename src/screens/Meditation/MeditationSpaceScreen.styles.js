import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";

const rawStyles = {
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  glowCircle: {
    position: "absolute",
    backgroundColor: "rgba(0, 122, 255, 0.5)", // Siri-like blue glow
    shadowColor: "rgba(0, 122, 255, 1)",
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 20, // Android shadow
  },
  blurView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 9999, // Make sure it's fully round
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
