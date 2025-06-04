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
import { doc, updateDoc } from "firebase/firestore";
import { dbFs } from "@/config/firebaseConfig";
import { chakraData } from "@/data";
import { saveVibeMatchReceived, saveCompletedMatchLink } from "@/database";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { generateComparisonSummary } from "@utils/generateComparisonSummary";
import { useUserProfile } from "@/context";
import { parseMetric } from "@/utils";

export const MatchComparisonScreen = ({ route }) => {
  const { profile } = useUserProfile();
  useAmbientControlForScreen(true);
  const {
    myResult,
    senderResult,
    matchId,
    viewerRole,
    comparisonResults,
    recipientUserName,
    senderUserName,
  } = route.params;
  const tabBarHeight = useBottomTabBarHeight();
  const isSender = viewerRole === "sender";

  const [comparisons, setComparisons] = useState([]);
  const [overallSummary, setOverallSummary] = useState("");
  const [senderChakrasas, setsenderChakrasas] = useState();
  const [recipientChakras, setRecipientChakras] = useState();
  const [isDirty, setIsDirty] = useState(true);

  useEffect(() => {
    if (isSender && comparisonResults) {
      setOverallSummary(comparisonResults.overallSummary);
      setComparisons(comparisonResults.comparisons);
      setsenderChakrasas(comparisonResults.senderChakrasas);
      setRecipientChakras(comparisonResults.recipientChakras);

      const updateRead = async () => {
        console.log("update read for match:", matchId);
        if (!matchId) return;
        const matchRef = doc(dbFs, "matchLinks", matchId);
        await updateDoc(matchRef, {
          read: true,
        });
        console.log("read updated");
      };
      updateRead();
    } else if (myResult && senderResult && matchId && senderUserName) {
      setsenderChakrasas(senderResult.chakraScores);
      if (myResult.chakraScores) setRecipientChakras(JSON.parse(myResult.chakraScores));
      const saveMatch = async () => {
        const matchData = {
          matchId,
          recipientUserId: myResult.userId,
          senderUserId: senderResult.userId,
          recipientResultId: myResult.resultId,
          senderResultId: senderResult.resultId,
          senderUserName: senderUserName,
          recipientUserName: recipientUserName,
          timestamp: Date.now(),
        };

        await saveVibeMatchReceived(senderResult, matchData);
        const result = generateComparisonSummary(myResult, senderResult);
        setOverallSummary(result.overallSummary);
        setComparisons(result.comparisons);
      };
      saveMatch();
    }
  }, [myResult, senderResult, matchId, senderUserName]);

  const groupByCategory = (category) =>
    comparisons.filter((item) => item.alignmentLevel === category);

  const onSave = async () => {
    console.log("trying to save");
    const senderChakrasas = senderResult.chakraScores;
    const recipientChakras = parseMetric(myResult.chakraScores);
    await saveCompletedMatchLink({
      matchId,
      recipientUserId: myResult.userId,
      recipientUserName: profile?.displayName || "Unknown", // from context or fallback
      recipientResultId: myResult.resultId,
      comparisonResults: {
        overallSummary,
        comparisons,
        senderChakrasas,
        recipientChakras,
      },
    });
    setIsDirty(false);
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
            recipientVal={`${item.recipientDescription} (${item.recipientScore})`}
            senderVal={`${item.senderDescription} (${item.senderScore})`}
            description={item.comparisonText}
            recipientUserName={recipientUserName}
            senderUserName={senderUserName}
          />
        ))
      )}
    </>
  );

  const CHAKRA_NAMES = ["root", "sacral", "solarPlexus", "heart", "throat", "thirdEye", "crown"];

  console.log("chakra type:", typeof recipientChakras);
  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <ScrollView
        style={[styles.scrollView, { bottom: tabBarHeight + 12 }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          {recipientUserName} and {senderUserName}
        </Text>
        {overallSummary ? <Text style={styles.subtitle}>{overallSummary}</Text> : null}
        {renderSection("Completely Aligned", "aligned", "No perfect matches.")}
        {renderSection("Slight Differences", "slightlyDifferent", "Nothing mildly different.")}
        {renderSection("Moderate Differences", "moderatelyDifferent", "No notable contrasts here.")}
        {renderSection(
          "Completely Unaligned",
          "completelyUnaligned",
          "You're vibing on the same plane.",
        )}

        {senderChakrasas && recipientChakras && (
          <>
            <Text style={styles.sectionTitle}>Chakra Comparison</Text>

            {chakraData.map((chakra) => {
              const recipientScore = recipientChakras?.[chakra.id];
              const senderScore = senderChakrasas?.[chakra.id];
              console.log("your chakra:", recipientScore);
              console.log("their chakra:", senderScore);
              return (
                <ChakraComparisonCard
                  key={chakra.id}
                  chakra={chakra}
                  recipientScore={recipientScore}
                  senderScore={senderScore}
                  recipientUserName={recipientUserName}
                  senderUserName={senderUserName}
                />
              );
            })}
          </>
        )}
        {!isSender && (
          <CustomSpiritualButton
            label="Save Match Results"
            onPress={onSave}
            isDirty={isDirty}
            style={{ marginTop: 24 }}
          />
        )}
      </ScrollView>
    </GradientBackground>
  );
};
