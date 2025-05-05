import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

const rawStyles = {
  title: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
  },
  middle: {
    flex: 1,
    width: "50%",
    backgroundColor: "transparent",
  },
  wordList: {
    marginTop: 20,
    alignItems: "center",
    alignContent: "center", 
    width: "100%",
  },
  optionsList: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#dfe6e9",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
  },
  bottom: {
    position: "absolute",
    bottom: "10%",
    width: "90%",
    alignContent: "center",
    alignItems: "center",
  },
  resultCard: {
    backgroundColor: "#ffeaa7",
    width: "100%",
    height: 150,
    padding: 20,
    borderRadius: 10,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultFrequency: {
    fontSize: 16,
    marginBottom: 10,
  },
  resultMeaning: {
    fontSize: 16,
  },
  bottomButton: {
    marginTop: 30,
    width: "100%",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
