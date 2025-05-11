import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  header: {
    marginTop: -20,
  },
  title: {
    fontSize: 28,
    color: Colors.white,
    fontFamily: Fonts.title,
    marginBottom: 10,
    textAlign: "center",
  },
  summary: {
    fontSize: 18,
    color: Colors.veryLightGray,
    textAlign: "center",
    marginBottom: 15,
  },
  scroll: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  scrollContent: {
    paddingBottom: 160,
  },
  sectionTitle: {
    fontSize: 22,
    color: Colors.lightGray,
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 8,
  },
  noData: {
    color: Colors.mediumGray,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 10,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
