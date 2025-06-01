import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Colors } from "@constants";
import { generateComparisonSummary } from "@utils/generateComparisonSummary";
import { GradientBackground, ChakraComparisonCard, ComparisonCard } from "@components";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./MatchComparisonScreen.styles";
import { chakraData } from "@/data";
import { SectionLayout } from "@/components";
import { saveVibeMatchReceived } from "@/database";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export const MatchComparisonScreen = ({ route }) => {
  useAmbientControlForScreen(true);
  const { myResult, sharedResult, shareName, matchId } = route.params;
  const tabBarHeight = useBottomTabBarHeight();

  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (myResult && sharedResult && matchId && shareName) {
      const saveMatch = async () => {
        //  console.log('matchid:', matchId)
        //    console.log("myResut:", myResult);
        //    console.log("sharedResult:", sharedResult);
        //    console.log('sharename:', shareName);
        const matchData = {
          matchId: matchId,
          myUserId: myResult.userId,
          theirUserId: sharedResult.userId,
          myResultId: myResult.resultId,
          theirResultId: sharedResult.resultId,
          theirName: shareName,
          timestamp: Date.now(),
        };
        await saveVibeMatchReceived(sharedResult, matchData);
        const result = generateComparisonSummary(myResult, sharedResult);
        setSummary(result);
      };
      saveMatch();
    }
  }, [myResult, sharedResult, matchId, shareName]);

  if (!summary) return null;

  const groupByCategory = (category) =>
    summary.comparisons.filter((item) => item.category === category);
 // console.log(groupByCategory);

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <ScrollView
        style={[styles.scrollView, { bottom: tabBarHeight + 12 }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* <View style={styles.titleWrapper}> */}
        <Text style={styles.title}>You and {shareName}</Text>
        <Text style={styles.summary}>{summary.overallSummary}</Text>
        {/* </View> */}
        {/* ✨ COMPLETELY ALIGNED */}
        <Text style={styles.sectionTitle}>Completely Aligned</Text>
        {groupByCategory("aligned").length === 0 ? (
          <Text style={styles.noData}>No perfect matches.</Text>
        ) : (
          groupByCategory("aligned").map((item) => (
            <ComparisonCard
              key={item.key}
              keyName={item.key}
              myVal={item.myVal}
              theirVal={item.theirVal}
              type={item.type}
              category={item.category}
              label={item.label}
              description={item.description}
            />
          ))
        )}

        {/* ✨ SLIGHT DIFFERENCES */}
        <Text style={styles.sectionTitle}>Slight Differences</Text>
        {groupByCategory("slightlyDifferent").length === 0 ? (
          <Text style={styles.noData}>Nothing mildly different.</Text>
        ) : (
          groupByCategory("slightlyDifferent").map((item) => (
            <ComparisonCard
              key={item.key}
              keyName={item.key}
              myVal={item.myVal}
              theirVal={item.theirVal}
              type={item.type}
              category={item.category}
              label={item.label}
              description={item.description}
            />
          ))
        )}

        {/* ✨ MODERATE DIFFERENCES */}
        <Text style={styles.sectionTitle}>Moderate Differences</Text>
        {groupByCategory("moderatelyDifferent").length === 0 ? (
          <Text style={styles.noData}>No notable contrasts here.</Text>
        ) : (
          groupByCategory("moderatelyDifferent").map((item) => (
            <ComparisonCard
              key={item.key}
              keyName={item.key}
              myVal={item.myVal}
              theirVal={item.theirVal}
              type={item.type}
              category={item.category}
              label={item.label}
              description={item.description}
            />
          ))
        )}

        {/* ✨ COMPLETELY UNALIGNED */}
        <Text style={styles.sectionTitle}>Completely Unaligned</Text>
        {groupByCategory("completelyUnaligned").length === 0 ? (
          <Text style={styles.noData}>You're vibing on the same plane.</Text>
        ) : (
          groupByCategory("completelyUnaligned").map((item) => (
            <ComparisonCard
              key={item.key}
              keyName={item.key}
              myVal={item.myVal}
              theirVal={item.theirVal}
              type={item.type}
              category={item.category}
              label={item.label}
              description={item.description}
            />
          ))
        )}

        {/* 🌈 CHAKRA COMPARISON */}
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
