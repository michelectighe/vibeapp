import React, { useEffect, useState, useContext } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { db } from "@config/firebaseConfig";
import { GradientBackground, ResultSelector } from "@components";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./MatchScreen.styles";
import { getLocalMatchMeta, getMatchResultByID } from "@/database";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { MyResultsContext } from "@/context/MyResultsContext";
//setLogLevel("debug");
export const MatchScreen = ({ route }) => {
  const auth = getAuth();
  const { myResults, loading } = useContext(MyResultsContext);
  const user = auth.currentUser;
  useAmbientControlForScreen(true);
  const navigation = useNavigation();
  const [matchId, setMatchId] = useState(null);
  const [loadingShared, setLoadingShared] = useState(true);
  const [sharedResult, setSharedResult] = useState(null);
  const [shareName, setShareName] = useState("Someone");
  const tabBarHeight = useBottomTabBarHeight();
  useEffect(() => {
    setMatchId(route.params?.id || null);
  }, [route]);

  useEffect(() => {
    //   console.log("user", user);
    if (!user) return;
    const fetchSharedResult = async () => {
      if (!matchId) {
      //  console.log("matchid not found");
      //  setLoadingShared(false);
        return;
      }
      try {
        const localRef = await getLocalMatchMeta(matchId);
        if (localRef) {
          if (localRef.theirResultID && localRef.theirUserID) {
            // see if there is a loal match record
            const sharedResult = await getMatchResultByID(
              matchId,
              localRef.theirUserID,
              localRef.theirResultID,
            ); // if there is, get the local results (if they exist)
          }
        }
        if (sharedResult) {
          setSharedResult(sharedResult);
          setLoadingShared(false);
          if (localRef.theirName) {
            setShareName(localRef.theirName);
          }
          console.log("[Cache Hit]: Found local match");
        } else {
          // else get it from firebase.
          const matchRef = doc(db, "matchLinks", matchId);
          const matchSnap = await getDoc(matchRef);
          if (!matchSnap.exists()) {
            console.warn("Invalid match ID");
            setLoadingShared(false);
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
            const viewerId = user?.uid || "anonymous";
            await updateDoc(doc(db, "matchLinks", matchId), {
              viewers: arrayUnion({
                viewerId,
                timestamp: new Date().toISOString(),
              }),
            });
          }
          setLoadingShared(false);
        }
        console.log("[Firestore Fetch]: Match not found locally, fetched from server");
      } catch (error) {
        console.error("Error loading shared result:", error);
      }
    };
    fetchSharedResult();
  }, [matchId, user]);

  //console.log('shared:', sharedResult)
  //console.log('my:', myResults)
  //console.log('loading', loading)
  if (loading || loadingShared) {
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} color={Colors.white} />;
  }

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <View style={styles.container}>
        <ScrollView
          style={[styles.scrollView, { bottom: tabBarHeight + 12 }]}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>
            {" "}
            {shareName} wants to match. Let's see if your vibes are in sync.
          </Text>
          <Text style={styles.resultText}>Select one of your results to compare:</Text>
          <ResultSelector
            results={myResults ?? []}
            onSelect={(selected) => {
              navigation.navigate("MatchComparisonScreen", {
                myResult: selected,
                sharedResult,
                shareName,
                matchId,
              });
            }}
            showIcons={false}
          />
        </ScrollView>
      </View>
    </GradientBackground>
  );
};
