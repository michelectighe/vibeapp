import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import FastImage from "react-native-fast-image";
import { saveResults } from "@utils/saveResults";
import { useAnalysis } from "@context/AnalysisContext";
import { CustomButton, CloseX, GradientBackground, SectionLayout } from "@components";
import { Colors } from "@constants";
import { styles } from "./ResultsScreen.styles";
import { globalStyles } from "@styles";
import { isValidScore } from "@/utils";
//import HapticTest from "@/components/HapticTest";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export const ResultsScreen = ({ navigation }) => {
  const [overallLabel, setLabel] = useState(null);
  const [overallDescription, setDescription] = useState(null);
  const [overallImage, setImage] = useState(null);
  const [overallColor, setColor] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dataReady, setDataReady] = useState(false);

  const hasSaved = useRef(false);
  const infoImage = require("@assets/images/info.webp");

  const {
    voiceFrequencyScore,
    voiceClarityScore,
    voiceStrengthScore,
    environmentScore,
    motionScore,
    heartRateScore,
    hrvScore,
    emotionScore,
    overallVibrationScore,
    chakraScores,
    vibrationInfo,
  } = useAnalysis();

  useEffect(() => {
    if (overallVibrationScore == null || chakraScores == null || hasSaved.current) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        const result = vibrationInfo;
        if (!result) return;

        await saveResultsToDB();
        if (!isMounted) return;

        setLabel(result.label);
        setDescription(result.description);
        setColor(result.color);
        setImage(result.image);
        hasSaved.current = true;
        setDataReady(true);
      } catch (e) {
        console.warn("fetchData error:", e);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [overallVibrationScore, chakraScores]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveResultsToDB = async () => {
    setSaving(true);

    const sanitize = (label, value) => (isValidScore(label, value) ? value : -1);

    const newResult = {
      timestamp: new Date(),
      voiceFrequencyScore: sanitize("voiceFrequency", voiceFrequencyScore?.score),
      heartRateScore: sanitize("heartRateScore", heartRateScore),
      hrvScore: sanitize("hrvScore", hrvScore),
      motionScore: sanitize("motionScore", motionScore),
      environmentScore: sanitize("environmentScore", environmentScore),
      voiceStrengthScore: sanitize("voiceStrength", voiceStrengthScore?.score),
      voiceClarityScore: sanitize("voiceClarity", voiceClarityScore?.score),
      emotionScore: sanitize("emotionScore", emotionScore?.score),
      overallVibrationScore: sanitize("overallVibrationScore", overallVibrationScore), // optional, could skip check if you trust it
      chakraScores: chakraScores || {},
    };

    if (newResult) {
      console.log("Saving to local DB:", newResult);
      await saveResults(newResult);
    }
    setSaving(false);
  };

  // 👇 Prevent UI rendering until all required data is ready
  if (!dataReady || !overallLabel || !overallDescription || !overallImage || !overallColor) {
    return (
      <GradientBackground colors={["white", "white", "white"]}>
        <View style={[globalStyles.centered, { flex: 1 }]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground colors={["white", overallColor, "white"]}>
      <SectionLayout
        topFlex={2}
        middleFlex={4}
        bottomFlex={1}
        safe={false}
        topContent={
          <>
            <CloseX
              xColor={overallColor}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                })
              }
            />
            <View style={styles.titleWrapper}>
              <Text style={[styles.score, { color: overallColor }]}>
                {overallVibrationScore.toFixed(0)}%
              </Text>
              <Text style={[styles.label, { textShadowColor: overallColor }]}>{overallLabel}</Text>
            </View>
          </>
        }
        middleContent={
          <View style={styles.innerContent}>
            <CustomButton
              imgSource={overallImage}
              onPress={() => navigation.navigate("ResultDetails")}
            />
            <View style={[styles.descriptionBox, { backgroundColor: overallColor }]}>
              <Text style={styles.descriptionText}>{overallDescription}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("ResultDetails")}
                style={styles.infoButton}
              >
                <FastImage source={infoImage} style={styles.infoImage} resizeMode="contain" />
              </TouchableOpacity>
            </View>
          </View>
        }
        bottomContent={
          <>{saving && <ActivityIndicator size="large" color="#fff" style={styles.loading} />}</>
        }
      />
    </GradientBackground>
  );
};
