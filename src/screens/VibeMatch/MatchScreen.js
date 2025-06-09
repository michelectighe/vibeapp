import React, { useEffect, useState, useContext } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";

import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import { GradientBackground, ResultSelector, CustomSpiritualButton } from "@components";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./MatchScreen.styles";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { MyResultsContext } from "@/context/MyResultsContext";
import { SplashScreen } from "../Main";
import { getsenderResult } from "@/database";
import { getMatchId, clearMatchId } from "@/utils";

//setLogLevel("debug");
export const MatchScreen = ({ route }) => {
  const auth = getAuth();
  const { myResults, loading } = useContext(MyResultsContext);
  //console.log("WHAT IS LOADING FROM RESULTSCONTEXT:", loading);
  const user = auth.currentUser;
  useAmbientControlForScreen(true);
  const navigation = useNavigation();
  const [matchId, setLocalMatchId] = useState(null);
  const [loadingShared, setLoadingShared] = useState(true);
  const [senderResult, setsenderResult] = useState(null);
  const [matchFound, setMatchFound] = useState(false);
  const [senderUserName, setsenderUserName] = useState("Someone");
  const [noResults, setNoResults] = useState(true);
  const tabBarHeight = useBottomTabBarHeight();
  useEffect(() => {
    setLocalMatchId(getMatchId());
  }, []);

  useEffect(() => {
    if (!matchId) return;
    //  console.log("user", user);
    if (!user) return;
    const fetchsenderResult = async () => {
      console.log("match:", matchId);
      if (!matchId) return;
      const sharedData = await getsenderResult(user?.uid, matchId);
      // console.log("SHARED DATA BACK:", sharedData);
      if (sharedData) {
        // same user don't save
        console.log('SENDER:', sharedData)
        if (sharedData[0].senderResult.userId !== user.uid) {
          setsenderUserName(sharedData[1].senderUserName);
          setsenderResult(sharedData[0].senderResult);
          setMatchFound(true);
        } else {
          clearMatchId();
        }
      } else {
        // no match data.  clear the link
        clearMatchId();
      }
      setLoadingShared(false);
      console.log("got here");
    };
    fetchsenderResult();
  }, [matchId, user]);

  useEffect(() => {
    if (myResults && !loading && myResults.length > 0) {
      // setResults(myResults);
      setNoResults(false);
    }
  }, [myResults]);

  // console.log("shared:", senderResult);
  // console.log("loadingShared", loadingShared);
  // console.log("loading", loading);
  if (loading || loadingShared || !user) {
    return <SplashScreen matchId={matchId} />;
  }

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <View style={styles.container}>
        {!matchFound && <Text style={styles.expired}>Match request has expired</Text>}
        {matchFound && (
          <View>
            <Text style={styles.title}>
              {`${senderUserName} wants to match. Let's see if your vibes are in sync.`}
            </Text>
          </View>
        )}
        {matchFound && (
          <ScrollView
            style={[styles.scrollView, { bottom: tabBarHeight + 12 }]}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {!noResults && (
              <Text style={styles.resultText}>Select one of your results to compare:</Text>
            )}
            {/* <Text style={styles.noResults}>No Results to Share</Text> */}
            <CustomSpiritualButton
              label="Do a New Vibe Check"
              onPress={() => navigation.navigate("VibeCheck", { screen: "VibecheckScreen" })}
              color={Colors.buttonBackground}
              textColor={Colors.buttonText}
            />
            <ResultSelector
              results={myResults ?? []}
              onSelect={(selected) => {
                clearMatchId();
                navigation.navigate("MatchComparisonScreen", {
                  myResult: selected,
                  senderResult,
                  senderUserName: senderUserName,
                  recipientUserName: user.displayName,
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
