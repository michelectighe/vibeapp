import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@utils";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 60,
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.Script,
    textAlign: "center",
    marginBottom: 12,
    color: Colors.vcTextColor,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 12,
    textAlign: "center",
    color: "#333",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 100,
    padding: 10,
  },
  closeIcon: {
    fontSize: 24,
    color: "#333",
  },
});
