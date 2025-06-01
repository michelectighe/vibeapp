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
  evaluateEnvironment,
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
  const [heartRate, setHeartRate] = useState({ bpm: null, sdnn: null, rmssd: null });
  const [sound, setSound] = useState(null);
  const [magnitude, setMagnitude] = useState(null);
  const [vibrationInfo, setVibrationInfo] = useState(null);
  const [rawHRV, setHRV] = useState(null);
  const [rawBPM, setBPM] = useState(null);
  const [resultId, setResultId] = useState();
  const [journalId, setJournalId] = useState();

  const [overallVibrationScore, setOverallVibeScore] = useState(0);
  const [hawkinsScore, setHawkinsScore] = useState(0);
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
    return motion != null ? evaluateMotion({ avgMagnitude: motion }) : null;
  }, [motion]);

  const environmentScore = useMemo(() => {
    if (sound != null && magnitude != null) {
      return evaluateEnvironment({
        soundLevelDb: 100 + sound,
        magnetometerValue: magnitude,
        percentGood: 100 + sound, // or however you're deriving it
      }).overall;
    }
    return null;
  }, [sound, magnitude]);
  const heartRateScore = useMemo(() => {
    if (heartRate.bpm == null) return null;
    const score = normalizeInverted(heartRate.bpm, 40, 180);
    setBPM(Math.round(heartRate.bpm));
    return { score: Math.round(score), bpm: heartRate.bpm };
  }, [heartRate.bpm]);

  const hrvScore = useMemo(() => {
    if (heartRate.rmssd == null) return null;
    const raw = Math.round(heartRate.rmssd);
    setHRV(raw);
    const score = normalizeInverted(raw, 10, 120);
    return { score: Math.round(score), rmssd: raw };
  }, [heartRate.rmssd]);

  useEffect(() => {
    const scores = [
      { score: voiceFrequency?.score, weight: 0.1 },
      { score: voiceClarityScore?.score, weight: 0.1 },
      { score: voiceStrengthScore?.score, weight: 0.1 },
      { score: environmentScore?.score, weight: 0.15 },
      { score: motionScore?.score, weight: 0.05 },
      { score: heartRateScore?.score, weight: 0.2 },
      { score: hrvScore?.score, weight: 0.1 },
      { score: emotionScore?.score, weight: 0.2 },
    ];
    const { overallScore, hawkinsScore } = calculateOverallVibe(scores);
    setOverallVibeScore(overallScore);
    setHawkinsScore(hawkinsScore);
    setVibrationInfo(getVibrationInfo(overallScore));
  }, [
    voiceFrequency,
    voiceClarityScore,
    voiceStrengthScore,
    environmentScore,
    motionScore,
    heartRateScore,
    hrvScore,
    emotionScore,
  ]);

  useEffect(() => {
    const chakra = calculateChakraScores({
      motionScore: motionScore?.score,
      emotionScore: emotionScore?.score,
      hrvScore: hrvScore?.score,
      voiceStrengthScore: voiceStrengthScore?.score,
      heartRateScore: heartRateScore?.score,
      environmentScore: environmentScore?.score,
      voiceClarityScore: voiceClarityScore?.score,
      voiceFrequencyScore: voiceFrequency?.score,
      overallVibrationScore,
    });
    setChakraScores(chakra);
  }, [
    motionScore,
    emotionScore,
    hrvScore,
    voiceStrengthScore,
    heartRateScore,
    environmentScore,
    voiceClarityScore,
    voiceFrequency,
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
    setHeartRate({ bpm: null, sdnn: null, rmssd: null });
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
        heartRateScore: parseMetric(result.heartRateScore),
        voiceClarityScore: parseMetric(result.voiceClarityScore),
        voiceFrequencyScore: parseMetric(result.voiceFrequencyScore),
        voiceStrengthScore: parseMetric(result.voiceStrengthScore),
        motionScore: parseMetric(result.motionScore),
        environmentScore: parseMetric(result.environmentScore),
      };
      setEmotions(cleanResult.emotionScore?.value);
      setHeartRate(cleanResult.heartRateScore);
      setVoiceClarity(cleanResult.voiceClarityScore?.raw);
      setVoiceFrequency(cleanResult.voiceFrequencyScore?.raw);
      setVoiceStrength(cleanResult.voiceStrengthScore?.value);
      setMotion(cleanResult.motionScore?.value);
      setEnvironment(cleanResult.environmentScore);
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
        heartRateScore,
        hrvScore,
        rawHRV,
        rawBPM,
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
