import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Fonts, Colors, chakraData } from "@constants";
import { compareResults } from "@utils";
import {
  GradientBackground,
  ChakraComparisonCard,
  ComparisonCard,
} from "@components";

export default function MatchComparisonScreen({ route }) {
  const { myResult, sharedResult } = route.params;
  const { similarities, differences } = compareResults(myResult, sharedResult);
  const { width } = useWindowDimensions();

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
      <View style={{ marginTop: -20 }}>
        <Text style={styles.title}>Vibe Comparison</Text>
        <Text style={styles.summary}>{getVibeSummary()}</Text>
      </View>

      <ScrollView
        style={{ paddingHorizontal: 16, marginTop: 10 }}
        contentContainerStyle={{ paddingBottom: 160 }}
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
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    color: "#fff",
    fontFamily: Fonts.title,
    marginBottom: 10,
    textAlign: "center",
  },
  summary: {
    fontSize: 18,
    color: "#f0f0f0",
    textAlign: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    color: "#ccc",
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 8,
  },
  noData: {
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 10,
  },
});
