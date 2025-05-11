// components/JournalPromptCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";

export const JournalPromptCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Ionicons name="create-outline" size={24} color={Colors.thirdEyeChakra} style={styles.icon} />
      <Text style={styles.prompt}>{item.prompt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  prompt: {
    fontSize: 16,
    color: Colors.veryDarkGray,
    flex: 1,
    flexWrap: "wrap",
  },
});
