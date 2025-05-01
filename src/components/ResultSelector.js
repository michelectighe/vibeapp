// components/ResultSelector.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { vibrationLevels } from "@data";
import { Fonts } from "@constants";
import { hexToRgba } from "@utils";

export default function ResultSelector({ results, onSelect, onShare }) {
  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "";
    return timestamp.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getVibrationLevel = (score) => {
    return (
      vibrationLevels.find((level) => score >= level.minScore) ??
      vibrationLevels[vibrationLevels.length - 1]
    );
  };

  const renderItem = ({ item }) => {
    const level = getVibrationLevel(item.overallVibrationScore);
    const levelColor = hexToRgba(level.color, 0.7);
    return (
      <TouchableOpacity style={styles.card} onPress={() => onSelect(item)}>
        <View style={[styles.card, { backgroundColor: levelColor }]}>
          <View style={styles.cardTop}>
            <Text style={styles.label}>{level.label}</Text>
            <Ionicons
              name="share-outline"
              size={20}
              color="#fff"
              onPress={() => onShare(item)}
              style={styles.shareIcon}
            />
          </View>
          <Text style={styles.score}>
            {item.overallVibrationScore.toFixed(0)}
          </Text>
          <Text style={styles.date}>{formatDate(item.timestamp)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 0,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  label: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
    color: "#fff",
  },
  score: {
    fontSize: 36,
    fontFamily: Fonts.Bold,
    color: "#fff",
    alignSelf: "center",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#f9f9f9",
    alignSelf: "center",
  },
  shareIcon: {
    padding: 6,
  },
});
