import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "@config/firebaseConfig";
import { useAnalysis } from "@context"; // or your auth context
import { GradientBackground, ResultSelector } from "@components";
import { loadResults } from "@utils";
import { Colors, Fonts } from "@constants";

export default function MatchScreen({ route }) {
  // const { matchId } = route.params.id || {};
  const navigation = useNavigation();
  const [matchId, setMatchId] = useState(null);
  const [sharedResult, setSharedResult] = useState(null);
  const [myResults, setMyResults] = useState(null);
  const [myResult, setMyResult] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getLatestResult, currentUser } = useAnalysis(); // adjust based on your setup

  useEffect(() => {
    //console.log("📦 MatchScreen loaded with params:", route.params.id);
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
      setLoading(false); // ✅ move it here — only after everything needed is done
    };

    fetchResults();
  }, []);

  useEffect(() => {
    //console.log("setmyresult:", myResult);
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
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingHorizontal: 0,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 0,
    color: "#fff",
  },
  scoreBox: {
    alignItems: "center",
    marginBottom: 20,
  },
  score: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
  },
  label: {
    fontSize: 16,
    color: "#f5f5f5",
  },
  vs: {
    fontSize: 32,
    color: "#ccc",
    marginVertical: 10,
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#f0f0f0",
  //  maxWidth: 400,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});
