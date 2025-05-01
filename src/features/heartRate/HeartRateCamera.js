import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from "react-native-vision-camera";
import { Worklets } from "react-native-worklets-core";
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
  isFocusedScreenLevel,
} from "@react-navigation/native";
import { runOnJS } from "react-native-reanimated";
import { useAnalysis } from "@context";
import {
  calculateVariance,
  removeOutliers,
  smoothData,
  detectHeartbeats,
  formatTimestampWithMs,
  calculateHRVAndBPM,
  initMedia,
  cleanupMedia,
  createRefChecker,
} from "@utils";
import { useKickJS } from "@hooks";

import { Fonts, Colors } from "@constants";

// ----- Component ----- //

export default function HeartRateCamera({ onStableReading }) {
  if (__DEV__) useKickJS();

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
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();
  const { setHeartRate } = useAnalysis();
  const isFocused = useIsFocused();

  // Refs for storing measurements over time
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
  const frameProcessorHeartActiveRef = useRef(false);
  const isRefActive = createRefChecker();

  // Select the back camera
  const device = useCameraDevice("back");

  useFocusEffect(
    useCallback(() => {
      if (!device || !cameraReady) return;
      global.lastTs = 0;
      const setup = async () => {
        try {
          await initMedia(frameProcessorHeartActiveRef);
          // Reset all measurement refs on focus.
          setCameraActive(true);
          setStable(false);
          setFlashMode("on");
          redDataRef.current = [];
          intensityRef.current = [];
          bpmHistoryRef.current = [];
          sdnnHistoryRef.current = [];
          rmssdHistoryRef.current = [];
          metricsHistoryRef.current = [];
        } catch (e) {
          console.warn("Setup failed in HeartRateCamera:", e);
        }
      };
      setup();
      return () => {};
    }, [device, cameraReady])
  );

  // Request permission and reset on focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        global.lastTs = 99999999999;
        (async () => {
          try {
            cameraHeartRef.current = null;
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
            // On blur, compute the average metrics and update context.
            const averageMetrics = computeAverageMetrics();
            if (averageMetrics) {
              setHeartRate(averageMetrics);
            }
          } catch (e) {
            console.warn("❌ Cleanup failed in HeartRateCamera:", e);
          }
        })();
      };
    }, [])
  );

  useEffect(() => {
    Animated.timing(new Animated.Value(0), {
      toValue: 0,
      duration: 10,
      useNativeDriver: true,
    }).start();
  }, []);

  const computeAverageMetrics = () => {
    const history = metricsHistoryRef.current;
    if (history.length === 0) return null;
    const sum = history.reduce(
      (acc, metric) => {
        acc.bpm += metric.bpm;
        acc.sdnn += metric.sdnn;
        acc.rmssd += metric.rmssd;
        return acc;
      },
      { bpm: 0, sdnn: 0, rmssd: 0 }
    );
    return {
      bpm: Math.round(sum.bpm / history.length),
      sdnn: (sum.sdnn / history.length).toFixed(0),
      rmssd: (sum.rmssd / history.length).toFixed(0),
    };
  };

  // Handle each frame, processing red intensity data.
  const handleFrame = (redIntensity, timestamp) => {
    redDataRef.current.push({ intensity: redIntensity, timestamp });
    const windowDuration = 6000; // milliseconds
    const now = timestamp;

    redDataRef.current = redDataRef.current.filter(
      (data) => now - data.timestamp <= windowDuration
    );
    intensityRef.current = redDataRef.current.filter(
      (data) => now - data.timestamp <= 2000
    );

    // Signal quality check via intensity variation.
    const intensities = intensityRef.current.map((d) => d.intensity);
    const filteredIntensities = removeOutliers(intensities, 2);

    if (filteredIntensities.length === 0) return;

    const minIntensity = Math.min(...filteredIntensities);
    const maxIntensity = Math.max(...filteredIntensities);
    const variation = maxIntensity - minIntensity;
    const variationThreshold = 20; // adjust threshold as needed

    if (variation > variationThreshold) {
      if (
        fingerWarning !==
        "Please ensure your finger is covering the camera lens correctly"
      ) {
        setFingerWarning(
          "Please ensure your finger is covering the camera lens correctly"
        );
      }
    } else {
      if (fingerWarning !== "Hold still while we check your vibe") {
        setFingerWarning("Hold still while we check your vibe");
      }
    }

    // Process heartbeat detection.
    const smoothedRedData = smoothData(redDataRef.current, 5);
    const heartbeats = detectHeartbeats(smoothedRedData);
    const metrics = calculateHRVAndBPM(heartbeats);

    // Update history arrays (limit to last 100 measurements).
    bpmHistoryRef.current.push(metrics.bpm);
    sdnnHistoryRef.current.push(metrics.sdnn);
    rmssdHistoryRef.current.push(metrics.rmssd);
    metricsHistoryRef.current.push(metrics);

    if (metricsHistoryRef.current.length > 100) {
      metricsHistoryRef.current.shift();
    }
    if (bpmHistoryRef.current.length > 100) bpmHistoryRef.current.shift();
    if (sdnnHistoryRef.current.length > 100) sdnnHistoryRef.current.shift();
    if (rmssdHistoryRef.current.length > 100) rmssdHistoryRef.current.shift();

    // Remove outliers from history for stability check.
    const filteredBPM = removeOutliers(bpmHistoryRef.current, 2);
    const filteredSdnn = removeOutliers(sdnnHistoryRef.current, 2);
    const filteredRmssd = removeOutliers(rmssdHistoryRef.current, 2);

    // Check for stability of readings.
    const stabilityThreshold = 30;
    const lastBPMReadings = filteredBPM.slice(-stabilityThreshold);
    const maxRecentBPM = Math.max(...lastBPMReadings);
    const minRecentBPM = Math.min(...lastBPMReadings);
    const bpmVariation = maxRecentBPM - minRecentBPM;
    const avgBPM = Math.round(
      lastBPMReadings.reduce((a, b) => a + b, 0) / lastBPMReadings.length
    );

    const lastSdnnReadings = filteredSdnn.slice(-stabilityThreshold);
    const maxRecentSdnn = Math.max(...lastSdnnReadings);
    const minRecentSdnn = Math.min(...lastSdnnReadings);
    const sdnnVariation = maxRecentSdnn - minRecentSdnn;
    const avgSdnn = Math.round(
      lastSdnnReadings.reduce((a, b) => a + b, 0) / lastSdnnReadings.length
    );

    const lastRmssdReadings = filteredRmssd.slice(-stabilityThreshold);
    const maxRecentRmssd = Math.max(...lastRmssdReadings);
    const minRecentRmssd = Math.min(...lastRmssdReadings);
    const rmssdVariation = maxRecentRmssd - minRecentRmssd;
    const avgRmssd = Math.round(
      lastRmssdReadings.reduce((a, b) => a + b, 0) / lastRmssdReadings.length
    );

    // Update displayed metrics every second.
    const nowTime = Date.now();
    if (nowTime - lastUpdateTimeRef.current >= 1000) {
      setLocalHeartRate({ bpm: avgBPM, sdnn: avgSdnn, rmssd: avgRmssd });
      lastUpdateTimeRef.current = nowTime;
    }

    // Check if the readings are within valid ranges and stable.
    if (
      metrics.bpm !== null &&
      metrics.bpm >= 40 &&
      metrics.bpm <= 180 &&
      metrics.sdnn != null &&
      metrics.sdnn >= 20 &&
      metrics.sdnn <= 180 &&
      metrics.rmssd != null &&
      metrics.rmssd >= 10 &&
      metrics.rmssd <= 1000 // because of lauren!
    ) {
      const bpmStable = bpmVariation <= 1000;
      const rmssdStable = rmssdVariation <= 1000;
      if (bpmStable && rmssdStable) {
        //console.log("✅ BPM stabilized, moving to next screen...");
        setFingerWarning(null);
        setStable(true);
        onStableReading(metrics);
      }
    }
  };

  // Wrap the frame handler to run on the JS thread.
  const handleFrameJS = Worklets.createRunOnJS(handleFrame);

  // const checkRef = (ref) => {
  //   return ref;
  // };
  // const checkRefJS = Worklets.createRunOnJS(checkRef);

  // Frame processor for each camera frame.
  const heartRateProcessor = useFrameProcessor((frame) => {
    "worklet";

    if (!isRefActive(frameProcessorHeartActiveRef.current)) return;

    try {
      const buffer = frame.toArrayBuffer();
      const data = new Uint8Array(buffer);
      let totalRed = 0;
      const pixelCount = data.length / 4;
      for (let i = 0; i < data.length; i += 4) {
        totalRed += data[i]; // red channel
      }
      const redIntensity = totalRed / pixelCount;
      if (redIntensity !== undefined) {
        handleFrameJS(redIntensity, frame.timestamp);
      }
    } catch (error) {
      console.error("❌ HeartRate Frame processing error:", error);
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* {showPlaceholder && (
        <Animated.Text
          style={{
            // marginTop: 100,
            textAlign: "center",
            fontSize: 18,
            color: Colors.textPrimary,
            opacity: placeholderOpacity,
            position: "absolute",
            zIndex: 1,
          }}
        >
          Take a deep breath...
        </Animated.Text>
      )} */}

      {device && (
        <Animated.View
          style={[styles.cameraContainer, { opacity: cameraOpacity }]}
        >
          <Camera
            // key={isFocused ? "active" : "inactive"}
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
              //console.log("camera initialized");
              setCameraReady(true);
              Animated.timing(placeholderOpacity, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
              }).start(() => {
                setShowPlaceholder(false); // Optional: remove it from layout after fade

                Animated.timing(cameraOpacity, {
                  toValue: 1,
                  duration: 800,
                  useNativeDriver: true,
                }).start();
              });
            }}
          />
        </Animated.View>
      )}

      <Animated.View style={{ opacity: cameraOpacity }}>
        {typeof localHeartRate.bpm === "number" &&
          !isNaN(localHeartRate.bpm) &&
          localHeartRate.bpm != null && (
            <Text
              style={{
                textAlign: "center",
                color: Colors.textPrimary,
              }}
            >
              {localHeartRate.bpm
                ? `❤️ ${localHeartRate.bpm} BPM`
                : "Measuring..."}
            </Text>
          )}
        {localHeartRate.sdnn != null &&
          typeof localHeartRate.sdnn === "number" &&
          !isNaN(localHeartRate.sdnn) &&
          localHeartRate.rmssd != null &&
          typeof localHeartRate.rmssd === "number" &&
          !isNaN(localHeartRate.rmssd) && (
            <View>
              <Text
                style={{
                  color: Colors.textPrimary,
                  fontFamily: Fonts.AppFont,
                  textAlign: "center",
                  marginBottom: 2,
                  fontSize: 14,
                }}
              >
                RMSSD: {localHeartRate.rmssd.toFixed(0)} ms
              </Text>
            </View>
          )}

        <Text
          style={{
            color: Colors.textPrimary,
            marginTop: 20,
            fontSize: 24,
            borderColor: "black",
            textAlign: "center",
            paddingTop: 10,
            paddingRight: 20,
            paddingLeft: 20,
          }}
        >
          {fingerWarning}
        </Text>
        {stable && (
          <Text style={{ fontSize: 36, color: Colors.textPrimary }}>
            STABLE
          </Text>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    // borderRadius: 16,
    width: "100%",
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "transparent",
    //      backgroundColor: "blue",
    //dth: 160,
    height: 160,
    //   borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  cameraContainer: {
    marginTop: -30,
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: "#ccc",
    marginBottom: 10,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  // permissionContainer: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // permissionButton: {
  //   marginTop: 20,
  //   padding: 10,
  //   backgroundColor: "#2196F3",
  //   borderRadius: 5,
  // },
});
