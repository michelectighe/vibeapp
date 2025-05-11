import { StyleSheet } from "react-native";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";

const rawStyles = {
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardButton: {
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textBase: {
    marginTop: 0,
    textAlign: "center",
    color: Colors.lightText,
    fontFamily: Fonts.AppFont,
    fontWeight: "600",
  },
  labelText: {
    fontFamily: Fonts.AppFont,
    marginBottom: 15,
    fontSize: 24,
    color: Colors.meditationText,
  },
  scoreText: {
    fontSize: 24,
    marginTop: 20,
  },
  bottomRow: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  bottomInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "38%",
    marginTop: 40,
  },
  bottomColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "50%",
    marginTop: 40,
  },
  animatedButtonWrapper: {
    overflow: "hidden",
    borderRadius: 70,
    backgroundColor: "transparent",
    height: 150,
    width: 150,
    alignItems: "center",
    alignContent: "center",
    top: 0,
  },
  animatedImage: {
    width: 150,
    height: 150,
    backgroundColor: "transparent",
    alignSelf: "center",
    position: "absolute",
    marginTop: 10,
    left: 0,
    right: 0,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50%",
  },
  glowCircle: {
    position: "absolute",
    backgroundColor: "rgba(0, 122, 255, 0.5)", // Siri-like blue glow
    shadowColor: "rgba(0, 122, 255, 1)",
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 20, // Android shadow
  },
  blurView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 9999, // Make sure it's fully round
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
