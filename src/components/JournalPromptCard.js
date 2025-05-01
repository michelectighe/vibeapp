// components/JournalPromptCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const JournalPromptCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Ionicons
        name="create-outline"
        size={24}
        color="#9C27B0"
        style={styles.icon}
      />
      <Text style={styles.prompt}>{item.prompt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
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
    color: "#333",
    flex: 1,
    flexWrap: "wrap",
  },
});

export default JournalPromptCard;
