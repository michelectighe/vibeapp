import React from "react";
import { Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@constants";

export const BreathingPatternSelector = ({ patterns, selectedId, onSelect }) => {
  return (
    <FlatList
      horizontal
      data={patterns}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const isSelected = item.id === selectedId;
        return (
          <TouchableOpacity
            style={[styles.card, isSelected && styles.selectedCard]}
            onPress={() => onSelect(item)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.timing}>
              {item.inhale}-{item.hold1}-{item.exhale}
              {item.hold2 ? `-${item.hold2}` : ""}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 160,
    height: "60%",
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: Colors.mediumText,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.darkText,
  },
  timing: {
    fontSize: 14,
    marginTop: 4,
    color: Colors.darkText,
  },
});
