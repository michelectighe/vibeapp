import { Buffer } from "buffer";

export const decodeToFloat32 = (base64Chunks, requiredLength = 15600) => {
  const fullBase64 = base64Chunks.join("");
  const buffer = Buffer.from(fullBase64, "base64");
  const sampleCount = Math.floor(buffer.length / 2);
  const floatArray = new Float32Array(requiredLength);
  for (let i = 0; i < Math.min(sampleCount, requiredLength); i++) {
    const sample = buffer.readInt16LE(i * 2);
    floatArray[i] = sample / 32768;
  }
  // Pad with zeros if not enough samples
  return floatArray;
};

// export const analyzeVoiceEmotion = async (base64Chunks, model, sounds) => {
//   try {

//     const floatArray = decodeToFloat32(base64Chunks);
//     const output = await model.run([floatArray]);
//    // console.log("OUTPUT:", output);
//     const outputArray = Array.from(output[0]);

//     // Include label, classification, type, and score for each class
//     const contributions = outputArray
//       .map((score, i) => ({
//         label: sounds[i]?.label, // or sounds[i]?.label, if that's your field
//         category: sounds[i]?.category,
//         type: sounds[i]?.type,
//         score,
//       }))
//       .filter((item) => item.type === "voice");
//     const voiceEmotionScore = contributions.reduce((sum, item) => sum + item.score, 0);
//      const   contributingLabel= contributions
//         .filter((item) => item.score > 0)
//          .sort((a, b) => b.score - a.score) // Sort by highest score first
//         .slice(0, 1) // Top 7
//         .map((item) => ({
//           category: item.category,
//         }));
//         return(voiceEmotionScore, "skipped");
//   } catch (err) {
//     console.error("Voice clarity classification failed:", err);
//     return { clarityScore: 0};
//   }
// };
