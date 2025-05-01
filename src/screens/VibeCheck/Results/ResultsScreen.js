import React, {
  useContext,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Button,
  SafeAreaView,
} from "react-native";
import { playTrack, isPlayingTrack } from "@services";
import { useAnalysis } from "@context";
import { dropTable } from "@database/database";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { CustomButton, CloseX, GradientBackground } from "@components";
import { SCREEN_HEIGHT, SCREEN_WIDTH, saveResults } from "@utils";
import { vibrationLevels } from "@data";
import { Colors, Fonts } from "@constants";

// Disable scaling for all Text components locally
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export default function ResultsScreen({ navigation }) {
  const [overallLabel, setLabel] = useState();
  const [overallDescription, setDescription] = useState();
  const [overallImage, setImage] = useState();
  const [overallColor, setColor] = useState();
  const [voice, setAudio] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const backgroundImage = require("@assets/images/backgroundResults.webp");
  const infoImage = require("@assets/images/info.webp");
  const hasSaved = useRef(false);
  const getVibrationInfo = (score) =>
    vibrationLevels.find((level) => score >= level.minScore);

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

  useEffect(() => {
    if (overallVibrationScore != null && !hasSaved.current) {
      updateOverallVibrationUI(overallVibrationScore);
      saveResultsToDB();
      hasSaved.current = true;
    }
    return () => { };
  }, [overallVibrationScore]);

  useEffect(() => {
    console.log("voice in useeffect:", voice);
    if (!voice || typeof voice !== "object") return;
    const playVoice = async () => {
      try {
        const playing = await isPlayingTrack();
        console.log("voice ready to play:", voice);
        console.log("current state:", playing);
        if (playing === "stopped" || playing === "none") {
          await playTrack({
            id: "result-voice",
            url: voice,
            title: "Result",
            artist: "VibeKey",
          });
        }
      } catch (e) {
        console.warn("Audio playback error:", e);
      }
    };
    playVoice();
  }, [voice]);

  function updateOverallVibrationUI(score) {
    const result = getVibrationInfo(score);
    console.log("result:", result);
    if (result) {
      setLabel(result.label);
      setDescription(result.description);
      setColor(result.color);
      setImage(result.image);
      setAudio(result.url);
    }
  }

  const startOver = () => {
    navigation.navigate("VibeCheckScreen");
  };

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
      //  console.log("dropping table");
      //  dropTable();
      //   console.log("table dropped");
      console.log("Saving to local DB:", newResult);
      await saveResults(newResult); // Calls both local and Firestore
      setSaving(false);
    }
  };

  return (
    // <GradientBackground
    //   colors={[
    //     Colors.VibeGradient1,
    //     Colors.VibeGradient2,
    //     Colors.VibeGradient1,
    //   ]}
    // >
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["bottom"]}
    >
      <CloseX
        xColor={overallColor}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        }
      />
      {/* <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={styles.background}
        > */}
      <View style={styles.innerContent}>
        <Text style={[styles.score, { color: overallColor }]}>
          {overallVibrationScore.toFixed(0)}%
        </Text>

        <Text style={[styles.label, { textShadowColor: overallColor }]}>
          {overallLabel}
        </Text>

        {/* <TouchableOpacity onPress={goToDetails}> */}
        <CustomButton imgSource={overallImage} />
        {/* </TouchableOpacity> */}

        <View
          style={[styles.descriptionBox, { backgroundColor: overallColor }]}
        >
          <Text style={styles.descriptionText}>{overallDescription}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ResultDetails")}
            style={styles.infoButton}
          >
            <Image
              source={infoImage}
              style={styles.infoImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      {saving && (
        <ActivityIndicator
          size="large"
          color="#fff"
          style={{ marginTop: 20 }}
        />
      )}
    </SafeAreaView>
    // </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    //   height: "100%",
  },
  innerContent: {
    flex: 1,
    paddingTop: SCREEN_HEIGHT * 0.1,
    //    paddingBottom: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: SCREEN_WIDTH * 0.06,
  },
  score: {
    fontSize: SCREEN_HEIGHT * 0.06, // ~36 on 800 height screen
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    fontSize: SCREEN_HEIGHT * 0.06,
    color: "white",
    textAlign: "center",
    textShadowRadius: 2,
    textShadowOffset: { width: 2, height: 2 },
    marginBottom: SCREEN_HEIGHT * 0.015,
  },
  descriptionBox: {
    marginTop: SCREEN_HEIGHT * 0.02,
    borderRadius: 30,
    padding: 20,
    maxWidth: SCREEN_WIDTH * 0.9,
    alignItems: "center", // center the contents
    alignSelf: "center", // center the box itself
    justifyContent: "flex-start",
    width: "90%", // make sure it stretches properly
    paddingBottom: 60,
  },

  descriptionText: {
    color: "#f5f6fa",
    fontSize: SCREEN_HEIGHT * 0.022,
    textAlign: "center",
  },
  infoButton: {
    position: "absolute",
    bottom: 10,
    padding: 10,
    marginTop: 30,
    zIndex: 10,
  },
  infoImage: {
    width: 24,
    height: 24,
  },
  saveButton: {
    position: "absolute",
    top: 40,
    left: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  historyButton: {
    position: "absolute",
    top: 80,
    left: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  goHomeButton: {
    position: "absolute",
    top: 120,
    left: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
});
