import React, { useEffect, useRef, useState , useContext} from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import uuid from "react-native-uuid";
import { getAuth } from "firebase/auth";
import { useAnalysis } from "@context";
import {
  CustomButton,
  CloseX,
  GradientBackground,
  SectionLayout,
  CustomSpiritualButton,
} from "@components";
import { Colors } from "@constants";
import { styles } from "./ResultsScreen.styles";
import { globalStyles } from "@styles";
import { useRoute } from "@react-navigation/native";
import { getResultById, saveResults } from "@database";
import { hexToRgba } from "@/utils";
import { MyResultsContext } from "@/context/MyResultsContext";
import { getMatchId, getCreateShare, normalizeMetricForStorage } from "@/utils";
import { hawkinsLevels } from "@data";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export const ResultsScreen = ({ navigation }) => {
  const route = useRoute();
  const { resultId, returnTo } = route.params || {};
  const { setMyResults } = useContext(MyResultsContext);
  const auth = getAuth();
  const createShare = getCreateShare();
  const matchId = getMatchId();
  const user = auth.currentUser;
  const [overallLabel, setLabel] = useState(null);
  const [overallDescription, setDescription] = useState(null);
  const [overallImage, setImage] = useState(null);
  const [overallColor, setColor] = useState(null);
  const [overallColor2, setColor2] = useState(null);
  const [overallColor3, setColor3] = useState(null);
  const [overallColor4, setColor4] = useState(null);
  const [viewColor, setViewColor] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [oldResults, setOldResults] = useState(false);
  const [matchLinkActive, setMatchLinkActive] = useState(false);
  const [hawkinsDescription, setHawkinsDescription] = useState(null);

  const oldResultsRef = useRef(false);
  const infoImage = require("@assets/images/info.webp");

  const {
    voiceFrequencyScore,
    voiceEmotionScore,
    voiceStrengthScore,
    environmentScore,
    motionScore,
    emotionScore,
    overallVibrationScore,
    chakraScores,
    vibrationInfo,
    bpmScore,
    hrvScore,
    setResult,
    resetAnalysis,
    hawkinsScore,
  } = useAnalysis();

  useEffect(() => {
    if (matchId !== null) {
      setMatchLinkActive(true);
    }
  }, [matchId]);
  useEffect(() => {
    if (user) {
      try {
        //if the user is logged in and a result ID was passed in, get the data and set it
        if (user.uid && resultId && resultId !== null && !oldResultsRef.current) {
          oldResultsRef.current = true;
          const loadResult = async () => {
            const existing = await getResultById(user.uid, resultId);
            console.log("EXISTING:", existing);
            if (existing) {
              await resetAnalysis();
              await setResult(existing);
            }
          };
          loadResult();
        }
      } catch (error) {
        console.error("Error loading old results:", error);
      }
    }
    // if the data is valid, continue
    if (overallVibrationScore === null || chakraScores === null || overallVibrationScore === 0) {
      return;
    }
    let isMounted = true;

    const fetchData = async () => {
      try {
        //   console.log("inside fetchData");
        const result = vibrationInfo;
        //   console.log("results:", result);
        if (!result) return;

        setLabel(result.label);
        setDescription(result.description);
        setColor(result.color);
        setColor2(result.color2);
        setColor3(result.color3);
        setColor4(result.color4);
        setViewColor(hexToRgba(result.color));
        setImage(result.image);
        setDataReady(true);
        if (hawkinsScore?.score) {
          getHawkinsDescription(hawkinsScore.score);
        }
        //save to db if the data is new
        if (!oldResultsRef.current && user) {
          await saveResultsToDB();
          //console.log("try to save because NOT old score?????");
          oldResultsRef.current = true; // set to make sure it doesn't try to save again
        }
      } catch (e) {
        console.warn("fetchData error:", e);
      }
    };
    fetchData();
    isMounted = true;
    return () => {
      isMounted = false;
    };
  }, [overallVibrationScore, vibrationInfo, chakraScores, user, resultId, hawkinsScore]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveResultsToDB = async () => {
    console.log("insaveresultstodb");
    console.log("emotion score coming in to results:", emotionScore);

    setSaving(true);
    const newResultId = uuid.v4();
    const newTimeStamp = new Date().toISOString();

    const newResult = {
      resultId: newResultId,
      timestamp: newTimeStamp,
      userId: user.uid,
      voiceFrequencyScore: normalizeMetricForStorage(
        voiceFrequencyScore?.value || 0,
        voiceFrequencyScore?.score || 0,
      ),
      bpmScore: normalizeMetricForStorage(bpmScore?.value || 0, bpmScore?.score || 0),
      hrvScore: normalizeMetricForStorage(hrvScore?.value || 0, hrvScore?.score || 0),
      motionScore: normalizeMetricForStorage(motionScore?.value || 0, motionScore?.score || 0),
      environmentScore: normalizeMetricForStorage(
        environmentScore?.value || 0,
        environmentScore?.score || 0,
      ),
      voiceStrengthScore: normalizeMetricForStorage(
        voiceStrengthScore?.value || 0,
        voiceStrengthScore?.score || 0,
      ),
      voiceEmotionScore: normalizeMetricForStorage(
        voiceEmotionScore?.value || 0,
        voiceEmotionScore?.score || 0,
      ),
      emotionScore: normalizeMetricForStorage(emotionScore?.value || 0, emotionScore?.score || 0),
      overallVibrationScore: overallVibrationScore ?? 0,
      hawkinsScore: normalizeMetricForStorage(hawkinsScore?.value || 0, hawkinsScore?.score || 0),
      chakraScores: chakraScores || {},
      journalId: "0",
    };
    console.log("NEW RESULTS:", newResult);
    await saveResults(newResult, user.uid); // Firestore save
    setMyResults((prevResults) => [newResult, ...prevResults]);
  };

  const resetAndLeave = () => {
    console.log("creating share:", createShare);
    if (createShare) {
      navigation.navigate("Tabs", {
        screen: "VibeMatch",
        params: { screen: "ShareScreen" },
      });
    } else if (matchId) {
      console.log("MATCHRECEIVED:", matchId);
      navigation.navigate("Tabs", {
        screen: "VibeMatch",
        params: { screen: "MatchScreen" },
      });
    }
    // return;
    // console.log("returnTo value:", returnTo);
    // if (returnTo && typeof returnTo === "object") {
    //   navigation.reset({
    //     index: 0,
    //     routes: [returnTo],
    //   });
    // } else if (typeof returnTo === "string") {
    //   //console.log("string return:", returnTo);
    //   navigation.reset({
    //     index: 0,
    //     routes: [{ name: returnTo }],
    //   });
    else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Tabs", screen: "Home" }],
      });
    }
  };

  const getHawkinsDescription = (hawkinsScore) => {
    // Find the matching level
    let matchedLevel = hawkinsLevels[0];
    for (let i = 0; i < hawkinsLevels.length; i++) {
      if (hawkinsScore >= hawkinsLevels[i].level) {
        matchedLevel = hawkinsLevels[i];
      } else {
        break; // levels are in ascending order, so break early
      }
    }
    console.log("MATCHED LEVEL:", matchedLevel.description);
    if (matchedLevel) {
      setHawkinsDescription(matchedLevel.description);
    }
  };

  // 👇 Prevent UI rendering until all required data is ready
  if (!dataReady || !overallLabel || !overallDescription || !overallImage || !overallColor) {
    return (
      <GradientBackground colors={[Colors.white, Colors.white, Colors.white]}>
        <View style={[globalStyles.centered, { flex: 1 }]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground
      colors={[overallColor4, overallColor, overallColor2, overallColor3, overallColor4]}
    >
      <SectionLayout
        topFlex={2}
        middleFlex={5}
        bottomFlex={1.5}
        safe={false}
        topContent={
          <>
            <CloseX
              xColor={overallColor4}
              onPress={() => {
                resetAndLeave();
              }}
            />
            <View style={styles.titleWrapper}>
              <Text style={[styles.score, { color: overallColor4 }]}>{hawkinsScore.score}</Text>
              <Text
                style={[styles.label, { color: overallColor4, textShadowColor: overallColor4 }]}
              >
                {overallLabel}
              </Text>
            </View>
          </>
        }
        middleContent={
          <View style={styles.innerContent}>
            <CustomButton
              imgSource={overallImage}
              onPress={() => navigation.navigate("ResultDetails")}
            />
            <View style={[styles.descriptionBox, { backgroundColor: viewColor }]}>
              {hawkinsDescription && (
                <Text style={[styles.descriptionText, { color: overallColor2 }]}>
                  {hawkinsDescription}
                </Text>
              )}
              <Text style={[styles.descriptionText, { color: overallColor2 }]}>
                {overallDescription}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("ResultsBreakdown")}
                style={styles.infoButton}
              >
                <Text style={[styles.infoIcon, { color: overallColor2 }]}>ⓘ</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        bottomContent={
          <View style={styles.navButtons}>
            {createShare && (
              <CustomSpiritualButton
                label="Return to Share Results"
                onPress={() => navigation.navigate("VibeMatch", { screen: "ShareScreen" })}
                color={overallColor2}
                textColor={overallColor3}
              />
            )}
            {matchLinkActive && (
              <CustomSpiritualButton
                label="Return to Match Results"
                onPress={() => navigation.navigate("VibeMatch", { screen: "MatchScreen" })}
                color={overallColor2}
                textColor={overallColor3}
              />
            )}
            {/* {saving && (
              <ActivityIndicator size="large" color={Colors.white} style={styles.loading} />
            )} */}
          </View>
        }
      />
    </GradientBackground>
  );
};
