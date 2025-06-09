import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  yearLabel: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  chartItem: {
    alignItems: "center",
    width: 60,
    marginHorizontal: 4,
    justifyContent: "flex-end", // 👈 this is the fix
    height: SCREEN_HEIGHT * 0.2, // give it a fixed height to align from bottom
  },
  chartItemSelected: {
    borderWidth: 2,
    borderColor: "#999",
  },
  bar: {
    width: 30,
    borderRadius: 6,
    marginBottom: 4,
  },

  chartLabel: {
    fontSize: 12,
    color: "#666",
  },

  detailsBox: {  
    width: SCREEN_WIDTH * 0.9,
height: SCREEN_HEIGHT *.22,
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "transparent",
  //  borderWidth: 1,
  //  borderColor: Colors.lightGray,
    marginTop: 30,
    overflow: "hidden",
   // flexShrink: 1, // prevents overflow but allows flexible sizing
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  detailScore: {
    fontSize: 18,
    marginTop: 10,
    color: Colors.veryDarkGray,
  },
  detailText: {
    marginTop: 8,
    fontWeight: "bold",
    color: Colors.primary,
    fontSize: 16,
  },

  detailDescription: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.mediumGray,
  },

  detailSuggestion: {
    marginTop: 8,
    fontSize: 14,
    fontStyle: "italic",
    color: Colors.deepPurple, // or whatever your 'inspiration' color is
  },
  detailDate: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 4,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
