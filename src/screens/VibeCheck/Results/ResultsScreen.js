import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import FastImage from "react-native-fast-image";
import { saveResults } from "@utils";
import { useAnalysis } from "@context";
import { CustomButton, CloseX, GradientBackground, SectionLayoutNotSafe } from "@components";
import { vibrationLevels } from "@data";
import { Colors } from "@constants";
import { styles } from "./ResultsScreen.styles";
import { globalStyles } from "@styles";
import HapticTest from "@/components/HapticTest";

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
  } = useAnalysis();

  const getVibrationInfo = (score) => {
    if (typeof score !== "number" || isNaN(score)) return null;
    return (
      vibrationLevels.find((level) => score >= level.minScore) ??
      vibrationLevels[vibrationLevels.length - 1]
    );
  };

  useEffect(() => {
    if (overallVibrationScore == null || hasSaved.current) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        const result = getVibrationInfo(overallVibrationScore);
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
  }, [overallVibrationScore]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveResultsToDB = async () => {
    setSaving(true);
    const newResult = {
      timestamp: new Date(),
      voiceFrequencyScore: voiceFrequencyScore?.score,
      heartRateScore,
      hrvScore,
      motionScore,
      overallVibrationScore,
      chakraScores,
      environmentScore,
      voiceStrengthScore: voiceStrengthScore?.score,
      voiceClarityScore: voiceClarityScore?.score,
      emotionScore: emotionScore?.score,
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
    <GradientBackground colors={[overallColor, "white", overallColor]}>
      <SectionLayoutNotSafe
        topFlex={1}
        middleFlex={4}
        bottomFlex={1}
        topContent={
          <>
            <HapticTest />
            <CloseX
              xColor={"white"}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                })
              }
            />
            <View style={globalStyles.titleWrapper}>
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
