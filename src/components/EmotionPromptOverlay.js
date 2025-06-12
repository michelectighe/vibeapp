import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const PHRASES = [
  "What’s something that made you smile recently?",
  "Describe your mood in three words.",
  "Share a small win from your week.",
];

export const EmotionPromptOverlay = () => {
  const [phrase, setPhrase] = useState("");
  const [showingPhrase, setShowingPhrase] = useState(false);

  const instructionsOpacity = useRef(new Animated.Value(1)).current;
  const phraseOpacity = useRef(new Animated.Value(0)).current;

  function showPhrase() {
    const random = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    setPhrase(random);

    // Animate: fade out instructions, fade in phrase
    Animated.parallel([
      Animated.timing(instructionsOpacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(phraseOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start(() => setShowingPhrase(true));
  }

  function backToInstructions() {
    // Animate: fade out phrase, fade in instructions
    Animated.parallel([
      Animated.timing(phraseOpacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(instructionsOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start(() => setShowingPhrase(false));
  }

  return (
    <View style={styles.topOverlay}>
      <BlurView style={StyleSheet.absoluteFill} blurType="light" blurAmount={16} />

      {/* Animated instructions */}
      <Animated.View style={[styles.instructionsWrapper, { opacity: instructionsOpacity }]}>
        <Text style={styles.instructionsText}>
          Look into the camera and talk naturally for about 10 seconds.
        </Text>
        <TouchableOpacity style={styles.iconRow} onPress={showPhrase} activeOpacity={0.7}>
          <MaterialCommunityIcons name="lightbulb-outline" size={28} color="#555" />
          <Text style={styles.needPhrase}>Need a phrase?</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Animated phrase bubble */}
      <Animated.View
        style={[
          styles.phraseBubble,
          { opacity: phraseOpacity, pointerEvents: showingPhrase ? "auto" : "none" },
        ]}
      >
        <Text style={styles.phraseText}>{phrase}</Text>
        <TouchableOpacity style={styles.backIcon} onPress={backToInstructions}>
          <MaterialCommunityIcons name="arrow-u-left-top" size={22} color="#666" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    alignItems: "center",
    paddingTop: 50,
    zIndex: 2,
  },
  instructionsWrapper: {
    alignItems: "center",
    paddingVertical: 10,
    width: width * 0.95,
  },
  instructionsText: {
    fontSize: 18,
    color: "#222",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  needPhrase: {
    marginLeft: 6,
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  phraseBubble: {
    position: "absolute",
    top: 80,
    left: width * 0.025,
    width: width * 0.95,
    minHeight: 56,
    backgroundColor: "transparent",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
  },
  phraseText: {
    fontSize: 18,
    color: "#222",
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
    marginRight: 12,
  },
  backIcon: {
    padding: 4,
    borderRadius: 14,
    backgroundColor: "rgba(220,220,220,0.7)",
    marginLeft: 6,
  },
});
