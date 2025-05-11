import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  container: {
    flex: 1,
    backgroundColor: Colors.burntOrange,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.darkText,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.meditationText,
    marginBottom: 40,
  },
  visualArea: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  orb: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    opacity: 0.6,
    shadowColor: Colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
    shadowOpacity: 0.8,
  },
  continueButton: {
    marginTop: 60,
    backgroundColor: Colors.meditationText,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  continueText: {
    color: Colors.peach,
    fontSize: 16,
    fontWeight: "600",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
