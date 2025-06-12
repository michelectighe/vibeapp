import React, {} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { vibrationLevels } from "@data";
import { Fonts, Colors } from "@constants";
import {  scaledStyle, parseMetric } from "@utils";
import LinearGradient from "react-native-linear-gradient";

export const ResultSelector = ({ results, onSelect, onShare, onTrash, showIcons = true }) => {
  console.log("results in resultselect:", results);
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
        const hawkins = parseMetric(item.hawkinsScore);
        const level = getVibrationLevel(item.overallVibrationScore);
        // const levelColor = hexToRgba(level.color3, 0.7);

        return (
          <View key={item.resultId} style={styles.outsideGradient}>
            <LinearGradient
              colors={[level.color, level.color2, level.color4]} // Adjust gradient stops
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientWrapper}
            >
              <View style={[styles.card,]}>
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
                  <Text style={[styles.score, { color: level.color3 }]}>{hawkins.score}</Text>
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
            </LinearGradient>
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
    backgroundColor: "white",
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
    //   backgroundColor: Colors.cardBackground,
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
