// MatchNotificationsScreen.styles.js
import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 20,
    //backgroundColor: Colors.surface,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textDark,
    textAlign: "center",
    marginTop: 20,
  },
  sectionTitle: {
    fontFamily: Fonts.medium,
    fontSize: 20,
    color: Colors.textDark,
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textDark,
  },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textLight,
    fontStyle: "italic",
    marginVertical: 8,
  },
});
