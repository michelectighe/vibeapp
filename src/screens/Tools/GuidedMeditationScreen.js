import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { SCREEN_WIDTH } from "@utils";
import { runOnJS } from "react-native-reanimated";
import { playTrack, stopTrack } from "@services";
import { GradientBackground, ScrollContainer } from "@components";
////import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { MEDITATION_SCREENS } from "@navigation/screens";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
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
  const route = useRoute();
  const navigation = useNavigation();
  const currentIndex = MEDITATION_SCREENS.indexOf(route.name);

  const handlePress = async (item) => {
    if (playingId === item.id) {
      await stopTrack();
      setPlayingId(null);
    } else {
      await stopTrack();
      await playTrack({
        id: item.id,
        url: item.audio,
        title: item.title,
      });
      setPlayingId(item.id);
    }
  };
  const goToNextScreen = () => {
    if (currentIndex < MEDITATION_SCREENS.length - 1) {
      const nextScreen = MEDITATION_SCREENS[currentIndex + 1];
      navigation.navigate(nextScreen);
    }
  };
  const goBack = () => {
    if (currentIndex > 0) {
      navigation.goBack();
    }
  };
  // const swipeGesture = Gesture.Pan().onEnd((event) => {
  //   if (event.translationX < 50 && event.velocityX < 0) {
  //     // Swipe left → Go forward
  //     runOnJS(goToNextScreen)();
  //   } else if (event.translationX > 50 && event.velocityX > 0) {
  //     // Swipe right → Go back
  //     runOnJS(goBack)();
  //   }
  // });

  return (
    <GradientBackground
      colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}
    >
      {/* <GestureDetector gesture={swipeGesture}> */}
      <View style={globalStyles.container}>
        <View style={globalStyles.titleWrapper}>
          <Text style={[styles.title, { fontSize: 30 }]}>
            Guided Meditations
          </Text>
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
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePress(item)}
              >
                <Text style={styles.buttonText}>
                  {playingId === item.id ? "Stop" : "Play"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      {/* </GestureDetector> */}
    </GradientBackground>
  );
};
