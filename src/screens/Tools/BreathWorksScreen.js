import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  BreathingCircle,
  BreathingPatternSelector,
  GradientBackground,
} from "@components";
import { BREATH_PATTERNS, Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./BreathWorksScreen.styles";

export const BreathWorksScreen = () => {
  useAmbientControlForScreen(true);
  const [selectedPattern, setSelectedPattern] = useState(BREATH_PATTERNS[0]);

  return (
    <View style={styles.container}>
      <GradientBackground
        colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}
        logo={false}
      >
        <View style={styles.top}>
          <Text style={styles.title}>{selectedPattern.name}</Text>
          <BreathingPatternSelector
            patterns={BREATH_PATTERNS}
            selectedId={selectedPattern.id}
            onSelect={setSelectedPattern}
          />
        </View>

        <View style={styles.main}>
          <BreathingCircle pattern={selectedPattern} key={selectedPattern.id} />
        </View>
      </GradientBackground>
    </View>
  );
};
