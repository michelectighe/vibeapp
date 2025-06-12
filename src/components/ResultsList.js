import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { vibrationLevels } from "@data";
import { Fonts, Colors } from "@constants";
import {  scaledStyle } from "@utils";
export const ResultsList = ({ results, onSelect }) => {
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

  return (
    <View>
      {results.map((item) => {
        const level = getVibrationLevel(item.overallVibrationScore);

        return (
          <View key={item.id} style={styles.outsideGradient}>
            <View style={[styles.card]}>
              <View style={styles.cardTop}>
                <Text style={[styles.label, { color: level.color3 }]}>{level.label}</Text>
                <Ionicons
                  name="share-outline"
                  size={20}
                  color={level.color3}
                  onPress={() => onSelect(item)}
                  style={styles.iconCompare}
                />
              </View>
              <TouchableOpacity style={styles.scoreButton} onPress={() => onSelect(item)}>
                <Text style={[styles.score, { color: level.color3 }]}>
                  {item.hawkinsScore?.score.toFixed(0)}
                </Text>
              </TouchableOpacity>
              <Text style={[styles.date, { color: level.color3 }]}>
                {formatDate(item.timestamp)}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const rawStyles = {
  outsideGradient: {
    borderRadius: 20,
    marginTop: 20,
    overflow: "hidden",
    backgroundColor: Colors.surface,
  },
  card: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
    marginBottom: 0,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
  },
  label: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: Fonts.body,
  },
  score: {
    fontSize: 36,
    fontFamily: Fonts.Bold,
    color: Colors.white,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "25",
  },
  scoreButton: {},
  date: {
    fontSize: 14,
    color: Colors.veryDarkGray,
    alignSelf: "center",
  },
  iconCompare: {
    position: "absolute",
    top: 5,
    right: 5,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
