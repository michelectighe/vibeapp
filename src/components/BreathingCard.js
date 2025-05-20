// components/BreathingCard.js
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { SCREEN_HEIGHT } from "@/utils";

export const BreathingCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress?.(item)}>
      <Ionicons name="infinite" size={24} color={Colors.infinityIcon} style={styles.icon} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.timing}>
        {item.inhale}-{item.hold1}-{item.exhale}
        {item.hold2 ? `-${item.hold2}` : ""}
      </Text>
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
    justifyContent: "center",
    height: SCREEN_HEIGHT * .1,
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: Colors.veryDarkGray,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.darkText,
  },
  timing: {
    fontSize: 14,
    marginLeft: 5,
    marginTop: 2,
    color: Colors.darkText,
  },
});
