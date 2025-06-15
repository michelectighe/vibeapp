import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH, scale, scaledStyle } from "@/utils";
import { Colors, Fonts } from "@/constants";

 const rawStyles = {
   //  mirrorWrapper: {
   //    alignItems: "center",
   //    justifyContent: "center",
   //  },
   mirrorWrapper: {
     alignItems: "center",
     justifyContent: "center",
     shadowColor: "#666",
     shadowOffset: { width: 0, height: 10 },
     shadowOpacity: 0.2,
     shadowRadius: 30,
     elevation: 12,
   },
   mirrorGlowWrapper: {
     alignItems: "center",
     justifyContent: "center",
     position: "relative",
   },

   mirrorGlow: {
     position: "absolute",
     width: SCREEN_WIDTH * 0.95, // slightly larger than mirror
     height: SCREEN_WIDTH * 0.95,
     borderRadius: SCREEN_WIDTH * 0.475,
     opacity: 0.4,
     zIndex: 0,
   },

   lightedBorder: {
     width: SCREEN_WIDTH * 0.8,
     height: SCREEN_WIDTH * 0.8,
     borderRadius: SCREEN_WIDTH * 0.4,
     overflow: "hidden",
     alignItems: "center",
     alignSelf: "center",
     justifyContent: "center",
     position: "relative",
     backgroundColor: "white",

     // 💫 New soft shadow for “floating” effect
     shadowColor: "#000",
     shadowOffset: { width: 0, height: 12 },
     shadowOpacity: 0.15,
     shadowRadius: 24,

     // 💡 For Android
     elevation: 10,
   },

   mirrorContainer: {
     width: SCREEN_WIDTH * 0.75,
     height: SCREEN_WIDTH * 0.75,
     borderRadius: SCREEN_WIDTH * 0.375,
     overflow: "hidden",
     backgroundColor: Colors.cardBackground,
     alignItems: "center",
     alignContent: "center",
     justifyContent: "center",
     zIndex: 2,
   },

   camera: {
     width: "100%",
     height: "100%",
     alignSelf: "center",
   },
   cupboard: {
     width: SCREEN_WIDTH * 0.9,
     height: SCREEN_HEIGHT * 0.2,
     justifyContent: "center",
     alignContent: "center",
   },
   placeholder: {
     width: SCREEN_WIDTH * 0.9,
     height: SCREEN_HEIGHT * 0.3,
     justifyContent: "center",
     alignItems: "center",
     borderRadius: 30,
     backgroundColor: Colors.cardBackground,
     alignSelf: "center",
     marginVertical: 20,
   },
   placeholderText: {
     color: Colors.cardText,
     fontFamily: Fonts.body,
     fontSize: 16,
   },
 };

export const styles = StyleSheet.create(scaledStyle(rawStyles));