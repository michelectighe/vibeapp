import React, { useState } from "react";
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { hawkinsLevels } from "@/data/hawkinsLevels";
import { Colors , Fonts} from "@/constants";
import {  scaledStyle, hexToRgba } from "@/utils";
import { CardGradient } from "./CardGradient";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export const HawkinsLevelExpandable = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <CardGradient style={styles.gradient}>
        <TouchableOpacity onPress={toggleExpand} style={styles.expandHeader}>
          <Text style={styles.expandTitle}>Hawkins Scale Levels</Text>
          <Icon
            name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
            size={24}
            color={Colors.buttonText}
          />
        </TouchableOpacity>

        {expanded && (
          <View style={styles.levelList}>
            {hawkinsLevels.map((item) => (
              <View key={item.level} style={styles.levelItem}>
                <View style={styles.levelRow}>
                  <Text style={styles.levelLabel}>Level {item.level}</Text>
                  <Text style={styles.state}>{item.state}</Text>
                </View>
                <Text style={styles.emotion}>Emotion: {item.emotion}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            ))}
          </View>
        )}
      </CardGradient>
    </View>
  );
};

const rawStyles = {
  container: {
  //  paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
  },
  expandHeader: {
 //   backgroundColor: hexToRgba(Colors.gradient4),
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  expandTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.buttonText,
    fontFamily: Fonts.bold,

  },
  levelList: {
    marginTop: 12,
    gap: 16,
  },
  levelItem: {
 //   backgroundColor: hexToRgba(Colors.gradient4, 0.6),
    padding: 14,
    borderRadius: 10,
  },
  levelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  levelLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.buttonText,
  },
  state: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.buttonText,
  },
  emotion: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.buttonText,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: Colors.buttonText,
    lineHeight: 20,
  },
};


const styles = scaledStyle(rawStyles);