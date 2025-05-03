import React, {
  useEffect,
  createContext,
  useState,
  useMemo,
  useContext,
} from "react";
import {
  evaluateEnvironment,
  evaluateMotion,
  evaluateVoiceClarity,
  evaluateVoiceFrequency,
  evaluateVoiceStrength,
  evaluateEmotionalState,
} from "@utils";

const defaultState = {
  voiceFrequency: null,
  heartRate: null,
  sound: null,
  magnitude: null,
  motion: null,
  emotion: null,
  voiceClarity: null,
  voiceStrength: null,
  chakraScores: null,
};

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
    root: 0,
    sacral: 0,
    solarPlexus: 0,
    heart: 0,
    throat: 0,
    thirdEye: 0,
    crown: 0,
  });

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
    setHeartRate({ bpm: 0, sdnn: 0, rmssd: 0 });
    setSound(null);
    setMagnitude(null);
    setMotion(null);
    setEmotions(null);
    setVoiceClarity(null);
    setVoiceStrength(null);
    setChakraScores({
      root: 0,
      sacral: 0,
      solarPlexus: 0,
      heart: 0,
      throat: 0,
      thirdEye: 0,
      crown: 0,
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

  const normSleepQuality = normalize(sleepQuality, 0, 10);
  const normSleepHours = normalize(sleepHours, 0, 10);

  const avgChakraScores =
    (Object.values(chakraScores).reduce((a, b) => a + b, 0) / 7) * 10;
  const normAvgChakraScores = normalize(avgChakraScores, 0, 100);

  useEffect(() => {
    if (
      voiceFrequencyScore !== null &&
      voiceClarityScore !== null &&
      voiceStrengthScore !== null &&
      environmentScore != null &&
      motionScore !== null &&
      heartRateScore !== null &&
      hrvScore !== null &&
      emotionScore !== null
    ) {
      // //console.log("frequency:", frequencyScore);
      // //console.log("voiceClarity:", voiceClarityScore);
      // //console.log("voiceStrengthScore:", voiceStrengthScore);
      // //console.log("environmentScore:", environmentScore);
      // //console.log("motionScore:", motionScore);
      // //console.log("heartRateScore:", heartRateScore);
      // //console.log("hrvScore:", hrvScore);
      // //console.log("emotionScore:", emotionScore);
      const overallVibrationScore = Math.min(
        Math.max(
          voiceFrequencyScore.score * 0.1 +
            voiceClarityScore.score * 0.1 +
            voiceStrengthScore.score * 0.1 +
            environmentScore * 0.15 +
            motionScore * 0.05 +
            heartRateScore * 0.2 +
            hrvScore * 0.1 +
            emotionScore.score * 0.2
        ),
        100
      );
      //console.log("final overall score:", overallVibrationScore);
      setOverallVibeScore(overallVibrationScore);
    }
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
      []
    )[0];
    if (chakraScores[strongestChakra] >= 8)
      aura = chakraColors[strongestChakra];
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
      updateChakraScores();
    setAuraColor(getAuraColor());
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

  const updateChakraScores = () => {
    setChakraScores({
      root: Math.round(motionScore),
      sacral: Math.round(emotionScore?.score),
      solarPlexus: Math.round((hrvScore + voiceStrengthScore?.score) / 2),
      heart: Math.round((heartRateScore + environmentScore) / 2), // optional blend
      throat: Math.round(voiceClarityScore?.score),
      thirdEye: Math.round(voiceFrequencyScore?.score), // reflects intuitive vocal tone
      crown: Math.round(overallVibrationScore),
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
        resetAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);
