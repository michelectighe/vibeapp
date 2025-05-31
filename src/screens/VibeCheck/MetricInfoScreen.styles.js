import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  safeArea: {
    marginTop: 10,
  },
//   scrollView: {
//     position: "absolute",
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     zIndex: 1,
//   },
//   scrollContent: {
//  //   paddingTop: 170, // this matches the height of your title/logo area
//     paddingHorizontal: 20,
//  //   paddingBottom: 160,
//   },
  scrollView: {
    paddingHorizontal: 16,
    paddingTop: 120,
    marginBottom: 50,
  },
  scrollContent: {
    paddingTop: 0, // this matches the height of your title/logo area
 //   paddingHorizontal: 0,
    paddingBottom: 100,
  },
  // contentContainer: {
     paddingBottom: 2000,
  // },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
