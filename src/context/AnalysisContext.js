import React, { useEffect, createContext, useState, useMemo, useContext } from "react";
import {
  evaluateEnvironment,
  evaluateMotion,
  evaluateVoiceClarity,
  evaluateVoiceFrequency,
  evaluateVoiceStrength,
  evaluateEmotionalState,
  getVibrationInfo,
  isValidScore,
} from "@utils";

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
  const [heartRateScore, setHeartRateScore] = useState(0);
  const [hrvScore, setHRV] = useState(0);
  const [motion, setMotion] = useState(0);
  const [motionScore, setMotionScore] = useState();
  const [emotion, setEmotions] = useState(null);
  const [magnitude, setMagnitude] = useState(50);
  const [sound, setSound] = useState(-50);
  const [environmentScore, setEnvironmentScore] = useState();
  const [voiceStrength, setVoiceStrength] = useState(-1);
  const [voiceClarity, setVoiceClarity] = useState(5);

  const [auraColor, setAuraColor] = useState("#DAA520");
  const [overallVibrationScore, setOverallVibeScore] = useState(0);
  const [chakraScores, setChakraScores] = useState({
    root: null,
    sacral: null,
    solarPlexus: null,
    heart: null,
    throat: null,
    thirdEye: null,
    crown: null,
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
    setChakraScores({
      root: null,
      sacral: null,
      solarPlexus: null,
      heart: null,
      throat: null,
      thirdEye: null,
      crown: null,
    });
  };

  const emotionScore = useMemo(() => {
    if (emotion == null) return null;
    return evaluateEmotionalState(emotion);
  }, [emotion]);

  const voiceStrengthScore = useMemo(() => {
    if (voiceStrength == null) return null;
    //console.log("VOICE STRENGTH:", voiceStrength);
    const norm = normalize(voiceStrength, 0, 300);
    //console.log("VOICE STRENGTH:", norm);
    return evaluateVoiceStrength(norm);
  }, [voiceStrength]);

  const voiceClarityScore = useMemo(() => {
    if (voiceClarity == null) return null;
    //console.log("VOICE CLARITY:", voiceClarity);
    const norm = normalize(voiceClarity, 0, 300);
    //console.log("VOICE CLARITY:", norm);
    return evaluateVoiceClarity(norm);
  }, [voiceClarity]);

  const voiceFrequencyScore = useMemo(() => {
    if (voiceFrequency == null) return null;
    //   console.log("VOICE FREQUENCY:", voiceFrequency);
    // const norm = normalize(frequency, 75, 250);
    return evaluateVoiceFrequency(voiceFrequency);
  }, [voiceFrequency]);

  useEffect(() => {
    if (motion !== null) {
      const motionEval = evaluateMotion({
        avgMagnitude: motion,
      });
      // //console.log("motion:", motionEval.label);
      // //console.log("final motionScore:", motionEval.score);
      setMotionScore(motionEval.score);
    }
  }, [motion]);

  useEffect(() => {
    if (sound !== null && magnitude !== null) {
      const soundLevelDb = 100 + sound; // convert to decibels
      const environmentEval = evaluateEnvironment({
        soundLevelDb: soundLevelDb,
        magnetometerValue: magnitude,
      });
      // //console.log("final environmentScore:", environmentEval.overall.score);
      setEnvironmentScore(environmentEval.overall.score);
    }
  }, [sound, magnitude]);

  useEffect(() => {
    //  //console.log("HEARTRATE:", heartRate)
    if (heartRate.rmssd !== null) {
      //  //console.log("rmssd:", heartRate.rmssd);
      const normHRV = 100 - normalize(heartRate.rmssd, 10, 120);
      // //console.log("final HRV:", normHRV);
      setHRV(normHRV);
    }
    if (heartRate.bpm !== null) {
      // //console.log("BPM:", heartRate.bpm);
      const normBPM = 100 - normalize(heartRate.bpm, 40, 180); // lower the better
      // //console.log("final BPM:", normBPM);
      setHeartRateScore(normBPM);
    }
  }, [heartRate]);

  // useEffect(() => {
  //   if (
  //     voiceFrequencyScore !== null &&
  //     voiceClarityScore !== null &&
  //     voiceStrengthScore !== null &&
  //     environmentScore != null &&
  //     motionScore !== null &&
  //     heartRateScore !== null &&
  //     hrvScore !== null &&
  //     emotionScore !== null
  //   ) {
  //     console.log("frequency:", voiceFrequencyScore);
  //     console.log("voiceClarity:", voiceClarityScore);
  //     console.log("voiceStrengthScore:", voiceStrengthScore);
  //     console.log("environmentScore:", environmentScore);
  //     console.log("motionScore:", motionScore);
  //     console.log("heartRateScore:", heartRateScore);
  //     console.log("hrvScore:", hrvScore);
  //     console.log("emotionScore:", emotionScore);
  //     const overallVibrationScore = Math.min(
  //       Math.max(
  //         voiceFrequencyScore.score * 0.1 +
  //           voiceClarityScore.score * 0.1 +
  //           voiceStrengthScore.score * 0.1 +
  //           environmentScore * 0.15 +
  //           motionScore * 0.05 +
  //           heartRateScore * 0.2 +
  //           hrvScore * 0.1 +
  //           emotionScore.score * 0.2,
  //       ),
  //       100,
  //     );
  //     //console.log("final overall score:", overallVibrationScore);
  //     setOverallVibeScore(overallVibrationScore);

  //     const info = getVibrationInfo(overallVibrationScore); // Import from your utility
  //     setVibrationInfo(info);
  //   }
  // }, [
  //   voiceFrequencyScore,
  //   voiceClarityScore,
  //   voiceStrengthScore,
  //   environmentScore,
  //   motionScore,
  //   heartRateScore,
  //   hrvScore,
  //   emotionScore,
  // ]);

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

    console.log("✅ Included in overall vibration score:");
    valid.forEach(({ label, score, weight }) => {
      console.log(`- ${label}: score = ${score}, weight = ${weight}`);
    });

    console.log("❌ Skipped due to invalid or missing value:");
    invalid.forEach(({ label, score }) => {
      console.log(`- ${label}: score = ${score}`);
    });
    const totalWeight = valid.reduce((sum, { weight }) => sum + weight, 0);

    if (valid.length === 0) return;

    const weightedSum = valid.reduce((sum, { score, weight }) => sum + score * weight, 0);
    const normalizedScore = Math.min(Math.max(weightedSum / totalWeight, 0), 100);

    console.log("dynamic weighted score:", normalizedScore);
    setOverallVibeScore(normalizedScore);
    setVibrationInfo(getVibrationInfo(normalizedScore));
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
    root: "#FF0000",
    sacral: "#FF7F00",
    solarPlexus: "#DAA520",
    heart: "#00FF00",
    throat: "#0000FF",
    thirdEye: "#4B0082",
    crown: "#9400D3",
  };

  const getAuraColor = () => {
    let aura = "#FFFFFF";
    if (overallVibrationScore >= 90) aura = "#FFFFFF";
    else if (overallVibrationScore >= 70) aura = "#9400D3";
    else if (overallVibrationScore >= 50) aura = "#4B0082";
    else if (overallVibrationScore >= 30) aura = "#00FF00";
    else if (overallVibrationScore >= 20) aura = "#FFD700";
    else if (overallVibrationScore >= 10) aura = "#FF7F00";
    else aura = "#FF0000";

    const strongestChakra = Object.entries(chakraScores).reduce(
      (a, b) => (b[1] > a[1] ? b : a),
      [],
    )[0];
    if (chakraScores[strongestChakra] >= 8) aura = chakraColors[strongestChakra];
    if (emotionScore?.score > 8) aura = "#DAA520";
    else if (emotionScore?.score < 3) aura = "#808080";

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
      console.log("updating chakra scores");
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
      return Math.round(valid.reduce((sum, val) => sum + val, 0) / valid.length);
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
        resetAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);
