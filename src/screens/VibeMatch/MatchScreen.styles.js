import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  container: {
    paddingTop: 0,
    paddingHorizontal: 0,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    marginTop: 100,
    textAlign: "center",
    width: SCREEN_WIDTH * 0.9,
    color: Colors.textLight,
  },
  scrollView: {
    width: SCREEN_WIDTH,
  },
  scrollContent: {
    paddingTop: 75, // this matches the height of your title/logo area
    paddingHorizontal: 20,
    paddingBottom: 160,
  },
  scoreBox: {
    alignItems: "center",
    marginBottom: 20,
  },
  score: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.textLight,
  },
  label: {
    fontSize: 16,
    color: Colors.textLight,
  },
  vs: {
    fontSize: 32,
    color: Colors.textLight,
    marginVertical: 10,
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    color: Colors.textLight,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
