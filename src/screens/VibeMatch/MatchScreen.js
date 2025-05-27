import React, { useEffect, useState, useContext } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";

import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import { GradientBackground, ResultSelector } from "@components";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./MatchScreen.styles";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { MyResultsContext } from "@/context/MyResultsContext";
import { SplashScreen } from "../Main";
import { getSharedResult } from "@/utils";

//setLogLevel("debug");
export const MatchScreen = ({ route }) => {
  const auth = getAuth();
  const { myResults, loading } = useContext(MyResultsContext);
  //console.log("WHAT IS LOADING FROM RESULTSCONTEXT:", loading);
  const user = auth.currentUser;
  useAmbientControlForScreen(true);
  const navigation = useNavigation();
  const [matchId, setMatchId] = useState(null);
  const [loadingShared, setLoadingShared] = useState(true);
  const [sharedResult, setSharedResult] = useState(null);
  const [matchFound, setMatchFound] = useState(false);
  const [shareName, setSharedName] = useState("Someone");
  const tabBarHeight = useBottomTabBarHeight();
  useEffect(() => {
    setMatchId(route.params?.id || null);
  }, [route]);

  useEffect(() => {
    //    console.log("user", user);
    if (!user) return;
    const fetchSharedResult = async () => {
      if (!matchId) return;
      const sharedData = await getSharedResult(matchId);
      //   console.log("SHARED DATA BACK:", sharedData);
      if (sharedData) {
        setSharedName(sharedData.sharedName);
        setSharedResult(sharedData.sharedResult);
        setMatchFound(true);
      }
      setLoadingShared(false);
    };
    fetchSharedResult();
  }, [matchId, user]);

  //console.log('shared:', sharedResult)
  // console.log("loadingShared", loadingShared);
  //  console.log("loading", loading);
  if (loading || loadingShared) {
    return <SplashScreen matchId={matchId} />;
  }

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <View style={styles.container}>
        {!matchFound && <Text style={styles.expired}>Match request has expired</Text>}
        {matchFound && (
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
        )}
      </View>
    </GradientBackground>
  );
};
