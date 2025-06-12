// BreathingAnimation.js
import React, { useEffect } from "react";
import { View, Animated, Text, StyleSheet } from "react-native";
import { playTrack, stopTrack } from "@/services";
import { Colors, Fonts } from "@constants";

export const BreathingAnimation = ({ duration = 60000 }) => {
  const scale = new Animated.Value(1);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.3,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
      { iterations: Math.floor(duration / 8000) },
    );
    loop.start();
    return () => loop.stop();
  }, [duration]); // eslint-disable-line react-hooks/exhaustive-deps

  return <Animated.View style={[styles.circle, { transform: [{ scale }] }]} />;
};



// FrequencyPlayer.js


export const FrequencyPlayer = ({ frequency = 528, label }) => {
  useEffect(() => {
    const freqData = getToneData(frequency);

    playTrack(
      freqData.id,
      freqData.url,
      freqData.title,
      "VibeKey",
      0.06, // gentle volume for frequency audio
      true, // fade in
      true, // loop
    );

    return () => {
      stopTrack();
    };
  }, [frequency]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label || `Playing ${frequency}Hz`}</Text>
    </View>
  );
};

const getToneData = (frequency) => {
  switch (frequency) {
    case 396:
      return {
        id: "freq-396",
        url: require("@assets/audio/frequencies/396hz.mp3"),
        title: "396 Hz – Liberation from Fear",
      };
    case 417:
      return {
        id: "freq-417",
        url: require("@assets/audio/frequencies/417hz.mp3"),
        title: "417 Hz – Undoing Negative Patterns",
      };
    case 528:
      return {
        id: "freq-528",
        url: require("@assets/audio/frequencies/528hz.mp3"),
        title: "528 Hz – Healing and Transformation",
      };
    case 639:
      return {
        id: "freq-639",
        url: require("@assets/audio/frequencies/639hz.mp3"),
        title: "639 Hz – Harmonizing Relationships",
      };
    case 741:
      return {
        id: "freq-741",
        url: require("@assets/audio/frequencies/741hz.mp3"),
        title: "741 Hz – Detox and Clarity",
      };
    case 852:
      return {
        id: "freq-852",
        url: require("@assets/audio/frequencies/852hz.mp3"),
        title: "852 Hz – Awakening Intuition",
      };
    default:
      return {
        id: "freq-default",
        url: require("@assets/audio/frequencies/528hz.mp3"),
        title: `${frequency} Hz Tone`,
      };
  }
};




// AffirmationCard.js

export const AffirmationCard = ({ text }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#fff",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: Fonts.journal,
    color: Colors.textLight,
    textAlign: "center",
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
});
