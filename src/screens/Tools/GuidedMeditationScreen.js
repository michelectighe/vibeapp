import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import { SCREEN_WIDTH } from "@utils";
import { playTrack, stopTrack } from "@services";
import { GradientBackground } from "@components";
import { Fonts, Colors } from "@constants";
import { styles } from "@/screens/Tools/GuidedMeditationScreen.styles";
import { globalStyles } from "@styles";

const meditationList = [
  {
    id: "1",
    title: "3 Minute Mindfulness",
    description: "A calming meditation to help you relax and unwind.",
    audio: require("@assets/audio/meditation/3MinuteMindfulness.mp3"),
  },
  {
    id: "2",
    title: "5 Minute Mindful Breathing",
    description: "Focus on your breath and become more present.",
    audio: require("@assets/audio/meditation/5MinuteBreathing.mp3"),
  },
  {
    id: "3",
    title: "3 Minute Mindful Breathing",
    description: "Focus on your breath and become more present.",
    audio: require("@assets/audio/meditation/3MinuteBreathing.mp3"),
  },
  {
    id: "4",
    title: "4 Minute Body Scan",
    description: "Focus on your breath and become more present.",
    audio: require("@assets/audio/meditation/4MinuteBodyScan.mp3"),
  },
  {
    id: "5",
    title: "Tension Release",
    description: "Focus on your breath and become more present.",
    audio: require("@assets/audio/meditation/TensionRelease.mp3"),
  },
];

export const GuidedMeditationScreen = () => {
  const [playingId, setPlayingId] = useState(null);
  const handlePress = async (item) => {
    if (playingId === item.id) {
      console.log("trying to play meditation");
      await stopTrack();
      setPlayingId(null);
    } else {
      await stopTrack();
      await playTrack(item.id, item.audio, item.title, "VibeKey", 1, true);
      setPlayingId(item.id);
    }
  };

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}>
      {/* <GestureDetector gesture={swipeGesture}> */}
      {/* //  <View style={globalStyles.container}> */}
      <View style={styles.titleWrapper}>
        <Text style={[styles.title, { fontSize: 30 }]}>Guided Meditations</Text>
      </View>
      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={globalStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {meditationList.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handlePress(item)}>
              <Text style={styles.buttonText}>{playingId === item.id ? "Stop" : "Play"}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {/* </View> */}
      {/* </GestureDetector> */}
    </GradientBackground>
  );
};
