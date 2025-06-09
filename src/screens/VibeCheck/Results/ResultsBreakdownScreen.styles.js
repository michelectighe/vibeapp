import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";


const rawStyles = {
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  scrollView: {
    position: "absolute",
    top: 0,
 //   bottom: 80,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  scrollContent: {
    paddingTop: 170, // this matches the height of your title/logo area
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  metricBox: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f3f3f3",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  metricLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
  metricValue: {
    fontSize: 20,
    marginTop: 4,
  },
  metricStatus: {
    fontSize: 14,
    marginTop: 6,
    fontWeight: "500",
  },
  inRange: {
    color: "green",
  },
  outOfRange: {
    color: "orange",
  },
  missing: {
    color: "gray",
  },
  metricExplanation: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
  },
  metricLabelText: {
    marginTop: 6,
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  suboptimal: {
    color: "orange", // warm amber or gold
  },
  outOfRange: {
    color: "#d9534f", // alert red
  },
  inRange: {
    color: "#5cb85c", // green
  },
  missing: {
    color: "#888",
  },
  optimal: {
    color: "blue",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));