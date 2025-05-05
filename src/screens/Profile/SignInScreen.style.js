import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  error: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  
  eyeIcon: {
    padding: 8,
  },
  forgot: {
    color: "white",
    marginTop: 0,
    fontSize: 14,
    marginBottom: 20,
  },
  link: {
    color: "white",
    marginBottom: 20,
    fontSize: 18,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
