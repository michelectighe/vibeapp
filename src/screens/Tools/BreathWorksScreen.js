import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  BreathingCircle,
  BreathingPatternSelector,
  GradientBackground,
  SectionLayout,
} from "@components";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./BreathWorksScreen.styles";
import { breathingPatterns } from "@/data";

export const BreathWorksScreen = () => {
  useAmbientControlForScreen(true);
  const [selectedPattern, setSelectedPattern] = useState(breathingPatterns[0]);

  return (
    <GradientBackground
      colors={[Colors.white, Colors.white, Colors.white]}
      logo={false}
    >
      <SectionLayout
        topFlex={6}
        middleFlex={3}
        bottomFlex={1}
        topContent={
          <View style={styles.middle}>
            <BreathingCircle pattern={selectedPattern} key={selectedPattern.id} />
          </View>
        }
        middleContent={
          <BreathingPatternSelector
            patterns={breathingPatterns}
            selectedId={selectedPattern.id}
            onSelect={setSelectedPattern}
          />
        }
        bottomContent={
          <View>
            <Text style={styles.title}>{selectedPattern.name}</Text>
            {/* <Text style={styles.title}>{selectedPattern.timing}</Text> */}
          </View>
        }
      />
    </GradientBackground>
  );
};
