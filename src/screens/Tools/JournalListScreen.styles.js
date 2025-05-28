import { StyleSheet } from "react-native";
import { Colors } from "@/constants";
import { SCREEN_WIDTH } from "@/utils";
import { scaledStyle } from "@/utils";

const rawStyles = {
  search: {
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginTop: 120,
    width: SCREEN_WIDTH * 0.9,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    alignSelf: "center",
  },
  scrollView: {
    position: "absolute",
    top: 50,
    //   bottom: 80,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  scrollContent: {
    paddingTop: 190, // this matches the height of your title/logo area
    paddingHorizontal: 20,
    paddingBottom: 160,
  },
  entry: {
    backgroundColor: Colors.surface || "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  prompt: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: Colors.textDark || "#333",
  },
  snippet: {
    fontSize: 14,
    color: Colors.textDark || "#666",
  },
  new: {
    marginTop: 20,
    width: SCREEN_WIDTH * .5,
    alignSelf: "center"
  },
};


export const styles = StyleSheet.create(scaledStyle(rawStyles));