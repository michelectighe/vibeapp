import React from "react";
import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import { Fonts, Colors, chakraData } from "@constants";
import { compareResults } from "@utils";
import {
  GradientBackground,
  ChakraComparisonCard,
  ComparisonCard,
} from "@components";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./MatchComparisonScreen.styles";

export const MatchComparisonScreen = ({ route }) => {
  useAmbientControlForScreen(true);
  const { myResult, sharedResult } = route.params;
  const { similarities, differences } = compareResults(myResult, sharedResult);

  const getVibeSummary = () => {
    const delta = Math.abs(
      myResult.overallVibrationScore - sharedResult.overallVibrationScore
    );
    if (delta < 15) return "You are incredibly in sync.";
    if (delta < 30) return "You're pretty aligned.";
    return "You're on different wavelengths today.";
  };

  return (
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Vibe Comparison</Text>
        <Text style={styles.summary}>{getVibeSummary()}</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Similarities</Text>
        {similarities.length === 0 ? (
          <Text style={styles.noData}>No strong similarities found.</Text>
        ) : (
          similarities.map((item) => (
            <ComparisonCard
              key={item.key}
              keyName={item.key}
              myVal={item.myVal}
              theirVal={item.theirVal}
            />
          ))
        )}

        <Text style={styles.sectionTitle}>Differences</Text>
        {differences.length === 0 ? (
          <Text style={styles.noData}>No significant differences.</Text>
        ) : (
          differences.map((item) => (
            <ComparisonCard
              key={item.key}
              keyName={item.key}
              myVal={item.myVal}
              theirVal={item.theirVal}
            />
          ))
        )}

        <Text style={styles.sectionTitle}>Chakra Comparison</Text>
        {chakraData.map((chakra) => {
          const yourScore = myResult.chakraScores?.[chakra.id];
          const theirScore = sharedResult.chakraScores?.[chakra.id];

          return (
            <ChakraComparisonCard
              key={chakra.id}
              chakra={chakra}
              yourScore={yourScore}
              theirScore={theirScore}
            />
          );
        })}
      </ScrollView>
    </GradientBackground>
  );
};
