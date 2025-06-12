import { useEffect, useRef } from "react";
import TFLite from "react-native-fast-tflite";
import { Platform } from "react-native";

export const useYamnetModel = () => {
  const interpreterRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const modelPath =
        Platform.OS === "ios"
          ? "lite-model_yamnet_tflite_1" // without .tflite extension for iOS
          : "lite-model_yamnet_tflite_1.tflite";

      const interpreter = await TFLite.loadTFLiteModel(modelPath, {
        numThreads: 2,
      });

      interpreterRef.current = interpreter;
    };

    init();
  }, []);

  const classify = async (float32AudioArray) => {
    if (!interpreterRef.current) return null;

    const output = await interpreterRef.current.runOnce(float32AudioArray, [
      {
        dtype: "float32",
        shape: [1, 15600], // YAMNet expects this shape
      },
    ]);

    return output;
  };

  return {
    classify,
  };
};
