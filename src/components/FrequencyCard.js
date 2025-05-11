// components/FrequencyCard.js
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";

export const FrequencyCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress?.(item)}>
      <Ionicons name="musical-notes-outline" size={24} color={Colors.veryDarkGray} style={styles.icon} />
      <Text style={styles.title}>{item.hz}hz - </Text>
      <Text style={styles.title}>{item.description}</Text>
    </TouchableOpacity>
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
  title: {
    fontSize: 16,
    color: Colors.veryDarkGray,
  },
});
