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
  evaluateVoiceClarity,
  evaluateVoiceStrength,
  evaluateVoiceFrequency,
  evaluateEnvironmentScore,
  evaluateHawkins,
} from "@/utils";
import { Colors } from "@/constants";

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [voiceFrequency, setVoiceFrequency] = useState(null);
  const [voiceClarity, setVoiceClarity] = useState(null);
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

  const normalize = (value, min, max) => ((value - min) / (max - min)) * 100;
  const emotionScore = useMemo(() => {
    return emotion != null ? evaluateEmotionalState(emotion) : null;
  }, [emotion]);

  const voiceClarityScore = useMemo(() => {
    return voiceClarity != null ? evaluateVoiceClarity(voiceClarity) : null;
  }, [voiceClarity]);

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
    // console.log(
    //   "metrics for overallcalc:",
    //   voiceFrequencyScore,
    //   voiceClarityScore,
    //   voiceStrengthScore,
    //   environmentScore,
    //   motionScore,
    //   bpmScore,
    //   hrvScore,
    //   emotionScore,
    // );
    if (
      true
      // voiceFrequencyScore &&
      // voiceClarityScore &&
      // voiceStrengthScore &&
      // environmentScore &&
      // motionScore &&
      // bpmScore &&
      // hrvScore &&
      // emotionScore
    ) {
      const scores = [
        { score: voiceFrequencyScore?.score, weight: 0.1 },
        { score: voiceClarityScore?.score, weight: 0.1 },
        { score: voiceStrengthScore?.score, weight: 0.1 },
        { score: environmentScore?.score, weight: 0.15 },
        { score: motionScore?.score, weight: 0.05 },
        { score: bpmScore?.score, weight: 0.2 },
        { score: hrvScore?.score, weight: 0.1 },
        { score: emotionScore?.score, weight: 0.2 },
      ];
      // console.log("voiceFrequency:", voiceFrequencyScore?.score);
      // console.log("voiceClarity:", voiceClarityScore?.score);
      // console.log("voiceStrength:", voiceStrengthScore?.score);
      // console.log("environment:", environmentScore?.score);
      // console.log("mortion:", motionScore?.score);
      // console.log("bpm:", bpmScore?.score);
      // console.log("hrv:", hrvScore?.score);
      const { overallScore, hawkins } = calculateOverallVibe(scores);
      setOverallVibeScore(overallScore);
      setHawkins(hawkins);
      setVibrationInfo(getVibrationInfo(overallScore));
    }
  }, [
    voiceFrequencyScore,
    voiceClarityScore,
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
      voiceClarityScore &&
      voiceFrequencyScore
    ) {
      const chakra = calculateChakraScores({
        motionScore: motionScore?.score,
        emotionScore: emotionScore?.score,
        hrvScore: hrvScore?.score,
        voiceStrengthScore: voiceStrengthScore?.score,
        bpmScore: bpmScore?.score,
        environmentScore: environmentScore?.score,
        voiceClarityScore: voiceClarityScore?.score,
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
    voiceClarityScore,
    voiceFrequencyScore,
    overallVibrationScore,
  ]);

  const resetAnalysis = () => {
    setVoiceFrequency(null);
    setVoiceClarity(null);
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
        voiceClarityScore: parseMetric(result.voiceClarityScore),
        voiceFrequencyScore: parseMetric(result.voiceFrequencyScore),
        voiceStrengthScore: parseMetric(result.voiceStrengthScore),
        motionScore: parseMetric(result.motionScore),
        environmentScore: parseMetric(result.environmentScore),
      };
      setEmotions(cleanResult.emotionScore?.value);
      setHeartRate({ bpm: cleanResult.bpmScore?.value, rmssd: cleanResult.hrvScore?.value });
      setVoiceClarity(cleanResult.voiceClarityScore?.value);
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
        voiceClarity,
        setVoiceClarity,
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
        voiceClarityScore,
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
