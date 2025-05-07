import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  BreathingCircle,
  BreathingPatternSelector,
  GradientBackground,
  SectionLayout,
} from "@components";
import { BREATH_PATTERNS, Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./BreathWorksScreen.styles";

export const BreathWorksScreen = () => {
  useAmbientControlForScreen(true);
  const [selectedPattern, setSelectedPattern] = useState(BREATH_PATTERNS[0]);

  return (
    <GradientBackground
      colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}
      logo={false}
    >
      <SectionLayout
        topFlex={2}
        middleFlex={0}
        bottomFlex={1}
        topContent={
          <>
            <View style={styles.main}>
              <BreathingCircle pattern={selectedPattern} key={selectedPattern.id} />
            </View>
          </>
        }
        bottomContent={
          <View>
            <BreathingPatternSelector
              patterns={BREATH_PATTERNS}
              selectedId={selectedPattern.id}
              onSelect={setSelectedPattern}
            />
            <Text style={styles.title}>{selectedPattern.name}</Text>
            {/* <Text style={styles.title}>{selectedPattern.timing}</Text> */}
          </View>
        }
      />
    </GradientBackground>
  );
};
