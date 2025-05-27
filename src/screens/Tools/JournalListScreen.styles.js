import { StyleSheet } from "react-native";
import { Colors } from "@/constants";
import { SCREEN_WIDTH } from "@/utils";
import { scaledStyle } from "@/utils";

const rawStyles = {
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: Colors.background || "#f9f9f9",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  search: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray || "#ccc",
  },
  entry: {
    backgroundColor: Colors.offWhite || "#fff",
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
    color: Colors.primaryText || "#333",
  },
  snippet: {
    fontSize: 14,
    color: Colors.secondaryText || "#666",
  },
};


export const styles = StyleSheet.create(scaledStyle(rawStyles));