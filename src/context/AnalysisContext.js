import React, { useEffect, createContext, useState, useMemo, useContext } from "react";
import {
  // evaluateEnvironment,
  evaluateMotion,
  evaluateVoiceClarity,
  evaluateVoiceFrequency,
  evaluateVoiceStrength,
  evaluateEmotionalState,
  getVibrationInfo,
  isValidScore,
} from "@utils";
import { Colors } from "@/constants";

// Create the Context
const AnalysisContext = createContext();

// Helper function for normalization
const normalize = (value, min, max) => ((value - min) / (max - min)) * 100;

export const AnalysisProvider = ({ children }) => {
  const [voiceFrequency, setVoiceFrequency] = useState(50);
  const [heartRate, setHeartRate] = useState({
    bpm: 60,
    sdnn: 100,
    rmssd: 100,
  });
  const [rawBPM, setBPM] = useState();
  const [rawHRV, setHRV] = useState();
  const [heartRateScore, setHeartRateScore] = useState(0);
  const [hrvScore, setHRVScore] = useState(0);
  const [motion, setMotion] = useState(0);
  const [motionScore, setMotionScore] = useState();
  const [emotion, setEmotions] = useState(null);
  const [magnitude, setMagnitude] = useState(50);
  const [sound, setSound] = useState(-50);
  const [environment, setEnvironment] = useState(0);
  const [environmentScore, setEnvironmentScore] = useState();
  const [voiceStrength, setVoiceStrength] = useState(-1);
  const [voiceClarity, setVoiceClarity] = useState(5);

  const [auraColor, setAuraColor] = useState(Colors.aura70);
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
  const [vibrationInfo, setVibrationInfo] = useState(null);

  /****************************************************** */
  /* not currently used */
  const [bodyTemp, setBodyTemperature] = useState(37);
  const [sleepHours, setSleepHours] = useState(7);
  const [sleepQuality, setSleepQuality] = useState(7);
  const [voiceStrength1, setVoiceStrength1] = useState(-1);
  const [voiceClarity1, setVoiceClarity1] = useState(5);
  const [voiceStrength2, setVoiceStrength2] = useState(-1);
  const [voiceClarity2, setVoiceClarity2] = useState(5);
  const [frequency1, setFrequency1] = useState(50);
  const [frequency2, setFrequency2] = useState(50);
  //sdnn
  /****************************************************** */
  const resetAnalysis = () => {
    setVoiceFrequency(null);
    setHeartRate({ bpm: null, sdnn: null, rmssd: null });
    setSound(null);
    setMagnitude(null);
    setMotion(null);
    setEmotions(null);
    setVoiceClarity(null);
    setVoiceStrength(null);
    setEnvironment(null);
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

  const emotionScore = useMemo(() => {
  //c  if (emotion == null) return null;
    return evaluateEmotionalState(emotion);
  }, [emotion]);

  const voiceStrengthScore = useMemo(() => {
    if (voiceStrength == null) return null;
    return evaluateVoiceStrength(voiceStrength);
  }, [voiceStrength]);

  const voiceClarityScore = useMemo(() => {
    if (voiceClarity == null) return null;
    return evaluateVoiceClarity(voiceClarity);
  }, [voiceClarity]);

  const voiceFrequencyScore = useMemo(() => {
    if (voiceFrequency == null) return null;
    return evaluateVoiceFrequency(voiceFrequency);
  }, [voiceFrequency]);

  useEffect(() => {
    if (motion !== null) {
      const motionEval = evaluateMotion({
        avgMagnitude: motion,
      });
      // ////console.log("motion:", motionEval.label);
      // ////console.log("final motionScore:", motionEval.score);
      setMotionScore(motionEval.score);
    }
  }, [motion]);

  // useEffect(() => {
  //   if (sound !== null && magnitude !== null) {
  //     const soundLevelDb = 100 + sound; // convert to decibels
  //     const environmentEval = evaluateEnvironment({
  //       soundLevelDb: soundLevelDb,
  //       magnetometerValue: magnitude,
  //     });
  //     // ////console.log("final environmentScore:", environmentEval.overall.score);
  //     setEnvironmentScore(environmentEval.overall.score);
  //   }
  // }, [sound, magnitude]);

  useEffect(() => {
    if (environment !== null) {
      // ////console.log("final environmentScore:", environmentEval.overall.score);
      setEnvironmentScore(environment);
    //console.log("ENVIRONMENT SCORE SET:", environment)
    }
  }, [environment]);

  useEffect(() => {
    //  ////console.log("HEARTRATE:", heartRate)
    if (heartRate.rmssd !== null) {
      const roundRawHRV = Math.round(heartRate.rmssd);
      setHRV(roundRawHRV);
      //  ////console.log("rmssd:", heartRate.rmssd);
      const normHRV = 100 - normalize(heartRate.rmssd, 10, 120);
      // ////console.log("final HRV:", normHRV);
      const roundedHRV = Math.round(normHRV);
      setHRVScore(roundedHRV);
    }
    if (heartRate.bpm !== null) {
      // ////console.log("BPM:", heartRate.bpm);
      const roundRawBPM = Math.round(heartRate.bpm);
      setBPM(roundRawBPM);
      const normBPM = 100 - normalize(heartRate.bpm, 40, 180); // lower the better
      // ////console.log("final BPM:", normBPM);
      const roundedHRV = Math.round(normBPM);
      setHeartRateScore(roundedHRV);
    }
  }, [heartRate]);

  useEffect(() => {
    const scores = [
      { label: "voiceFrequencyScore", score: voiceFrequencyScore?.score, weight: 0.1 },
      { label: "voiceClarityScore", score: voiceClarityScore?.score, weight: 0.1 },
      { label: "voiceStrengthScore", score: voiceStrengthScore?.score, weight: 0.1 },
      { label: "environmentScore", score: environmentScore, weight: 0.15 },
      { label: "motionScore", score: motionScore, weight: 0.05 },
      { label: "heartRateScore", score: heartRateScore, weight: 0.2 },
      { label: "hrvScore", score: hrvScore, weight: 0.1 },
      { label: "emotionScore", score: emotionScore?.score, weight: 0.2 },
    ];

    const valid = scores.filter(({ label, score }) => isValidScore(label, score));
    const invalid = scores.filter(({ label, score }) => !isValidScore(label, score));

    //console.log("✅ Included in overall vibration score:");
    valid.forEach(({ label, score, weight }) => {
      //console.log(`- ${label}: score = ${score}, weight = ${weight}`);
    });

    //console.log("❌ Skipped due to invalid or missing value:");
    invalid.forEach(({ label, score }) => {
      //console.log(`- ${label}: score = ${score}`);
    });
    const totalWeight = valid.reduce((sum, { weight }) => sum + weight, 0);

    if (valid.length === 0) return;

    const weightedSum = valid.reduce((sum, { score, weight }) => sum + score * weight, 0);
    const normalizedScore = Math.min(Math.max(weightedSum / totalWeight, 0), 100);
    const roundedOverall = Math.round(normalizedScore);

    //console.log("dynamic weighted score:", normalizedScore);
    setOverallVibeScore(roundedOverall);
    setVibrationInfo(getVibrationInfo(roundedOverall));
  }, [
    voiceFrequencyScore,
    voiceClarityScore,
    voiceStrengthScore,
    environmentScore,
    motionScore,
    heartRateScore,
    hrvScore,
    emotionScore,
  ]);

  const chakraColors = {
    root: Colors.rootChakra,
    sacral: Colors.sacralChakra,
    solarPlexus: Colors.solarPlexusChakra,
    heart: Colors.heartChakra,
    throat: Colors.throatChakra,
    thirdEye: Colors.thirdEyeChakra,
    crown: Colors.crownChakra,
  };

  const getAuraColor = () => {
    let aura = Colors.white;
    if (overallVibrationScore >= 90) aura = Colors.white;
    else if (overallVibrationScore >= 70) aura = Colors.aura70;
    else if (overallVibrationScore >= 50) aura = Colors.aura50;
    else if (overallVibrationScore >= 30) aura = Colors.aura30;
    else if (overallVibrationScore >= 20) aura = Colors.aura20;
    else if (overallVibrationScore >= 10) aura = Colors.aura10;
    else aura = Colors.auraNone;

    const strongestChakra = Object.entries(chakraScores).reduce(
      (a, b) => (b[1] > a[1] ? b : a),
      [],
    )[0];
    if (chakraScores[strongestChakra] >= 8) aura = chakraColors[strongestChakra];
    if (emotionScore?.score > 8) aura = Colors.goldenRod;
    else if (emotionScore?.score < 3) aura = Colors.auraGray;

    return aura;
  };

  useEffect(() => {
    if (
      overallVibrationScore &&
      emotionScore &&
      motionScore &&
      voiceStrengthScore &&
      hrvScore &&
      heartRateScore &&
      voiceClarityScore &&
      voiceFrequencyScore
    )
      //console.log("updating chakra scores");
    updateChakraScores();
    setAuraColor(getAuraColor()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    overallVibrationScore,
    emotionScore,
    motionScore,
    voiceStrengthScore,
    hrvScore,
    heartRateScore,
    voiceClarityScore,
    voiceFrequencyScore,
  ]);

  // const updateChakraScores = () => {
  //   setChakraScores({
  //     root: Math.round(motionScore),
  //     sacral: Math.round(emotionScore?.score),
  //     solarPlexus: Math.round((hrvScore + voiceStrengthScore?.score) / 2),
  //     heart: Math.round((heartRateScore + environmentScore) / 2), // optional blend
  //     throat: Math.round(voiceClarityScore?.score),
  //     thirdEye: Math.round(voiceFrequencyScore?.score), // reflects intuitive vocal tone
  //     crown: Math.round(overallVibrationScore),
  //   });
  // };

  const updateChakraScores = () => {
    const safeAvg = (a, b) => {
      const valid = [a, b].filter((v) => typeof v === "number" && !isNaN(v));
      if (valid.length === 0) return 0;
      const notZero = Math.round(valid.reduce((sum, val) => sum + val, 0) / valid.length);
      if (notZero >= 0) { return notZero }
      else
        return 0;
    };

    setChakraScores({
      root: typeof motionScore === "number" && !isNaN(motionScore) ? Math.round(motionScore) : 0,

      sacral:
        typeof emotionScore?.score === "number" && !isNaN(emotionScore.score)
          ? Math.round(emotionScore.score)
          : 0,

      solarPlexus: safeAvg(hrvScore, voiceStrengthScore?.score),

      heart: safeAvg(heartRateScore, environmentScore),

      throat:
        typeof voiceClarityScore?.score === "number" && !isNaN(voiceClarityScore.score)
          ? Math.round(voiceClarityScore.score)
          : 0,

      thirdEye:
        typeof voiceFrequencyScore?.score === "number" && !isNaN(voiceFrequencyScore.score)
          ? Math.round(voiceFrequencyScore.score)
          : 0,

      crown:
        typeof overallVibrationScore === "number" && !isNaN(overallVibrationScore)
          ? Math.round(overallVibrationScore)
          : 0,
    });
  };

  return (
    <AnalysisContext.Provider
      value={{
        voiceFrequencyScore,
        voiceClarityScore,
        voiceStrengthScore,
        environmentScore,
        motionScore,
        heartRateScore,
        hrvScore,
        emotionScore,
        voiceFrequency,
        frequency1,
        frequency2,
        setVoiceFrequency,
        setEnvironment,
        setFrequency1,
        setFrequency2,
        setVoiceStrength1,
        setVoiceStrength2,
        setVoiceClarity1,
        setVoiceClarity2,
        setVoiceStrength,
        setVoiceClarity,
        updateChakraScores,
        heartRate,
        setHeartRate,
        motion,
        setMotion,
        bodyTemp,
        setBodyTemperature,
        setEmotions,
        sound,
        setSound,
        magnitude,
        setMagnitude,
        sleepHours,
        setSleepHours,
        sleepQuality,
        setSleepQuality,
        auraColor,
        setAuraColor,
        chakraScores,
        chakraColors,
        voiceClarity,
        voiceStrength,
        voiceClarity1,
        voiceClarity2,
        voiceStrength1,
        voiceStrength2,
        overallVibrationScore,
        vibrationInfo,
        rawHRV,
        rawBPM,
        resetAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);
