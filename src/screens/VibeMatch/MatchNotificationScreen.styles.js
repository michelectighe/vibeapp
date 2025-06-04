// MatchNotificationsScreen.styles.js
import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@/constants";
import { SCREEN_WIDTH } from "@/utils";

export const styles = StyleSheet.create({
  scrollView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  scrollContent: {
    paddingTop: 190, // this matches the height of your title/logo area
    //    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textDark,
    textAlign: "center",
    marginTop: 20,
  },
  matchView: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: Colors.surface,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 20,
  },
  sectionTitle: {
    fontFamily: Fonts.medium,
    fontSize: 20,
    color: Colors.textDark,
    marginTop: 16,
    marginBottom: 8,
  },
  matchCard: {
    backgroundColor: Colors.gradient1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: SCREEN_WIDTH * 0.8,
  },
  cardTitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textLight,
  },
  cardStatus: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textLight,
  },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textLight,
    fontStyle: "italic",
    marginVertical: 8,
  },
});
