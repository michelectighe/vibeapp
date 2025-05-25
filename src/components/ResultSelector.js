import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { vibrationLevels } from "@data";
import { Fonts, Colors } from "@constants";
import { hexToRgba, scaledStyle } from "@utils";

export const ResultSelector = ({ results, onSelect, onShare, onTrash, showIcons = true }) => {
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
        // const levelColor = hexToRgba(level.color3, 0.7);

        return (
          <View key={item.resultId} style={styles.outsideGradient}>
            <View style={[styles.card]}>
              <View style={styles.cardTop}>
                <Text style={[styles.label, { color: level.color3 }]}>{level.label}</Text>
                {showIcons && (
                  <Ionicons
                    name="share-outline"
                    size={20}
                    color={level.color3}
                    onPress={() => onShare(item)}
                    style={styles.iconShare}
                  />
                )}
              </View>
              <TouchableOpacity style={styles.scoreButton} onPress={() => onSelect(item)}>
                <Text style={[styles.score, { color: level.color3 }]}>
                  {item.overallVibrationScore.toFixed(0)}
                </Text>
              </TouchableOpacity>
              {showIcons && (
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color={level.color3}
                  onPress={() => onTrash(item)}
                  style={styles.iconTrash}
                />
              )}
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
  iconShare: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  iconTrash: {
    position: "absolute",
    top: 5,
    left: 5,
    padding: 14,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
