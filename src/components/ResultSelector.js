// components/ResultSelector.js
import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { vibrationLevels } from "@data";
import { Fonts, Colors } from "@constants";
import { hexToRgba } from "@utils";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";

export const ResultSelector = ({ results, onSelect, onShare, onTrash }) => {
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
    const levelColor = hexToRgba(level.color3, 0.7);
    return (
      <View style={styles.outsideGradient}>
        <TouchableOpacity style={[styles.card]} onPress={() => onSelect(item)}>
          {/* <View style={[styles.card]}> */}
          <View style={styles.cardTop}>
            <Text style={[styles.label, { color: level.color3 }]}>{level.label}</Text>
            <Ionicons
              name="share-outline"
              size={20}
              color={level.color3}
              onPress={() => onShare(item)}
              style={styles.icon}
            />
          </View>
          <Text style={[styles.score, { color: level.color3 }]}>
            {item.overallVibrationScore.toFixed(0)}
          </Text>
          <Ionicons
            name="trash-outline"
            size={20}
            color={level.color3}
            onPress={() => onTrash(item)}
            style={styles.icon}
          />
          <Text style={[styles.date, { color: level.color3 }]}>{formatDate(item.timestamp)}</Text>
          {/* </View> */}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    />
  );
};
const rawStyles = {
  scrollContent: {
    paddingTop: 150, // this matches the height of your title/logo area
    paddingHorizontal: 20,
    paddingBottom: 160,
  },
  outsideGradient: {
    borderRadius: 20,
    marginTop: 20,
    overflow: "hidden",
    backgroundColor: Colors.surface,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 0,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    //  backgroundColor: "blue"
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  label: {
    fontSize: 20,
    fontFamily: Fonts.body,
  },
  score: {
    fontSize: 36,
    fontFamily: Fonts.Bold,
    color: Colors.white,
    alignSelf: "center",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: Colors.veryDarkGray,
    alignSelf: "center",
  },
  icon: {
    padding: 6,
  },
};
export const styles = StyleSheet.create(scaledStyle(rawStyles));
