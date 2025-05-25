import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { db } from "@config/firebaseConfig";
import { GradientBackground, ResultSelector } from "@components";
import { loadResults } from "@utils";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./MatchScreen.styles";
import { globalStyles } from "@styles";
import { getLocalMatchRef } from "@/database";

//setLogLevel("debug");
export const MatchScreen = ({ route }) => {
  const auth = getAuth();
  useAmbientControlForScreen(true);
  const navigation = useNavigation();
  const [matchId, setMatchId] = useState(null);
  const [sharedResult, setSharedResult] = useState(null);
  const [myResults, setMyResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareName, setShareName] = useState("Someone");

  useEffect(() => {
    setMatchId(route.params?.id || null);
  }, [route]);

  useEffect(() => {
    console.log('auth', auth)
    const fetchSharedResult = async () => {
      if (!matchId) {
        console.log("matchid not found");
        return;
      }
      try {
        const localRef = await getLocalMatchRef(matchId);
        console.log("localRef", localRef);
     //   if (localRef) return;
        const matchRef = doc(db, "matchLinks", matchId);
        const matchSnap = await getDoc(matchRef);
        if (!matchSnap.exists()) {
          console.warn("Invalid match ID");
          return;
        }

        const matchData = matchSnap.data();
        const sharedResultRef = doc(
          db,
          "users",
          matchData.sharedByUserId,
          "results",
          matchData.sharedByResultId,
        );
        const sharedResultSnap = await getDoc(sharedResultRef);
        if (sharedResultSnap.exists()) {
          setSharedResult(sharedResultSnap.data());
          setShareName(matchData.sharedByUserName);
          // Add the viewer's UID and timestamp to the match link
          const viewerId = auth.currentUser?.uid || "anonymous";
          await updateDoc(doc(db, "matchLinks", matchId), {
            viewers: arrayUnion({
              viewerId,
              timestamp: new Date().toISOString(),
            }),
          });
        }
      } catch (error) {
        console.error("Error loading shared result:", error);
      }
    };
    fetchSharedResult();
  }, [matchId, auth]);

  useEffect(() => {
    const fetchResults = async () => {
      const results = await loadResults();
      setMyResults(results);
      setLoading(false);
    };
    fetchResults();
  }, []);

  if (loading || !sharedResult || !myResults || myResults.length === 0) {
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} color={Colors.white} />;
  }

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {" "}
          {shareName} wants to match. Let's see if your vibes are in sync.
        </Text>

        <View>
          <Text style={styles.resultText}>Select one of your results to compare:</Text>
          <ResultSelector
            results={myResults}
            onSelect={(selected) => {
              navigation.navigate("MatchComparisonScreen", {
                myResult: selected,
                sharedResult,
                shareName,
                matchId,
              });
            }}
          />
        </View>
      </View>
    </GradientBackground>
  );
};
