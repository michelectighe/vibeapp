import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import FastImage from "react-native-fast-image";
import { playTrack } from "@services";
import { useAnalysis } from "@context";
import { Ionicons } from "@expo/vector-icons";
import { CustomButton, CloseX } from "@components";
import { audioMap, SCREEN_HEIGHT, SCREEN_WIDTH, saveResults } from "@utils";
import { vibrationLevels } from "@data";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./ResultsScreen.styles";
import { globalStyles } from "@styles";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export const ResultsScreen = ({ navigation }) => {
  const [overallLabel, setLabel] = useState();
  const [overallDescription, setDescription] = useState();
  const [overallImage, setImage] = useState();
  const [overallColor, setColor] = useState();
  const [saving, setSaving] = useState(false);
  const infoImage = require("@assets/images/info.webp");
  const hasSaved = useRef(false);

  const {
    voiceFrequencyScore,
    voiceClarityScore,
    voiceStrengthScore,
    environmentScore,
    soundScore,
    magnitudeScore,
    motionScore,
    heartRateScore,
    hrvScore,
    emotionScore,
    overallVibrationScore,
    chakraScores,
  } = useAnalysis();

  const getVibrationInfo = (score) =>
    vibrationLevels.find((level) => score >= level.minScore);

  useEffect(() => {
    if (overallVibrationScore === null || hasSaved.current) return;

    const getDataAndPlayVoice = async () => {
      try {
        const result = getVibrationInfo(overallVibrationScore);
        if (!result) return;

        setLabel(result.label);
        setDescription(result.description);
        setColor(result.color);
        setImage(result.image);
        const audioSource = audioMap[result.id];

        hasSaved.current = true;
        // if (audioSource) {
        //   await playTrack(
        //     (id = "result-voice"),
        //     (url = audioSource),
        //     (title = "Result"),
        //     (artist = "VibeKey"),
        //     (vol = 0.5)
        //   );
        // }
      } catch (e) {
        console.warn("getDataAndPlayVoice error:", e);
      }
    };

    getDataAndPlayVoice();
  }, [overallVibrationScore]);

  const saveResultsToDB = async () => {
    setSaving(true);
    const newResult = {
      timestamp: new Date(),
      voiceFrequencyScore: voiceFrequencyScore.score,
      heartRateScore,
      hrvScore,
      motionScore,
      overallVibrationScore,
      chakraScores,
      environmentScore,
      voiceStrengthScore: voiceStrengthScore.score,
      voiceClarityScore: voiceClarityScore.score,
      emotionScore: emotionScore.score,
    };
    if (newResult) {
      console.log("Saving to local DB:", newResult);
      await saveResults(newResult);
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container} edges={["bottom"]}>
      <CloseX
        xColor={overallColor}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        }
      />
      <View style={styles.innerContent}>
        <Text style={[styles.score, { color: overallColor }]}>
          {overallVibrationScore.toFixed(0)}%
        </Text>

        <Text style={[styles.label, { textShadowColor: overallColor }]}>
          {overallLabel}
        </Text>

        <CustomButton imgSource={overallImage} />

        <View
          style={[styles.descriptionBox, { backgroundColor: overallColor }]}
        >
          <Text style={styles.descriptionText}>{overallDescription}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ResultDetails")}
            style={styles.infoButton}
          >
            <FastImage
              source={infoImage}
              style={styles.infoImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {saving && (
        <ActivityIndicator size="large" color="#fff" style={styles.loading} />
      )}
    </SafeAreaView>
  );
};
