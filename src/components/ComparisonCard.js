import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Fonts } from "@/constants";


export const ComparisonCard = ({
  label,
  recipientVal,
  senderVal,
  description,
  recipientUserName,
  senderUserName,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <View style={styles.side}>
          <Text style={styles.sideLabel}>{recipientUserName}</Text>
          <Text style={styles.value}>{recipientVal}</Text>
        </View>
        <View style={styles.side}>
          <Text style={styles.sideLabel}>{senderUserName}</Text>
          <Text style={styles.value}>{senderVal}</Text>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.buttonBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.buttonText,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  side: {
    flex: 1,
    paddingHorizontal: 8,
  },
  sideLabel: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.buttonText,
    marginBottom: 4,
  },
  value: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: Colors.buttonText,
  },
  description: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.buttonText,
    marginTop: 8,
  },
});
