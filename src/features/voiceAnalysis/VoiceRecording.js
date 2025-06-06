import { toByteArray } from "base64-js";
import { fft } from "fft-js";
import { useAnalysis } from "@context";
import { useModels } from "@/context";
import { Buffer } from "buffer";

// Helper: decode base64 audio to Float32Array PCM
const decodeToFloat32 = (base64Chunks, requiredLength = 15600) => {
  const fullBase64 = base64Chunks.join("");
  const buffer = Buffer.from(fullBase64, "base64");
  const sampleCount = Math.floor(buffer.length / 2);
  const floatArray = new Float32Array(requiredLength);
  for (let i = 0; i < Math.min(sampleCount, requiredLength); i++) {
    const sample = buffer.readInt16LE(i * 2);
    floatArray[i] = sample / 32768;
  }
  return floatArray;
};

export const useVoiceRecording = () => {
  const { soundModel, sounds } = useModels();
  const { setVoiceFrequency, setVoiceStrength, setVoiceEmotion } = useAnalysis();

  const analyzeVoiceFromAudioUri = async (base64Chunks = []) => {
    try {
      if (!base64Chunks.length) throw new Error("No audio data provided.");
      await analyzeFrequency(base64Chunks);
    } catch (err) {
      console.error("Voice analysis from audio failed:", err);
    }
  };

  const analyzeFrequency = async (base64Chunks) => {
    try {
      // Decode all chunks to PCM
      const audioFloatArray = decodeToFloat32(base64Chunks, base64Chunks.length * 7800); // tune requiredLength if needed

      const sampleRate = 15600; // Match your model's required rate
      const chunkSize = sampleRate; // 1 second per chunk
      const stepSize = chunkSize; // non-overlapping

      const voiceLoudness = [];
      const voiceFrequencies = [];
      let foundVoice = false;

      for (let offset = 0; offset + chunkSize <= audioFloatArray.length; offset += stepSize) {
        const chunk = audioFloatArray.slice(offset, offset + chunkSize);

        // Run your model on this chunk
        const modelOutput = await soundModel.run([chunk]);
        const outputArray = Array.from(modelOutput[0]);

const allScores = outputArray.map((score, i) => ({
  label: sounds[i]?.display_name,
  type: sounds[i]?.type,
  score,
  classification: sounds[i]?.category,
}));
console.log(
  "All scores for this chunk:",
  allScores.filter((x) => x.score > 0),
);


const voiceLabelsAndScores = outputArray
  .map((score, i) => ({
    classification: sounds[i]?.classification, // sadness, talking, etc.
    label: sounds[i]?.display_name,
    score,
    type: sounds[i]?.type,
  }))
  .filter((item) => item.type === "voice" && item.score > 0.01);

//console.log('from model:', voiceLabelsAndScores)

        // Detect "voice" using your sounds file
        let isVoice = false;
        for (let i = 0; i < outputArray.length; i++) {
          if (
            sounds[i]?.type === "voice" &&
            outputArray[i] > 0.0 // set your detection threshold here
          ) {
        //    console.log("score:", sounds[i].label, outputArray[i]);
            isVoice = true;
            foundVoice = true;
            break;
          }
        }

        if (!isVoice) continue; // skip this chunk if not voice

        // Now do loudness/frequency *only* for this voice chunk:
        // Loudness (RMS in dB)
        const rms = Math.sqrt(chunk.reduce((sum, v) => sum + v * v, 0) / chunk.length);
        const loudness = 20 * Math.log10(rms + 1e-10);
        voiceLoudness.push(loudness);

        // Frequency (use FFT)
        const fftSize = 1024;
        for (let windowOffset = 0; windowOffset + fftSize < chunk.length; windowOffset += 512) {
          const fftInput = chunk.slice(windowOffset, windowOffset + fftSize);
          // Apply Hann window
          for (let i = 0; i < fftSize; i++) {
            fftInput[i] *= 0.54 - 0.46 * Math.cos((2 * Math.PI * i) / (fftSize - 1));
          }
          const fftResult = fft(fftInput);
          const magnitudes = fftResult.map((bin) => Math.sqrt(bin[0] ** 2 + bin[1] ** 2));
          const lowerBound = 85,
            upperBound = 255;
          let weightedSum = 0,
            totalMag = 0;
          for (let i = 1; i < magnitudes.length / 2; i++) {
            const freq = (i * sampleRate) / fftSize;
            if (freq >= lowerBound && freq <= upperBound) {
              const mag = magnitudes[i];
              weightedSum += freq * mag;
              totalMag += mag;
            }
          }
          const avgFreq = totalMag > 0 ? weightedSum / totalMag : 0;
          voiceFrequencies.push(avgFreq);
        }
      }

      // Only report if voice was detected
      const avgVoiceLoudness = voiceLoudness.length
        ? voiceLoudness.reduce((a, b) => a + b, 0) / voiceLoudness.length
        : null;
      const avgVoiceFrequency = voiceFrequencies.length
        ? voiceFrequencies.reduce((a, b) => a + b, 0) / voiceFrequencies.length
        : null;

      const voiceStrengthToSet = avgVoiceLoudness !== null ? avgVoiceLoudness.toFixed(2) : null;
      const voiceFrequencyToSet = avgVoiceFrequency !== null ? avgVoiceFrequency.toFixed(2) : null;
      console.log("VOICESTRENGTH TO SET", voiceStrengthToSet);
      console.log("VOICE FREQUENCY TO SET", voiceFrequencyToSet);
      setVoiceStrength(voiceStrengthToSet);
      setVoiceFrequency(voiceFrequencyToSet);

      // Still want overall emotion analysis? You can run your emotion function on all chunks or just the ones with voice
      // (up to you!)
      //   const emotionResult = await analyzeVoiceEmotion(base64Chunks, soundModel, sounds);
      //   setVoiceEmotion(emotionResult);
    } catch (error) {
      console.error("Error in analyzeFrequency:", error);
    }
  };

  return {
    analyzeVoiceFromAudioUri,
  };
};
