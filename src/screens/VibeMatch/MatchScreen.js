import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "@config/firebaseConfig";
import { useAnalysis } from "@context";
import { GradientBackground, ResultSelector } from "@components";
import { loadResults } from "@utils";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./MatchScreen.styles";

export const MatchScreen = ({ route }) => {
  useAmbientControlForScreen(true);
  const navigation = useNavigation();
  const [matchId, setMatchId] = useState(null);
  const [sharedResult, setSharedResult] = useState(null);
  const [myResults, setMyResults] = useState(null);
  const [myResult, setMyResult] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getLatestResult, currentUser } = useAnalysis();

  useEffect(() => {
    setMatchId(route.params?.id || null);
  }, [route]);

  useEffect(() => {
    const fetchSharedResult = async () => {
      if (!matchId) return;

      try {
        const matchRef = doc(db, "matchLinks", matchId);
        const matchSnap = await getDoc(matchRef);

        if (!matchSnap.exists()) {
          console.warn("❌ Invalid match ID");
          return;
        }

        const matchData = matchSnap.data();
        const sharedResultRef = doc(
          db,
          "users",
          matchData.sharedByUserId,
          "results",
          matchData.sharedByResultId
        );

        const sharedResultSnap = await getDoc(sharedResultRef);
        if (sharedResultSnap.exists()) {
          setSharedResult(sharedResultSnap.data());
        }
      } catch (error) {
        console.error("Error loading shared result:", error);
      }
    };

    fetchSharedResult();
  }, [matchId]);

  useEffect(() => {
    const fetchResults = async () => {
      const results = await loadResults();
      setMyResults(results);
      setLoading(false);
    };

    fetchResults();
  }, []);

  useEffect(() => {
    if (myResult) {
      setShowComparison(true);
    }
  }, [myResult]);

  if (loading || !sharedResult || !myResults || myResults.length === 0) {
    return (
      <ActivityIndicator size="large" style={{ marginTop: 100 }} color="#fff" />
    );
  }

  return (
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Vibe Match</Text>
        <View>
          <Text style={styles.resultText}>
            Select one of your results to compare:
          </Text>
          <ResultSelector
            results={myResults}
            onSelect={(selected) => {
              navigation.navigate("MatchComparisonScreen", {
                myResult: selected,
                sharedResult,
              });
            }}
          />
        </View>
      </View>
    </GradientBackground>
  );
};
