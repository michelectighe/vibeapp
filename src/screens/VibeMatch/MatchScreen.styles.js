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
    fontWeight: "bold",
    marginBottom: 0,
    color: "#fff",
  },
  scoreBox: {
    alignItems: "center",
    marginBottom: 20,
  },
  score: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
  },
  label: {
    fontSize: 16,
    color: "#f5f5f5",
  },
  vs: {
    fontSize: 32,
    color: "#ccc",
    marginVertical: 10,
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#f0f0f0",
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
