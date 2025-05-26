import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@/constants";
import { SCREEN_WIDTH } from "@/utils";
import { scaledStyle } from "@/utils";

const rawStyles = {
  container: {
    marginTop: 100,
    alignItems: "center",
    flex: 1,
  },
  newsView: {
    backgroundColor: Colors.surface,
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: Colors.textLight,
    marginBottom: 20,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  image: {
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.textDark,
    marginBottom: 10,
    fontFamily: Fonts.body,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
    color: Colors.textDark,
    fontFamily: Fonts.body,
  },
  vibe: {
    marginTop: 40,
    fontSize: 20,
    textAlign: "center",
    color: Colors.heartChakra,
    fontWeight: "500",
    textShadowColor: "black",
    textShadowRadius: 2,
    textShadowOffset: { width: 2, height: 2 },
  },
  link: {
    color: Colors.link,
    textDecorationLine: "underline",
    fontSize: 16,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
