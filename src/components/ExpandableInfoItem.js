import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { scaledStyle } from "@utils";
import { Colors, Fonts } from "@/constants";
import { CardGradient } from "./CardGradient";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const ExpandableInfoItem = ({ icon, title, description }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <CardGradient style={styles.gradient}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Icon name={icon} size={22} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={toggleExpand}>
            <Icon name="help-circle-outline" size={30} color={Colors.buttonText} />
          </TouchableOpacity>
        </View>
        {expanded && <Text style={styles.description}>{description}</Text>}
      </View>
    </CardGradient>
  );
};

const rawStyles = {
  gradient: {
marginVertical: 10,
  },
  card: {
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    shadowColor: Colors.cardText,
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
    color: Colors.buttonText,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.buttonText,
    fontFamily: Fonts.body,
  },
  description: {
    marginTop: 10,
    color: Colors.buttonText,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.body,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));