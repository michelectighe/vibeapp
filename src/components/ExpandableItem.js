import React, { useState } from "react";
import { ScrollView, LayoutAnimation, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { globalStyles } from "@/styles";

export const ExpandableItem = ({ title, description, onToggle }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
    if (onToggle) {
      onToggle(); // Inform the parent about the toggle so it can update its layout
    }
  };

  return (
    <View style={[styles.itemContainer]}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={[styles.title, { color: Colors.textPrimary }]}>{title}</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={Colors.textPrimary}
        />
      </TouchableOpacity>
      {expanded && (
        <ScrollView
          style={globalStyles.scrollView}
          contentContainerStyle={globalStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.description, { color: Colors.textSecondary }]}>{description}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 8,
    borderBottomWidth: 0,
    borderBottomColor: Colors.lightGray,
    paddingVertical: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 8,
    flex: 1,
    fontSize: 12,
  },
  content: {
    overflow: "hidden",
  },
  description: {
    paddingHorizontal: 32,
    paddingVertical: 8,
    fontSize: 12,
  },
});
