import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const ExpandableInfoItem = ({ icon, title, description }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Icon name={icon} size={22} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={toggleExpand}>
          
          <Icon name="help-circle-outline" size={30} color="#555" />
        </TouchableOpacity>
      </View>
      {expanded && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 10,
    color: "#333",
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  description: {
    marginTop: 10,
    color: "#555",
    fontSize: 14,
    lineHeight: 20,
  },
});
