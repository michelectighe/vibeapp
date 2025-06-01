import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Colors } from "@constants";
import {
  GradientBackground,
  ChakraComparisonCard,
  ComparisonCard,
  SectionLayout,
  CustomSpiritualButton,
  CloseX,
} from "@components";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./MatchComparisonScreen.styles";
import { chakraData } from "@/data";
import { saveVibeMatchReceived, saveCompletedMatchLink } from "@/database";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { generateComparisonSummary } from "@utils/generateComparisonSummary";
import { useUserProfile } from "@/context";

export const MatchComparisonScreen = ({ route }) => {
  const { profile } = useUserProfile();
  useAmbientControlForScreen(true);
  const {
    myResult,
    sharedResult,
    shareName,
    matchId,
    viewerRole,
    comparisonResults,
    myName,
    theirName,
  } = route.params;
  const tabBarHeight = useBottomTabBarHeight();
  const isSender = viewerRole === "sender";

  const [comparisons, setComparisons] = useState([]);
  const [ chakraComparisons, setChakraComparisons] = useState([]);
  const [overallSummary, setOverallSummary] = useState("");

  useEffect(() => {
    if (isSender && comparisonResults) {
      setOverallSummary(comparisonResults.overallSummary);
      setComparisons(comparisonResults.comparisons);
      setChakraComparisons(comparisonResults.chakraComparisons);
    } else if (myResult && sharedResult && matchId && shareName) {
      const saveMatch = async () => {
        const matchData = {
          matchId,
          myUserId: myResult.userId,
          theirUserId: sharedResult.userId,
          myResultId: myResult.resultId,
          theirResultId: sharedResult.resultId,
          theirName: shareName,
          timestamp: Date.now(),
        };

        await saveVibeMatchReceived(sharedResult, matchData);
        const result = generateComparisonSummary(myResult, sharedResult);
        setOverallSummary(result.overallSummary);
        setComparisons(result.comparisons);
      };
      saveMatch();
    }
  }, [myResult, sharedResult, matchId, shareName]);

  const groupByCategory = (category) =>
    comparisons.filter((item) => item.alignmentLevel === category);

  const onSave = async () => {
    console.log('trying to save')
    await saveCompletedMatchLink({
      matchId,
      recipientUserId: myResult.userId,
      recipientUserName: profile?.displayName || "Unknown", // from context or fallback
      recipientResultId: myResult.resultId,
      comparisonResults: {
        overallSummary,
        comparisons,
      },
    });
  };

  const renderSection = (title, category, emptyText) => (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      {groupByCategory(category).length === 0 ? (
        <Text style={styles.noData}>{emptyText}</Text>
      ) : (
        groupByCategory(category).map((item) => (
          <ComparisonCard
            key={item.key || item.label}
            label={item.label}
            myVal={`${item.myDescription} (${item.myScore})`}
            theirVal={`${item.theirDescription} (${item.theirScore})`}
            description={item.comparisonText}
          />
        ))
      )}
    </>
  );

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <ScrollView
        style={[styles.scrollView, { bottom: tabBarHeight + 12 }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>You and {shareName}</Text>
        {overallSummary ? <Text style={styles.subtitle}>{overallSummary}</Text> : null}
        {renderSection("Completely Aligned", "aligned", "No perfect matches.")}
        {renderSection("Slight Differences", "slightlyDifferent", "Nothing mildly different.")}
        {renderSection("Moderate Differences", "moderatelyDifferent", "No notable contrasts here.")}
        {renderSection(
          "Completely Unaligned",
          "completelyUnaligned",
          "You're vibing on the same plane.",
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
        {!isSender && (
          <CustomSpiritualButton
            label="Save Match Results"
            onPress={onSave}
            style={{ marginTop: 24 }}
          />
        )}
      </ScrollView>
    </GradientBackground>
  );
};
