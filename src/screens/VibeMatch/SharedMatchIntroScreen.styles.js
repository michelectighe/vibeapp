import { Fonts, Colors } from "@/constants";
import { StyleSheet } from "react-native";
import { scaledStyle } from "@/utils";


const rawStyles = {
  container: {
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textLight,
    fontFamily: Fonts.title,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: "center",
    marginBottom: 40,
    fontFamily: Fonts.subtitle,
  },
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));