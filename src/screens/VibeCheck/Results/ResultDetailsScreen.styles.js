import { StyleSheet } from "react-native";
import { Fonts } from "@constants";
import { scaledStyle } from "@utils";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    position: "absolute",
    top: "10%",
    marginTop: "10%",
  },
  overallLabel: {
    textAlign: "center",
    color: "white",
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 },
    fontSize: 36,
  },
  textContainer: {
    margin: 20,
    marginTop: 0,
    borderRadius: 20,
    padding: 10,
  },
  overallText: {
    textAlign: "center",
    fontSize: 18,
    color: "#f5f6fa",
  },
  textHeader: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#f5f6fa",
  },
  chicletHeader: {
    textAlign: "center",
    fontSize: 18,
    color: "#f5f6fa",
    marginBottom: 10,
  },
  chicletWrapper: {
    marginTop: 10,
    marginBottom: 10,
    gap: 10,
    alignItems: "center",
  },
  finalNote: {
    textAlign: "center",
    fontSize: 18,
    color: "#f5f6fa",
  },
});
