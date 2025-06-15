import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "@/utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    //   paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 70,
    //   backgroundColor: "#f7f3ef",
  },
  scrollView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  scrollContent: {
    paddingTop: 0, // this matches the height of your title/logo area
    paddingBottom: 100,
  },
  cardGradient: {
    width: SCREEN_WIDTH * 0.93,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.buttonText,
  },
  screenTitle: {
    fontSize: 26,
    fontFamily: Fonts.bold,
    color: Colors.buttonText,
    marginTop: 12,
    paddingHorizontal: 20,
  },
  introText: {
    fontSize: 15,
    fontFamily: Fonts.body,
    color: Colors.buttonText,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    marginBottom: 12,
    marginLeft: 20,
    color: Colors.white,
    textShadowRadius: 2,
    textShadowOffset: { width: 2, height: 2 },
  },
  cardRow: {
    marginLeft: SCREEN_WIDTH * 0.025,
    gap: SCREEN_WIDTH * 0.025,
    paddingHorizontal: 4,
  },
});
