// components/ComparisonCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { comparisonText, Colors, Fonts } from "@constants";
import { SCREEN_WIDTH } from "@/utils";

export const ComparisonCard = ({ keyName, myVal, theirVal, category, label, description }) => {
  const categoryLabels = {
    aligned: "Perfect Match",
    slightlyDifferent: "Slightly Different",
    moderatelyDifferent: "Moderate Gap",
    completelyUnaligned: "Major Contrast",
  };

  const colorMap = {
    aligned: Colors.divineColor1,
    slightlyDifferent: Colors.yellow,
    moderatelyDifferent: Colors.orange,
    completelyUnaligned: Colors.red,
  };
  //  console.log("myVal:", myVal);
  // console.log("categoryLabels[category", categoryLabels[category]);
  return (
    <View style={[styles.card, { borderLeftColor: colorMap[category], borderLeftWidth: 4 }]}>
      <Text style={styles.metric}>{label}</Text>
      <Text style={styles.label}>{categoryLabels[category]}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.values}>
        You: {myVal} | Them: {theirVal}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metric: {
    fontSize: 18,
    fontFamily: Fonts.Bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.body,
    color: Colors.textDark,
    marginBottom: 8,
  },
  values: {
    fontSize: 16,
    fontFamily: Fonts.body,
    color: Colors.textSecondary,
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.body,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 8,
  },
});
