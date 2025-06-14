import React, { useState } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import { BreathingCircle, BreathingPatternSelector, GradientBackground } from "@components";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./BreathWorksScreen.styles";
import { breathingPatterns } from "@/data";
import { useCountdownTimer, BreathingTimerModal } from "@/components";

export const BreathWorksScreen = () => {
  useAmbientControlForScreen(true);
  const [selectedPattern, setSelectedPattern] = useState(breathingPatterns[0]);
  const [duration, setDuration] = useState(180);
  const [showModal, setShowModal] = useState(false);
  const { minutes, seconds } = useCountdownTimer(duration, () => {
    // Optional: show session complete
  });

  return (
    //  <GradientBackground colors={[Colors.breathingGradient]}>
    <GradientBackground colors={[Colors.white, Colors.white]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text style={styles.timerLabel}>
            ⏱ {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.patternTitle, { color: selectedPattern.gradient[0] }]}>
          {selectedPattern.title}
        </Text>
        <BreathingCircle
          fuzzyColor={selectedPattern.gradient[0]}
          pattern={selectedPattern}
          key={selectedPattern.id}
        />
        <BreathingPatternSelector
          patterns={breathingPatterns}
          selectedId={selectedPattern.id}
          onSelect={setSelectedPattern}
        />
      </View>

      <BreathingTimerModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSelect={(sec) => setDuration(sec)}
      />
    </GradientBackground>
  );
};
