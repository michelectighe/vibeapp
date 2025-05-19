// MergedMeditationEnvironmentContext.js
import React, { createContext, useState, useEffect, useCallback, useContext, useRef } from "react";
import { Magnetometer } from "expo-sensors";
import AudioRecord from 'react-native-audio-record';
import { Buffer } from 'buffer';
import { useFocusEffect } from "@react-navigation/native";
import { analyzePeacefulness, evaluateEnvironment } from "@/utils";
import { useModels } from "@context";

const EnvironmentContext = createContext();

export const EnvironmentProvider = ({ children }) => {
  const { soundModel, sounds } = useModels();

  const [environment, setEnvironment] = useState();
  const [vibeAnalysis, setVibeAnalysis] = useState({
    rankedCategories: [],
    percentGood: null,
    percentBad: null,
  });

  const [magnetometerValues, setMagnetometerValues] = useState([]);
  const [soundValues, setSoundValues] = useState([]);
  const [averageSound, setAverageSound] = useState(0);
  const [averageMagnitude, setAverageMagnitude] = useState(0);

  const latestSound = useRef(0);
  const latestMagnitude = useRef(0);
  const audioBuffer = useRef([]);

  const envSubRef = useRef();
  const intervalRef = useRef();

  const MAX_VALUES = 100;

  useFocusEffect(
    useCallback(() => {
      startTracking();
      return stopTracking;
    }, [])
  );

  useEffect(() => {
    if (!soundValues || !magnetometerValues || !vibeAnalysis) return;
    const soundDb = 100 + latestSound.current;
    const score = evaluateEnvironment({ soundLevelDb: soundDb, magnetometerValue: latestMagnitude.current, percentGood: vibeAnalysis.percentGood });
    setEnvironment(score);

    if (soundValues.length > 0) setAverageSound(avg(soundValues));
    if (magnetometerValues.length > 0) setAverageMagnitude(avg(magnetometerValues));
  }, [soundValues, magnetometerValues, vibeAnalysis]);

  const avg = (arr) => arr.reduce((acc, val) => acc + val, 0) / arr.length;

  const startTracking = async () => {
    setMagnetometerValues([]);
    setSoundValues([]);

    envSubRef.current = Magnetometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
      latestMagnitude.current = magnitude;
      setMagnetometerValues(prev => (prev.length >= MAX_VALUES ? [...prev.slice(1), magnitude] : [...prev, magnitude]));
    });
    Magnetometer.setUpdateInterval(1000);

    AudioRecord.init({
      sampleRate: 15600,
      channels: 1,
      bitsPerSample: 16,
      audioSource: 6,
      wavFile: 'realtime.wav',
    });

    AudioRecord.on('data', (data) => {
      const chunk = Buffer.from(data, 'base64');
      for (let i = 0; i < chunk.length; i += 2) {
        const sample = chunk.readInt16LE(i);
        const value = sample / 32768;
        audioBuffer.current.push(value);
      }
    });

    AudioRecord.start();

    intervalRef.current = setInterval(async () => {
      if (!soundModel || audioBuffer.current.length < 15600) return;

      const slice = audioBuffer.current.slice(-15600);
      const padded = new Float32Array(15600);
      padded.set(slice);

      const result = await analyzePeacefulness(padded, soundModel, sounds);
      setVibeAnalysis(result);

    }, 1000);
  };

  const stopTracking = () => {
    envSubRef.current?.remove();
    AudioRecord.stop();
    clearInterval(intervalRef.current);
  };

  return (
    <MergedContext.Provider
      value={{
        environment,
        averageSound,
        averageMagnitude,
        vibeAnalysis,
        background,
        startTracking,
        stopTracking,
      }}
    >
      {children}
    </MergedContext.Provider>
  );
};

export const useMergedEnvironment = () => useContext(MergedContext);
