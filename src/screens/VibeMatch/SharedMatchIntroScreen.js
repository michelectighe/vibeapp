import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuth, useUserProfile } from "@context";
import { loadResults } from "@utils";
import { db } from "@config/firebaseConfig";
import { GradientBackground } from "@components";
import { Colors } from "@/constants";
import { styles } from "./SharedMatchIntroScreen.styles";
import { SectionLayout } from "@/components";
import { ResultsList } from "@/components";


export const SharedMatchIntroScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {};
  //console.log('ROUTE:',route.params)
  const { profile } = useUserProfile();
  const auth = getAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchData, setMatchData] = useState(null);
  const [shareName, setShareName] = useState("Someone");
    const [sharedResult, setSharedResult] = useState(null);
      const [myResults, setMyResults] = useState(null);



  useEffect(() => {
    const loadMatchData = async () => {
      try {
        const matchRef = doc(db, "matchLinks", id);
        const matchSnap = await getDoc(matchRef);
        if (matchSnap.exists()) {
        //    console.log('GOT MATCH DATA:', matchSnap)
          setMatchData(matchSnap.data());
          setShareName(matchSnap.data().sharedByUserName);
        } else {
          console.warn("Invalid match ID");
          setLoading(false);
          return;
        };
      } catch (err) {
        console.error("Error fetching match data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadMatchData();
  }, [id]);



//  now check to see if the user is logged in
  useEffect(() => {
      try {
        if (authLoading) return;
                console.log("HERE");
        if (!user) {
          navigation.navigate("Tabs", {
            screen: "Settings",
            params: {
              screen: "SignInScreen",
              params: {
                returnTo: {
                  name: "VibeMatch",
                  params: { screen: "ShareScreen" },
                },
              },
            },
          });
            // } else if (!isPremium) {
            //   //console.log("not premium - show modal");
            //   setShowSubModal(true);
            //   setLoading(false);
          } else {
            fetchResults();
          }
        } catch (error){
          console.error("Error getting result data:", error);
        }
  }, [user]);


    const fetchResults = async () => {
      console.log('loading results')
      const data = await loadResults();
      setResults(data);
      setLoading(false);
    };
  const handleStartComparison = () => {
   navigation.replace("MatchComparisonScreen", { matchData, matchId});
  };
  

  if (loading) {
    return (
      <GradientBackground
        colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}
        logo={false}
      >
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.accent} />
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground
      colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}
      logo={false}
    >
      <SectionLayout
        topFlex={1}
        middleFlex={1}
        bottomFlex={1}
        topContent={
          <View style={styles.container}>
            <Text style={styles.title}> {shareName} wants to see if they vibe with you.</Text>
            <Text style={styles.subtitle}>Take the test now, or use a recent result...</Text>
          </View>
        }
        middleContent={
          <View style={styles.container}>
            <Text style={styles.resultText}>Select one of your results to compare:</Text>
            <ResultsList
              results={results}
              onSelect={(selected) => {
                navigation.navigate("MatchComparisonScreen", {
                  myResult: selected,
                  sharedResult,
                });
              }}
              onCompare={handleStartComparison}
            />

            <CustomSpiritualButton
              label="Compare"
              onPress={handleStartComparison}
              color={Colors.surface}
              textColor={Colors.textDark}
            />
          </View>
        }
        bottomContent={<View></View>}
      />
    </GradientBackground>
  );
};
