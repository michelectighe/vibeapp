import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@/constants";
import {  SCREEN_WIDTH, SCREEN_HEIGHT } from "@/utils";
import { scaledStyle } from "@/utils";


const rawStyles = {
  container: {
    flex: 1,
    alignItems: "center",
  },
  list: {
    marginTop: 100,
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.7,
    backgroundColor: Colors.paleYellow,
    borderRadius: 6,
    padding: 10,
  },
  item: {
    padding: 16,
    backgroundColor: "#ffe",
    marginBottom: 6,
    borderRadius: 6,
  },
  title: {
    fontWeight: "bold",
  },
  bottomSection: {
    flex: 2,
    justifyContent: "left",
    alignItems: "left",
    paddingBottom: 150,
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 24,
    fontWeight: "600",
    minHeight: 26,
  },
  desc: {
    fontSize: 14,
    color: "#666",
  },
  datePicker: {
    position: "absolute",
    bottom: 100,
  },
  localModalContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
