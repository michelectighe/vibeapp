import { useState } from "react";
import RNFS from "react-native-fs";
import { toByteArray } from "base64-js";
import { fft } from "fft-js";
import { useAnalysis } from "@context";

export const useVoiceRecording = () => {
  const { setVoiceFrequency, setVoiceStrength, setVoiceClarity } =
    useAnalysis();

  const [voiceStrengthData, setVoiceStrengthData] = useState([]);
  const [voiceClarityData, setVoiceClarityData] = useState([]);

  const analyzeVoiceFromAudioUri = async (audioUri) => {
    try {
      //console.log("analyzing audio:", audioUri);
      await analyzeFrequency(audioUri);
    } catch (err) {
      console.error("Voice analysis from audio failed:", err);
    }
  };

  const analyzeFrequency = async (uri) => {
    try {
      const audioData = await RNFS.readFile(uri, "base64");

      let audioByteArray = toByteArray(audioData);
      //console.log("📄 Decoded base64 length:", audioByteArray.length);
      if (audioByteArray.length < 10000) {
        const repeatFactor = Math.ceil(10000 / audioByteArray.length);
        const repeatedAudioByteArray = new Uint8Array(
          audioByteArray.length * repeatFactor
        );
        for (let i = 0; i < repeatFactor; i++) {
          repeatedAudioByteArray.set(audioByteArray, i * audioByteArray.length);
        }
        audioByteArray = repeatedAudioByteArray;
      }

      const audioFloatArray = new Float32Array(audioByteArray.length);
      for (let i = 0; i < audioByteArray.length; i++) {
        audioFloatArray[i] = (audioByteArray[i] - 128) / 128.0;
      }

      const fftSize = 1024;
      const stepSize = 512;
      const sampleRate = 44100;

      const loudnessArray = [];
      const clarityArray = [];
      const frequencyArray = [];

      for (
        let offset = 0;
        offset + fftSize < audioFloatArray.length;
        offset += stepSize
      ) {
        const fftInput = audioFloatArray.slice(offset, offset + fftSize);

        const rms = Math.sqrt(
          fftInput.reduce((sum, v) => sum + v * v, 0) / fftInput.length
        );
        const loudness = 20 * Math.log10(rms * 0.4 + 1e-10);
        loudnessArray.push(loudness);

        for (let i = 0; i < fftSize; i++) {
          fftInput[i] *=
            0.54 - 0.46 * Math.cos((2 * Math.PI * i) / (fftSize - 1));
        }

        const fftResult = fft(fftInput);
        const magnitudes = fftResult.map((bin) =>
          Math.sqrt(bin[0] ** 2 + bin[1] ** 2)
        );

        const lowerBound = 85;
        const upperBound = 255;
        let weightedSum = 0;
        let totalMag = 0;

        for (let i = 1; i < magnitudes.length / 2; i++) {
          const freq = (i * sampleRate) / fftSize;
          if (freq >= lowerBound && freq <= upperBound) {
            const mag = magnitudes[i];
            weightedSum += freq * mag;
            totalMag += mag;
          }
        }

        const avgFreq = totalMag > 0 ? weightedSum / totalMag : 0;
        frequencyArray.push(avgFreq);

        const meanFreq = avgFreq;
        let weightedVariance = 0;
        let totalMagnitude = 0;

        for (let i = 1; i < 100; i++) {
          const freq = (i * sampleRate) / fftSize;
          const mag = magnitudes[i];
          const diff = freq - meanFreq;

          weightedVariance += diff * diff * mag;
          totalMagnitude += mag;
        }

        const variance =
          totalMagnitude > 0 ? weightedVariance / totalMagnitude : 0;

        const clarity = Math.log10(variance + 1) * 10;
        clarityArray.push(clarity);
      }

      const avgLoudness =
        loudnessArray.reduce((a, b) => a + b, 0) / loudnessArray.length;
      const avgClarity =
        clarityArray.reduce((a, b) => a + b, 0) / clarityArray.length;
      const avgFrequency =
        frequencyArray.reduce((a, b) => a + b, 0) / frequencyArray.length;
      // //console.log("averageLoudness:", avgLoudness.toFixed(2));
      // //console.log("averageVoiceClarity:", avgClarity.toFixed(2));
      // //console.log("averageFrequency:", avgFrequency.toFixed());
      setVoiceStrength(avgLoudness.toFixed(2));
      setVoiceClarity(avgClarity.toFixed(2));
      setVoiceFrequency(avgFrequency.toFixed(2));
    } catch (error) {
      console.error("Error in analyzeFrequency:", error);
    }
  };

  return {
    analyzeVoiceFromAudioUri,
    voiceStrengthData,
    voiceClarityData,
  };
};
