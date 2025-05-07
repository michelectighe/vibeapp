// components/ComparisonCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { comparisonText, Colors, Fonts } from "@constants";

const getScoreRange = (score) => {
  if (score < 25) return "low";
  if (score < 75) return "medium";
  return "high";
};

const getLabel = (key) => {
  const labels = {
    emotionScore: "Emotional State",
    heartRateScore: "Heart Rate",
    hrvScore: "Heart Rate Variability",
    motionScore: "Motion / Stillness",
    voiceFrequencyScore: "Voice Frequency",
    voiceClarityScore: "Voice Clarity",
    voiceStrengthScore: "Voice Strength",
    environmentScore: "Environment",
  };
  return labels[key] || key;
};

export const ComparisonCard = ({ keyName, myVal, theirVal }) => {
  const myRange = getScoreRange(myVal);
  const theirRange = getScoreRange(theirVal);
  const label = getLabel(keyName);

  if (myRange === theirRange) {
    const text = comparisonText[keyName]?.[myRange] || `Both scored in the ${myRange} range.`;
    return (
      <View style={styles.similarCard}>
        <Text style={styles.cardLabel}>{label}</Text>
        <Text style={styles.cardBody}>Both: {text}</Text>
      </View>
    );
  }

  const userText = comparisonText[keyName]?.[myRange] || `You scored ${myVal.toFixed(0)}`;
  const themText = comparisonText[keyName]?.[theirRange] || `They scored ${theirVal.toFixed(0)}`;

  return (
    <View style={styles.splitCard}>
      <View style={styles.halfCard}>
        <Text style={styles.cardLabel}>You</Text>
        <Text style={styles.cardBody}>{userText}</Text>
      </View>
      <View style={styles.halfCard}>
        <Text style={styles.cardLabel}>Them</Text>
        <Text style={styles.cardBody}>{themText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  similarCard: {
    backgroundColor: Colors.matchSimilarCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  splitCard: {
    flexDirection: "row",
    marginBottom: 14,
    backgroundColor: "#444",
    borderRadius: 12,
    overflow: "hidden",
  },
  halfCard: {
    flex: 1,
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: "#333",
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#aaa",
    marginBottom: 4,
  },
  cardBody: {
    fontSize: 16,
    color: "#fff",
  },
});
