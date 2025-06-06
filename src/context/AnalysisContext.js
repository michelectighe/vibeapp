// context/AnalysisContext.js
import React, { useEffect, createContext, useState, useMemo, useContext } from "react";
import {
  calculateChakraScores,
  calculateOverallVibe,
  normalizeInverted,
  getVibrationInfo,
  parseMetric,
} from "@/utils";
import {
  evaluateEmotionalState,
  evaluateMotion,
  evaluatevoiceEmotion,
  evaluateVoiceStrength,
  evaluateVoiceFrequency,
  evaluateEnvironmentScore,
  evaluateHawkins,
} from "@/utils";
import { Colors } from "@/constants";

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [voiceFrequency, setVoiceFrequency] = useState(null);
  const [voiceEmotion, setVoiceEmotion] = useState(null);
  const [voiceStrength, setVoiceStrength] = useState(null);
  const [emotion, setEmotions] = useState(null);
  const [motion, setMotion] = useState(null);
  const [environment, setEnvironment] = useState(null);
  const [heartRate, setHeartRate] = useState({ bpm: null, rmssd: null });
  const [sound, setSound] = useState(null);
  const [magnitude, setMagnitude] = useState(null);
  const [vibrationInfo, setVibrationInfo] = useState(null);
  const [resultId, setResultId] = useState();
  const [journalId, setJournalId] = useState(0);
  const [hawkins, setHawkins] = useState();

  const [overallVibrationScore, setOverallVibeScore] = useState(0);
  const [chakraScores, setChakraScores] = useState({
    root: -1,
    sacral: -1,
    solarPlexus: -1,
    heart: -1,
    throat: -1,
    thirdEye: -1,
    crown: -1,
  });

  const emotionScore = useMemo(() => {
    console.log('change in emotion score')
    return emotion != null ? evaluateEmotionalState(emotion) : null;
  }, [emotion]);

  const voiceEmotionScore = useMemo(() => {
    return voiceEmotion != null ? evaluatevoiceEmotion(voiceEmotion) : null;
  }, [voiceEmotion]);

  const voiceStrengthScore = useMemo(() => {
    return voiceStrength != null ? evaluateVoiceStrength(voiceStrength) : null;
  }, [voiceStrength]);

  const voiceFrequencyScore = useMemo(() => {
    return voiceFrequency != null ? evaluateVoiceFrequency(voiceFrequency) : null;
  }, [voiceFrequency]);

  const motionScore = useMemo(() => {
    return motion != null ? evaluateMotion(motion) : null;
  }, [motion]);

  const environmentScore = useMemo(() => {
    return environment != null ? evaluateEnvironmentScore(environment) : null;
  }, [environment]);

  const hawkinsScore = useMemo(() => {
    return hawkins != null ? evaluateHawkins(hawkins) : null;
  }, [hawkins]);

  const bpmScore = useMemo(() => {
    if (heartRate?.bpm == null) return null;
    const raw = heartRate.bpm;
    const score = normalizeInverted(raw, 40, 180);
    return { score: Math.round(score), value: raw };
  }, [heartRate.bpm]);

  const hrvScore = useMemo(() => {
    if (heartRate?.rmssd == null) return null;
    const raw = heartRate.rmssd;
    const score = normalizeInverted(raw, 10, 120);
    return { score: Math.round(score), value: raw };
  }, [heartRate.rmssd]);

  useEffect(() => {
    if (
      voiceFrequencyScore &&
      // voiceEmotionScore &&
      voiceStrengthScore &&
      environmentScore &&
      motionScore &&
      bpmScore &&
      hrvScore &&
      emotionScore
    ) {
      const scores = [
        { score: voiceFrequencyScore?.score, weight: 0.1 },
      //  { score: voiceEmotionScore?.score, weight: 0.1 },
        { score: voiceStrengthScore?.score, weight: 0.15 },
        { score: environmentScore?.score, weight: 0.15 },
        { score: motionScore?.score, weight: 0.1 },
        { score: bpmScore?.score, weight: 0.2 },
        { score: hrvScore?.score, weight: 0.1 },
        { score: emotionScore?.score, weight: 0.2 },
      ];
          console.log("voiceFrequency:", voiceFrequencyScore?.score);
          console.log("voiceStrength:", voiceStrengthScore?.score);
          console.log("environment:", environmentScore?.score);
          console.log("motion:", motionScore?.score);
          console.log("bpm:", bpmScore?.score);
          console.log("hrv:", hrvScore?.score);
          console.log("emotion:", emotionScore?.value);
      const { overallScore, hawkins } = calculateOverallVibe(scores);
      setOverallVibeScore(overallScore);
      setHawkins(hawkins);
      setVibrationInfo(getVibrationInfo(overallScore));
    }
  }, [
    voiceFrequencyScore,
    voiceEmotionScore,
    voiceStrengthScore,
    environmentScore,
    motionScore,
    bpmScore,
    hrvScore,
    emotionScore,
  ]);

  useEffect(() => {
    // only calculate chakras once all scores have been updated

    if (
      overallVibrationScore &&
      emotionScore &&
      motionScore &&
      voiceStrengthScore &&
      hrvScore &&
      bpmScore &&
     // voiceEmotionScore &&
      voiceFrequencyScore
    ) {
      const chakra = calculateChakraScores({
        motionScore: motionScore?.score,
        emotionScore: emotionScore?.score,
        hrvScore: hrvScore?.score,
        voiceStrengthScore: voiceStrengthScore?.score,
        bpmScore: bpmScore?.score,
        environmentScore: environmentScore?.score,
      //  voiceEmotionScore: voiceEmotionScore?.score,
        voiceFrequencyScore: voiceFrequencyScore?.score,
        overallVibrationScore,
      });
      setChakraScores(chakra);
    }
  }, [
    motionScore,
    emotionScore,
    hrvScore,
    voiceStrengthScore,
    bpmScore,
    environmentScore,
    voiceEmotionScore,
    voiceFrequencyScore,
    overallVibrationScore,
  ]);

  const resetAnalysis = () => {
    setVoiceFrequency(null);
    setVoiceEmotion(null);
    setVoiceStrength(null);
    setMotion(null);
    setSound(null);
    setMagnitude(null);
    setEnvironment(null);
    setEmotions(null);
    setHeartRate({ bpm: null, rmssd: null });
    setChakraScores({
      root: -1,
      sacral: -1,
      solarPlexus: -1,
      heart: -1,
      throat: -1,
      thirdEye: -1,
      crown: -1,
    });
  };

  const setResult = (result) => {
    if (!result) return;
    try {
      const cleanResult = {
        ...result,
        emotionScore: parseMetric(result.emotionScore),
        bpmScore: parseMetric(result.bpmScore),
        hrvScore: parseMetric(result.hrvScore),
     //   voiceEmotionScore: parseMetric(result.voiceEmotionScore),
        voiceFrequencyScore: parseMetric(result.voiceFrequencyScore),
        voiceStrengthScore: parseMetric(result.voiceStrengthScore),
        motionScore: parseMetric(result.motionScore),
        environmentScore: parseMetric(result.environmentScore),
      };
      setEmotions(cleanResult.emotionScore?.value);
      setHeartRate({ bpm: cleanResult.bpmScore?.value, rmssd: cleanResult.hrvScore?.value });
    //  setVoiceEmotion(cleanResult.voiceEmotionScore?.value);
      setVoiceFrequency(cleanResult.voiceFrequencyScore?.value);
      setVoiceStrength(cleanResult.voiceStrengthScore?.value);
      setMotion(cleanResult.motionScore?.value);
      setEnvironment(cleanResult.environmentScore.value);
      setChakraScores(cleanResult.chakraScores);
      setResultId(cleanResult.resultId);
      setJournalId(cleanResult.journalId);
    } catch (error) {
      console.error("error setting old data:", error);
    }
  };

  return (
    <AnalysisContext.Provider
      value={{
        voiceFrequency,
        setVoiceFrequency,
        voiceEmotion,
        setVoiceEmotion,
        voiceStrength,
        setVoiceStrength,
        emotion,
        setEmotions,
        motion,
        setMotion,
        sound,
        setSound,
        magnitude,
        setMagnitude,
        environment,
        setEnvironment,
        heartRate,
        setHeartRate,
        emotionScore,
        voiceFrequencyScore,
        voiceEmotionScore,
        voiceStrengthScore,
        motionScore,
        environmentScore,
        bpmScore,
        hrvScore,
        overallVibrationScore,
        hawkinsScore,
        chakraScores,
        resultId,
        setResultId,
        journalId,
        setJournalId,
        resetAnalysis,
        vibrationInfo,
        setResult,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);
