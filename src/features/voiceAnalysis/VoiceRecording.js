import { toByteArray } from "base64-js";
import { YIN } from "pitchfinder";
import { useAnalysis } from "@context";

// Helper: decode all base64 chunks to Float32 PCM
function base64ChunksToFloat32Array(base64Chunks) {
  // 1. Decode each base64 chunk into a Uint8Array
  const pcmChunks = base64Chunks.map((chunk) => toByteArray(chunk));
  // 2. Concatenate all chunks
  const totalLength = pcmChunks.reduce((sum, arr) => sum + arr.length, 0);
  const pcmBytes = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of pcmChunks) {
    pcmBytes.set(chunk, offset);
    offset += chunk.length;
  }
  // 3. Convert to Float32 PCM
  const floatArray = new Float32Array(pcmBytes.length / 2);
  for (let i = 0; i < pcmBytes.length; i += 2) {
    const sample = pcmBytes[i] | (pcmBytes[i + 1] << 8);
    const signed = sample > 32767 ? sample - 65536 : sample;
    floatArray[i / 2] = signed / 32768;
  }
  return floatArray;
}

export const useVoiceRecording = () => {
  const { setVoiceFrequency, setVoiceStrength } = useAnalysis();

  const analyzeVoiceFromAudioUri = async (base64Chunks = []) => {
    try {
      if (!base64Chunks.length) throw new Error("No audio data provided.");

      // --- Step 1: Decode all base64 PCM chunks to float array
      const audioFloatArray = base64ChunksToFloat32Array(base64Chunks);
      console.log("audioFloatArray.length:", audioFloatArray.length);
      console.log(audioFloatArray.slice(0, 10));

      // --- Step 2: Chunk audio and analyze
      const sampleRate = 16000; // your recording sample rate
      const chunkSize = 1024; // about 64ms at 16kHz
      const stepSize = 512; // 50% overlap
      const detectPitch = YIN({ sampleRate });

      const loudnessArray = [];
      const frequencyArray = [];

      for (let offset = 0; offset + chunkSize <= audioFloatArray.length; offset += stepSize) {
        const chunk = audioFloatArray.slice(offset, offset + chunkSize);

        // 1. Calculate RMS (strength/loudness)
        const rms = Math.sqrt(chunk.reduce((sum, v) => sum + v * v, 0) / chunk.length);
        if (rms < 0.01) continue; // skip silence

        const loudness = 20 * Math.log10(rms + 1e-10);
        loudnessArray.push(loudness);

        // 2. Detect pitch
        const freq = detectPitch(chunk);
        if (freq && freq > 60 && freq < 400) {
          frequencyArray.push(freq);
          console.log("Valid pitch:", freq);
        }
        // const freq = detectPitch(chunk);
        // if (freq) frequencyArray.push(freq);
      }

      // --- Step 3: Average and set
      const avgLoudness = loudnessArray.length
        ? loudnessArray.reduce((a, b) => a + b, 0) / loudnessArray.length
        : 0;
      const avgFrequency = frequencyArray.length
        ? frequencyArray.reduce((a, b) => a + b, 0) / frequencyArray.length
        : 0;

      setVoiceStrength(avgLoudness ? avgLoudness.toFixed(2) : "skipped");
      setVoiceFrequency(avgFrequency ? avgFrequency.toFixed(2) : "skipped");
      console.log("STRENGTH:", avgLoudness);
      console.log("FREQUENCY:", avgFrequency);
    } catch (err) {
      console.error("Voice analysis from audio failed:", err);
      setVoiceFrequency("skipped");
      setVoiceStrength("skipped");
    }
  };

  return {
    analyzeVoiceFromAudioUri,
  };
};
