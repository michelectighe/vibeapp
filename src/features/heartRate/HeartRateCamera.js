import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { Camera, useCameraDevice, useFrameProcessor } from "react-native-vision-camera";
import { Worklets } from "react-native-worklets-core";
import { useFocusEffect } from "@react-navigation/native";
import { useAnalysis } from "@context";
import {
  removeOutliers,
  smoothData,
  detectHeartbeats,
  calculateHRVAndBPM,
  initMedia,
  cleanupMedia,
  createRefChecker,
} from "@utils";
import { Colors, Fonts } from "@constants";
import { scaledStyle, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { CustomSpiritualButton, CircularTimer } from "@/components";
import { useVibeCheckNavigation } from "@/hooks";

export const HeartRateCamera = ({ onStableReading }) => {
  const { goToNextScreen } = useVibeCheckNavigation();

  const [localHeartRate, setLocalHeartRate] = useState({
    bpm: null,
    sdnn: null,
    rmssd: null,
  });
  const [stable, setStable] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);
  const [flashMode, setFlashMode] = useState("on");
  const [fingerWarning, setFingerWarning] = useState(null);
  const lastWarningRef = useRef(null);

  const cameraHeartRef = useRef(null);
  const redDataRef = useRef([]);
  const intensityRef = useRef([]);
  const bpmHistoryRef = useRef([]);
  const sdnnHistoryRef = useRef([]);
  const rmssdHistoryRef = useRef([]);
  const metricsHistoryRef = useRef([]);
  const lastUpdateTimeRef = useRef(Date.now());
  const placeholderOpacity = useRef(new Animated.Value(1)).current;
  const cameraOpacity = useRef(new Animated.Value(0)).current;
  const warningOpacity = useRef(new Animated.Value(0)).current;
  const newWarningRef = useRef("");
  const frameProcessorHeartActiveRef = useRef(false);
  const isRefActive = createRefChecker();

  const { setHeartRate } = useAnalysis();
  const device = useCameraDevice("back");

  useFocusEffect(
    useCallback(() => {
      if (!device || !cameraReady) return;
      global.lastTs = 0;
      cameraOpacity.setValue(0); // reset to invisible
      const setup = async () => {
        await initMedia(frameProcessorHeartActiveRef);
        setCameraActive(true);
        setStable(false);
        setFlashMode("on");
        redDataRef.current = [];
        intensityRef.current = [];
        bpmHistoryRef.current = [];
        sdnnHistoryRef.current = [];
        rmssdHistoryRef.current = [];
        metricsHistoryRef.current = [];
      };
      setup();
      return () => {
        ///     //console.log("leaving heartratecamer");
      };
    }, [device, cameraReady]), // eslint-disable-line react-hooks/exhaustive-deps
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        //     //console.log("start of usefocus return");
        global.lastTs = 99999999999;
        (async () => {
          await cleanupMedia({
            useAudio: false,
            useSoundLevel: false,
            useCamera: true,
            frameProcessorHeartActiveRef,
            isAudioRecording: false,
          });
          setCameraReady(false);
          setCameraActive(false);
          setFlashMode("off");
          //    const averageMetrics = computeAverageMetrics();
          //   //console.log("averageMetric:", averageMetrics);
          //   if (averageMetrics) setHeartRate(averageMetrics);
        })();
      };
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    Animated.timing(new Animated.Value(0), {
      toValue: 0,
      duration: 10,
      useNativeDriver: true,
    }).start();
    return () => {
      //     //console.log("end of useEffect");
    };
  }, []);

  useEffect(() => {
    //  if (fingerWarning != null) {
    warningOpacity.setValue(0);
    return () => {
      //    //console.log("warningOpacity useEffect return");
    };
    // }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const computeAverageMetrics = () => {
    //   //console.log("in computeAverageMetrics");
    const history = metricsHistoryRef.current;
    if (history.length === 0) return null;
    const sum = history.reduce(
      (acc, metric) => {
        acc.bpm += metric.bpm;
        acc.sdnn += metric.sdnn;
        acc.rmssd += metric.rmssd;
        return acc;
      },
      { bpm: 0, sdnn: 0, rmssd: 0 },
    );
    //   //console.log("end of compute metrics:", Math.round(sum.bpm / history.length));
    return {
      bpm: Math.round(sum.bpm / history.length),
      sdnn: (sum.sdnn / history.length).toFixed(0),
      rmssd: (sum.rmssd / history.length).toFixed(0),
    };
  };

  const handleFrame = (redIntensity, timestamp) => {
    redDataRef.current.push({ intensity: redIntensity, timestamp });
    const now = timestamp;
    redDataRef.current = redDataRef.current.filter((d) => now - d.timestamp <= 6000);
    intensityRef.current = redDataRef.current.filter((d) => now - d.timestamp <= 2000);

    const intensities = intensityRef.current.map((d) => d.intensity);
    const filteredIntensities = removeOutliers(intensities, 2);
    if (filteredIntensities.length === 0) return;

    const variation = Math.max(...filteredIntensities) - Math.min(...filteredIntensities);

    if (variation > 20) {
      newWarningRef.current = "Please ensure your finger is covering the camera lens correctly";
    } else {
      newWarningRef.current = "Hold still while we check your vibe";
    }

    // Only update if it actually changed
    if (newWarningRef.current && lastWarningRef.current !== newWarningRef.current) {
      //  //console.log("changed");
      lastWarningRef.current = newWarningRef.current;
      setFingerWarning(newWarningRef.current);
      Animated.timing(warningOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    const smoothed = smoothData(redDataRef.current, 5);
    const heartbeats = detectHeartbeats(smoothed);
    const metrics = calculateHRVAndBPM(heartbeats);

    bpmHistoryRef.current.push(metrics.bpm);
    sdnnHistoryRef.current.push(metrics.sdnn);
    rmssdHistoryRef.current.push(metrics.rmssd);
    metricsHistoryRef.current.push(metrics);
    if (metricsHistoryRef.current.length > 100) {
      bpmHistoryRef.current.shift();
      sdnnHistoryRef.current.shift();
      rmssdHistoryRef.current.shift();
      metricsHistoryRef.current.shift();
    }

    const filteredBPM = removeOutliers(bpmHistoryRef.current, 2);
    const filteredSdnn = removeOutliers(sdnnHistoryRef.current, 2);
    const filteredRmssd = removeOutliers(rmssdHistoryRef.current, 2);

    Math.max(...filteredRmssd.slice(-30)) - Math.min(...filteredRmssd.slice(-30));

    const nowTime = Date.now();
    if (nowTime - lastUpdateTimeRef.current >= 1000) {
      setLocalHeartRate({
        bpm: Math.round(filteredBPM.slice(-30).reduce((a, b) => a + b, 0) / 30),
        sdnn: Math.round(filteredSdnn.slice(-30).reduce((a, b) => a + b, 0) / 30),
        rmssd: Math.round(filteredRmssd.slice(-30).reduce((a, b) => a + b, 0) / 30),
      });
      lastUpdateTimeRef.current = nowTime;
    }
  };
  const handleFrameJS = Worklets.createRunOnJS(handleFrame);

  const heartRateProcessor = useFrameProcessor((frame) => {
    "worklet";
    if (!isRefActive(frameProcessorHeartActiveRef.current)) return;
    try {
      const buffer = frame.toArrayBuffer();
      const data = new Uint8Array(buffer);
      let totalRed = 0;
      for (let i = 0; i < data.length; i += 4) totalRed += data[i];
      const redIntensity = totalRed / (data.length / 4);
      if (redIntensity !== undefined) handleFrameJS(redIntensity, frame.timestamp);
    } catch (err) {
      console.error("❌ HeartRate frame error:", err);
    }
  }, []);

  const handleTimerExpired = () => {
    //console.log("Timer expired — forcing stable.");
    if (!stable) {
      const metrics = computeAverageMetrics() ?? {};
      //    //console.log("metrics:", metrics);
      setStable(true);
      setHeartRate(metrics);
      onStableReading(metrics); // pass something if you have it
      setFingerWarning("");
      Animated.timing(warningOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(cameraOpacity, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      {/* Circular Camera View */}
      // Updated top part of HeartRateScreen (visual polish)
      <Animated.View style={[styles.cameraWrapper, { opacity: cameraOpacity }]}>
        {device && !stable && (
          <View style={styles.cameraRing}>
            <View style={styles.cameraCircle}>
              <Camera
                ref={cameraHeartRef}
                style={styles.camera}
                device={device}
                isActive={cameraActive}
                video={true}
                audio={false}
                frameProcessor={heartRateProcessor}
                frameProcessorFps={15}
                fps={15}
                torch={flashMode}
                onInitialized={() => {
                  setCameraReady(true);
                  Animated.timing(placeholderOpacity, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                  }).start(() => {
                    Animated.timing(cameraOpacity, {
                      toValue: 1,
                      duration: 800,
                      useNativeDriver: true,
                    }).start();
                  });
                }}
              />
            </View>
            <CircularTimer
              duration={1000} //mct
              size={105}
              color={Colors.textDark}
              onComplete={handleTimerExpired}
            />
          </View>
        )}
      </Animated.View>
      {!stable && (
        <View style={styles.vitalsBlock}>
          {typeof localHeartRate.bpm === "number" && !isNaN(localHeartRate.bpm) && (
            <Text style={styles.vitalsBPM}>❤️ {localHeartRate.bpm} BPM</Text>
          )}
          {typeof localHeartRate.rmssd === "number" && !isNaN(localHeartRate.rmssd) && (
            <Text style={styles.vitalsRMSSD}>RMSSD: {localHeartRate.rmssd.toFixed(0)} ms</Text>
          )}
        </View>
      )}
      <Animated.View style={[styles.warningWrapper, { opacity: warningOpacity }]}>
        <Text style={styles.warningText}>{fingerWarning || " "}</Text>
      </Animated.View>
    </View>
  );
};

const rawStyles = {
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: "transparent",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },

  cameraWrapper: {
    marginTop: 50, // space from top of screen
    alignSelf: "center",
    width: "35%",
    height: "35%",
    borderRadius: 60,
    overflow: "visible", // allow shadow ring to extend
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },

  camera: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  vitalsBlock: {
    marginTop: 16,
    alignItems: "center",
  },

  warningWrapper: {
    height: "25%",
    marginTop: 16, // or increase bottom spacing
    alignItems: "center",
  },
  vitalsBPM: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textDark,
  },
  vitalsRMSSD: {
    fontSize: 14,
    color: Colors.textDark,
    marginTop: 4,
  },

  warningText: {
    fontSize: 15,
    color: Colors.textDark,
    textAlign: "center",
    opacity: 0.85,
    paddingHorizontal: 20,
    minHeight: 28,
    marginBottom: 20,
  },
  cameraRing: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 14,
    borderColor: Colors.surface, // or use gradient background
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.textDark,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    zIndex: 10,
  },

  cameraCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));
