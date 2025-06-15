// components/MeditationCard.js
import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { hexToRgba, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { Colors } from "@/constants";
import { CardGradient } from "./CardGradient";

export const CardTools = ({ item, onPress, bgColor, textColor, isPlaying = null }) => {
  const iconPlayingName = isPlaying ? "stop-circle-outline" : "play-circle-outline";
  //  bgColor = hexToRgba(bgColor, 0.5)
  return (
    <CardGradient style={styles.card} colors={[bgColor, textColor]}>
      <TouchableOpacity
        style={[{ backgroundColor: "transparent", width: "100%", height: "100%" }]}
        onPress={() => onPress?.(item)}
      >
        <Ionicons name={item.icon} size={24} color={Colors.white} style={styles.icon} />

        <Text style={[styles.title, { color: Colors.white }]}>{item.title}</Text>
        {isPlaying !== null && (
          <Ionicons
            name={iconPlayingName}
            size={30}
            color={Colors.white}
            style={styles.iconPlaying}
          />
        )}
        <Text style={[styles.description, { color: Colors.white }]}>{item.description}</Text>
        {item.inhale && (
          <Text style={styles.description}>
            {item.inhale}-{item.hold1}-{item.exhale}
            {item.hold2 ? `-${item.hold2}` : ""}
          </Text>
        )}
      </TouchableOpacity>
    </CardGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: SCREEN_HEIGHT * 0.2,
    width: SCREEN_WIDTH * 0.9,
  },
  icon: {
    position: "absolute",
    left: "10%",
    top: "25%",
    padingRight: 100,
    width: "15%",
  },
  iconPlaying: {
    marginTop: 10,
    alignSelf: "center",
    //   width: "25%",
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    width: "100%",
    color: Colors.white,
  },

});
