import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "transparent",
  },
  innerContainer: {
    marginTop: 100,
    padding: 20,
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
  },
  date: {
    fontSize: 14,
    color: "#888",
    position: "absolute",
    bottom: 0,
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 2,
    marginBottom: 6,
  },
  details: {
    fontSize: 14,
    marginTop: 2,
    color: "#555",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  shareIcon: {
    padding: 6,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
