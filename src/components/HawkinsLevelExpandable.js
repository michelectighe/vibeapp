import React, { useState } from "react";
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native";
import { hawkinsLevels } from "@/data/hawkinsLevels";
import { Colors } from "@/constants";
import { scale, scaledStyle } from "@/utils";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export const HawkinsLevelExpandable = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <View style={styles.container}>
      {hawkinsLevels.map((item, index) => (
        <View key={item.level} style={styles.card}>
          <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.header}>
            <Text style={styles.levelText}>Level {item.level}</Text>
            <Text style={styles.stateText}>{item.state}</Text>
          </TouchableOpacity>
          {expandedIndex === index && (
            <View style={styles.details}>
              <Text style={styles.label}>
                Emotion: <Text style={styles.emotion}>{item.emotion}</Text>
              </Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};



const rawStyles = {
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    marginBottom: 12,
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textDark,
  },
  stateText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.textMedium,
  },
  details: {
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    color: Colors.textDark,
    marginBottom: 4,
  },
  emotion: {
    fontWeight: "bold",
    color: Colors.accent,
  },
  description: {
    fontSize: 14,
    color: Colors.textDark,
  },
};

const styles = scaledStyle(rawStyles);