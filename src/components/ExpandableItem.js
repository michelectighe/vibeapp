import React, { useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const ExpandableItem = ({
  title,
  description,
  themeColors,
  theme,
  onToggle,
}) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

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
        <Text style={[styles.title, { color: Colors.textPrimary }]}>
          {title}
        </Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={Colors.textPrimary}
        />
      </TouchableOpacity>
      {expanded && (
        <ScrollContainer>
          <Text style={[styles.description, { color: Colors.textSecondary }]}>
            {description}
          </Text>
        </ScrollContainer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 8,
    borderBottomWidth: 0,
    borderBottomColor: "#ccc",
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
