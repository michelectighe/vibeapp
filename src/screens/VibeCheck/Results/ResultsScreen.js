import React, { useEffect, useRef, useState , useContext} from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import uuid from "react-native-uuid";
import { getAuth } from "firebase/auth";
import { useAnalysis } from "@context";
import { CustomButton, CloseX, GradientBackground, SectionLayout } from "@components";
import { Colors } from "@constants";
import { styles } from "./ResultsScreen.styles";
import { globalStyles } from "@styles";
import { useRoute } from "@react-navigation/native";
import { getResultByID, saveResults } from "@database";
import { hexToRgba } from "@/utils";
import { MyResultsContext } from "@/context/MyResultsContext";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export const ResultsScreen = ({ navigation }) => {
  const route = useRoute();
  const { resultId, returnTo } = route.params || {};
  const { setMyResults } = useContext(MyResultsContext);
  const auth = getAuth();
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

  const oldResultsRef = useRef(false);
  const infoImage = require("@assets/images/info.webp");

  const {
    voiceFrequencyScore,
    voiceClarityScore,
    voiceStrengthScore,
    environmentScore,
    motionScore,
    emotionScore,
    overallVibrationScore,
    chakraScores,
    vibrationInfo,
    heartRate,
    setResult,
    resetAnalysis,
  } = useAnalysis();

  useEffect(() => {
    if (user) {
      try {
        //if the user is logged in and a result ID was passed in, get the data and set it
        if (user.uid && resultId && resultId !== null && !oldResultsRef.current) {
          oldResultsRef.current = true;
          const loadResult = async () => {
            const existing = await getResultByID(user.uid, resultId);
            //console.log("EXISTING:", existing);
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
        const result = vibrationInfo;
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
  }, [overallVibrationScore, vibrationInfo, chakraScores, user, resultId]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveResultsToDB = async () => {
    setSaving(true);
    const newResultId = uuid.v4();
    const newTimeStamp = new Date().toISOString();
    const newResult = {
      resultId: newResultId,
      timestamp: newTimeStamp,
      userId: user.uid,
      voiceFrequencyScore: voiceFrequencyScore,
      heartRateScore: heartRate,
      motionScore: motionScore,
      environmentScore: environmentScore,
      voiceStrengthScore: voiceStrengthScore,
      voiceClarityScore: voiceClarityScore,
      emotionScore: emotionScore,
      overallVibrationScore: overallVibrationScore, // optional, could skip check if you trust it
      chakraScores: chakraScores || {},
      journalId: "0",
    };

    if (newResult.resultId && newResult.timestamp && user) {
      const userId = user.uid;
      //  console.log("Saving to local DB:", newResult);
      const success = await saveResults(newResult, userId);
      if (success) setMyResults((prev) => [newResult, ...prev]);
    }
    setSaving(false);
  };

  const resetAndLeave = () => {
    console.log("returnTo value:", returnTo);
    if (returnTo && typeof returnTo === "object") {
      navigation.reset({
        index: 0,
        routes: [returnTo],
      });
    } else if (typeof returnTo === "string") {
      //console.log("string return:", returnTo);
      navigation.reset({
        index: 0,
        routes: [{ name: returnTo }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Tabs", screen: "Home" }],
      });
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
        bottomFlex={1}
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
              <Text style={[styles.score, { color: overallColor4 }]}>
                {overallVibrationScore.toFixed(0)}%
              </Text>
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
          <>
            {saving && (
              <ActivityIndicator size="large" color={Colors.white} style={styles.loading} />
            )}
          </>
        }
      />
    </GradientBackground>
  );
};
