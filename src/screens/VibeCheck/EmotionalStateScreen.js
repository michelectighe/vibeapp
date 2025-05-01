import React, {
  useEffect,
  useCallback,
  useMemo,
  useState,
  useRef,
  useContext,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
  face,
} from "react-native-vision-camera";
import { initMedia, createRefChecker, cleanupMedia } from "@utils";
import { useResizePlugin } from "vision-camera-resize-plugin";
import { useAnalysis, useModel } from "@context";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
import { VIBE_CHECK_SCREENS } from "@navigation";
import { AudioRecorder } from "react-native-audio";
import RNFS from "react-native-fs";
import { useVoiceRecording } from "@features/voiceAnalysis/VoiceRecording";
//import { useFaceDetector } from "react-native-vision-camera-face-detector";
import {
  FuzzyGlow,
  GradientBackground,
  CustomSpiritualButton,
} from "@components";
import { Fonts, Colors } from "@constants";

const phrases = [
  "Try not to look suspicious",
  "Imagine you're on a cooking show",
  "Talk like you're negotiating a raise",
  "Pretend you're telling a dog it's adopted",
  "Say it like a villain monologue",
];

const EMOTIONS = [
  "neutral",
  "happiness",
  "surprise",
  "sadness",
  "anger",
  "disgust",
  "fear",
  "contempt",
];

