import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  error: {
    color: Colors.white,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
   icon: {
      width: 32,
      height: 32,
      marginRight: 12,
    },
    input: {
      width: "100%",
      backgroundColor: Colors.white,
      padding: 12,
      borderRadius: 15,
      marginBottom: 15,
      fontSize: 16,
      //   textAlignVertical: "top",
    },
  eyeIcon: {
    padding: 8,
  },
};
export const styles = StyleSheet.create(scaledStyle(rawStyles));
