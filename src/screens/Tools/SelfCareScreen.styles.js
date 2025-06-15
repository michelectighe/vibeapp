// SelfCareScreen.styles.js
import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@/constants";
import { SCREEN_WIDTH } from "@/utils";

export const styles = StyleSheet.create({
  imageBackground: {
flex: 1,
  },
  header: {
    marginTop: 100,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  categoryButton: {
    backgroundColor: Colors.overlay,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  activeCategory: {
    backgroundColor: Colors.accent,
  },
  categoryText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.text,
  },
  option: {
    backgroundColor: Colors.buttonBackground,
    marginVertical: 6,
    marginHorizontal: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.text,
  },
  carePlanContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  carePlanTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    marginBottom: 8,
    color: Colors.text,
  },
  carePlanItem: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    marginBottom: 4,
    color: Colors.text,
  },
});