export default function EmotionalStateScreen() {
  const { width, height } = useWindowDimensions();
  const route = useRoute();
  const currentIndex = VIBE_CHECK_SCREENS.indexOf(route.name);
  const navigation = useNavigation();
  const device = useCameraDevice("front");
  const isFocused = useIsFocused();
  const selectedFormat = useMemo(() => {
    try {
      if (!device?.formats?.length) return undefined;
      //console.log("device found");
      return device.formats
        .filter((f) => f.supportsVideoHdr === false)
        .sort(
          (a, b) => b.videoWidth * b.videoHeight - a.videoWidth * a.videoHeight
        )[0]; // format with highest video resolution
    } catch (error) {
      console.error("Error in selectedFormat:", error);
    }
  }, [device]);

  const frameProcessorEmotionActiveRef = useRef(false);
  const isRefActive = createRefChecker();
  const cameraEmotionRef = useRef(null);
  const uriRef = useRef(null);
  const stopTimeoutRef = useRef(null);
  const { analyzeVoiceFromAudioUri } = useVoiceRecording();
  const { resize } = useResizePlugin();
  const MODEL_INPUT = 48;
  const isGrayScale = true;
  const { model } = useModel();
  const { setEmotions, setVoiceStrength, setVoiceFrequency, setVoiceClarity } =
    useAnalysis();
  const [emotion, setEmotion] = useState("Analyzing...");
  const [isAudioRecording, setIsAudioRecording] = useState(false);
  const audioPath = `${RNFS.DocumentDirectoryPath}/test.aac`;
  const [emotionLog, setEmotionLog] = useState([]);
  const [cameraReady, setCameraReady] = useState(false);
  const emotionLogRef = useRef(emotionLog);
  const faceDetectionOptions = useRef({
    performanceMode: "fast",
    classificationMode: "all",
    contourMode: "none",
    landmarkMode: "none",
    windowWidth: width,
    windowHeight: height,
  }).current;

  //const { detectFaces } = useFaceDetector(faceDetectionOptions);
  const [currentPhrase, setCurrentPhrase] = useState(
    "Talk like you're negotiating a raise"
  );
  // Initialize camera & Sound
  useFocusEffect(
    useCallback(() => {
      if (!device || !cameraReady) return undefined;
      global.lastTs = 0;
      const setup = async () => {
        try {
          await initMedia(
            frameProcessorEmotionActiveRef,
            {
              path: audioPath,
              settings: {
                SampleRate: 16000,
                AudioEncoding: "aac",
                AudioQuality: "Low",
              },
            },
            "audio"
          );
          setTimeout(async () => {
            await startRecording();
            //console.log("🎙️ Audio recording started after delay");
          }, 500);

          //console.log("recording started");
        } catch (e) {
          console.warn("Setup failed in EmotionalStateScreen:", e);
        }
      };

      setup();

      return () => {
        //console.log("cleanup focusEffect for initmedia");
      };
    }, [device, cameraReady])
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        global.lastTs = 99999999999;
        (async () => {
          try {
            uriRef.current = null;
            cameraEmotionRef.current = null;
            await cleanupMedia({
              useAudio: true,
              useSoundLevel: false,
              useCamera: true,
              frameProcessorEmotionActiveRef,
              isAudioRecording,
            });
            setIsAudioRecording(false);
          } catch (e) {
            console.warn("❌ Cleanup failed in EmotionalStateScreen:", e);
          }
        })();
      };
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      try {
        const parent = navigation.getParent?.();
        if (parent && parent.setOptions) {
          parent.setOptions({ tabBarStyle: { display: "none" } });
        }
      } catch (error) {
        console.error("tabBarError EmotioncreenFocus:", error);
      }
      return () => {
        //console.log("cleanup of nav");
      };
    }, [navigation])
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        try {
          const log = emotionLogRef.current;
          if (log.length > 0) {
            const emotionCounts = log.reduce((acc, emotion) => {
              acc[emotion] = (acc[emotion] || 0) + 1;
              return acc;
            }, {});
            const mostCommonEmotion = Object.keys(emotionCounts).reduce(
              (a, b) => (emotionCounts[a] > emotionCounts[b] ? a : b)
            );
            //console.log("Setting overall emotional state:", mostCommonEmotion);
            setEmotions(mostCommonEmotion);
          } else {
            setEmotions("neutral");
          }
        } catch (error) {
          console.error("Error in setEmotions useFocus:", error);
        }
      };
    }, [setEmotions])
  );
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    setCurrentPhrase(phrases[randomIndex]);
  }, []);
  useEffect(() => {
    try {
      emotionLogRef.current = emotionLog;
    } catch (error) {
      console.error("EmotionalStateScreen useEffectEmotionLog Error:", error);
    }
    return () => {};
  }, [emotionLog]);

  useEffect(() => {
    try {
      if (!model) {
        //console.log("model isn't loaded");
      }
      // if (!__DEV__) {
      //   crashlytics().log(
      //     "🧪 EmotionalStateScreen mounted — triggering test crash"
      //   );
      //   crashlytics().recordError(
      //     new Error("🔥 Test crash from EmotionalStateScreen")
      //   );
      // }
      return () => model;
    } catch (error) {
      console.error("EmotionalStateScreen UseEffect Error:", error);
    }
  });

  const manualStop = () => {
    stopRecording();
    goToNextScreen();
  };
  const goToNextScreen = () => {
    try {
      if (currentIndex < VIBE_CHECK_SCREENS.length - 1) {
        navigation.navigate(VIBE_CHECK_SCREENS[currentIndex + 1]);
      }
    } catch (error) {
      console.error("Error in gotToNexScreen:", error);
    }
  };

  const startRecording = async () => {
    try {
      await AudioRecorder.startRecording();
      setIsAudioRecording(true);

      stopTimeoutRef.current = setTimeout(() => {
        stopRecording();
      }, 10000);
    } catch (error) {
      console.error("startRecording error:", error);
    }
  };

  const stopRecording = async () => {
    try {
      if (!isAudioRecording) return; //leave if it's already stopped

      clearTimeout(stopTimeoutRef.current); // ✅ clear timeout
      stopTimeoutRef.current = null;

      await AudioRecorder.stopRecording();
      setIsAudioRecording(false);
      const stat = await RNFS.stat(audioPath);
      // setTimeout(() => {
      //   goToNextScreen(); // go to next screen before calling analyze.
      // }, 300); // Gives iOS a moment to release the AV session

      //console.log("📦 File size:", stat.size, "bytes");
      //console.log("✅ recording saved to:", audioPath);
      if (stat.size > 0) {
        await analyzeVoiceFromAudioUri(audioPath);
      } else {
        setVoiceFrequency(0);
        setVoiceStrength(0);
        setVoiceClarity(0);
      }

      uriRef.current = null;
      cameraEmotionRef.current = null;
      await RNFS.unlink(audioPath);
    } catch (error) {
      console.error("Stop Recording Error:", error);
    }
  };

  const onEmotionDetected = useCallback((maxIdx) => {
    try {
      setEmotion(EMOTIONS[maxIdx]); // For real-time display
      if (maxIdx != 0) {
        setEmotionLog((prev) => [...prev, EMOTIONS[maxIdx]]);
      } // For averaging later
    } catch (error) {
      console.error("onEmotionDetectedError:", error);
    }
  }, []);

  // Run the JS callback from the worklet
  const runOnJSEmotion = Worklets.createRunOnJS(onEmotionDetected);

  const emotionProcessor = useFrameProcessor(
    (frame) => {
      "worklet";

      if (!isRefActive(frameProcessorEmotionActiveRef.current)) return;
      if (!model) {
        //console.log("⛔️ Frame skipped - model not loaded");
        return;
      }
      try {
        // let faces;
        // try {
        //   faces = detectFaces(frame);
        //   if (!faces || faces.length === 0 || !faces[0]?.bounds) return;
        // } catch (e) {
        //   //console.log("error in detectFaces:", e);
        // }

        const now = Date.now();
        if (global.lastTs && now - global.lastTs < 200) return;
        global.lastTs = now;
        if (!model) return;

        // let cropWidth = faces[0].bounds.width;
        // let cropHeight = faces[0].bounds.height;
        // let cropX = faces[0].bounds.x;
        // let cropY = faces[0].bounds.y;
        let cropWidth = MODEL_INPUT;
        let cropHeight = MODEL_INPUT;
        let cropX = (frame.width/2) - (MODEL_INPUT/2);
        let cropY = (frame.height/2) + (MODEL_INPUT/2);

        // Ensure crop values are within frame bounds
        if (cropX > frame.width || cropY > frame.height) {
          cropWidth = frame.width * 0.1;
          cropHeight = frame.height * 0.2;
          cropX = (frame.width - cropWidth) / 2;
          cropY = (frame.height - cropHeight) / 2;
        }

        let patch;
        try {
          patch = resize(frame, {
            crop: { x: cropX, y: cropY, width: cropWidth, height: cropHeight },
            scale: { width: MODEL_INPUT, height: MODEL_INPUT },
            pixelFormat: "rgb",
            dataType: "float32",
          });
        } catch (e) {
          //console.log("error in resize:", e);
        }

        const floatArray =
          patch instanceof Float32Array
            ? patch
            : new Float32Array(Object.values(patch));
        let grayscale = floatArray;

        try {
          if (isGrayScale) {
            grayscale = new Float32Array(MODEL_INPUT * MODEL_INPUT);
            for (let i = 0; i < MODEL_INPUT * MODEL_INPUT; i++) {
              const r = floatArray[i * 3];
              const g = floatArray[i * 3 + 1];
              const b = floatArray[i * 3 + 2];
              grayscale[i] = 0.299 * r + 0.587 * g + 0.114 * b;
            }
          }
        } catch (e) {
          //console.log("error in grayscale:", e);
        }

        if (!model || !grayscale) {
          //console.log("model is unavailable:", model);
          return;
        }
        let output;
        try {
          output = model.runSync([grayscale])[0];
          if (!output || output.length === 0) return;
        } catch (e) {
          //console.log("❌ Model runSync error:", e);
          return;
        }

        let maxIdx = 0,
          maxVal = output[0];
        for (let i = 1; i < output.length; i++) {
          if (output[i] > maxVal) {
            maxVal = output[i];
            maxIdx = i;
          }
        }
        if (!output || output.length === 0 || output.some(isNaN)) return;

        runOnJSEmotion(maxIdx);
      } catch (e) {
        //console.log("Error in emotionProcessor", e);
      }
    },
    [model]
  );

  return (
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {device ? (
            selectedFormat ? (
              // Render camera preview
              <View
                style={[
                  styles.cameraWrapper,
                  { backgroundColor: "transparent", width: "100%" },
                ]}
              >
                {/* Glow behind the circular view */}
                <FuzzyGlow
                  glowSize={400}
                  glowColor="white"
                  pulse={false}
                  style={styles.fuzzyGlow}
                />
                <View style={styles.cameraContainer}>
                  {/* Camera view */}
                  <View style={styles.cameraView}>
                    {device && selectedFormat && isFocused && (
                      <Camera
                        key={isFocused ? "active" : "inactive"}
                        ref={cameraEmotionRef}
                        style={styles.cameraStyle}
                        device={isFocused && device}
                        isActive={isFocused /*&& model != null*/}
                        onInitialized={() => {
                          setCameraReady(true);
                        }}
                        format={selectedFormat}
                        audio={false}
                        frameProcessor={model && emotionProcessor}
                        frameProcessorFps={1}
                        fps={15}
                        pixelFormat="yuv"
                      />
                    )}
                  </View>
                </View>
              </View>
            ) : (
              <Text>No supported camera format found</Text>
            )
          ) : (
            <Text>Camera not ready</Text>
          )}

          <View style={styles.textContainer}>
            {/* <Text style={styles.prompt}>Let your voice flow</Text> */}
            {/* <Text style={styles.statusText}>
              Facial Emotion: {emotion || "Analyzing..."}
            </Text> */}
            <Text style={styles.promptText}>Say this phrase:</Text>
            <View style={styles.phraseBox}>
              <Text style={styles.phraseText}>{currentPhrase}</Text>
            </View>
          </View>

          <View style={styles.continueContainer}>
            <CustomSpiritualButton
              label={isAudioRecording ? "Continue" : "Start Recording"}
              onPress={isAudioRecording ? manualStop : startRecording}
              color={Colors.vcButtonColor}
              textColor={Colors.vcButtonTextColor}
            />
          </View>
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -50,
    width: "100%",
    height: "100%",
    alignItems: "center",
//    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  innerContainer: {
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  cameraWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  cameraContainer: {
    width: "60%",
    aspectRatio: 3 / 4,
    borderRadius: 30, // soft corners instead of a full circle
    overflow: "hidden",
    backgroundColor: "transparent", //"rgba(255, 255, 255, 0.1)", // soft glass tint
    elevation: 10,
    marginTop: 40,
    backdropFilter: Platform.OS === "web" ? "blur(10px)" : undefined,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraView: {
    position: "absolute",
    overflow: "hidden",
    width: "90%",
    height: "90%",
    zIndex: 1,
    borderRadius: 30,
  },
  cameraStyle: {
    width: "100%",
    height: "100%",
    zIndex: 10,
  },
  fuzzyGlow: {
    position: "absolute",
    // top: -50,
    //left: "15%",
    width: "100%",
    height: "100%",
    //zIndex: 0,
    opacity: 1,
  },
  textContainer: {
    alignItems: "center",
    width: "100%",
    paddingBottom: 20,
  },
  statusText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 18,
    width: "100%",
  },
  instructions: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 18,
    padding: 10,
    width: "85%",
    color: "#fff", // Adjust according to themeColors if needed
  },
  promptText: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 20,
    color: Colors.vcButtonTextColor,
    fontFamily: Fonts.Script,
    letterSpacing: 1,
  },

  phraseBox: {
    backgroundColor: Colors.vcButtonColor,
    width: "90%",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginVertical: 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },

  phraseText: {
    fontSize: 28,
    fontStyle: "italic",
    textAlign: "center",
    color: Colors.vcButtonTextColor,
    fontFamily: "TypeWriterText",
  },

  continueContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 30,
    alignItems: "center",
  },

  recordButton: {
    color: "black",
    padding: 12,
    borderRadius: 8,
    textAlign: "center",
  },
});
