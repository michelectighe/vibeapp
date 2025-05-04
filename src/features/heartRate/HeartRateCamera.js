import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, Animated } from "react-native";
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
} from "@react-navigation/native";
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
import { useKickJS } from "@hooks";
import { styles } from "@/screens/VibeCheck/HeartRateScreen.styles";
import { globalStyles } from "@styles";
import { Colors, Fonts } from "@constants";

export const HeartRateCamera = ({ onStableReading }) => {
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

  const navigation = useNavigation();
  const { setHeartRate } = useAnalysis();
  const isFocused = useIsFocused();
  const device = useCameraDevice("back");

  useFocusEffect(
    useCallback(() => {
      if (!device || !cameraReady) return;
      global.lastTs = 0;
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
      return () => {};
    }, [device, cameraReady])
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
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
          const averageMetrics = computeAverageMetrics();
          if (averageMetrics) setHeartRate(averageMetrics);
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

  const handleFrame = (redIntensity, timestamp) => {
    redDataRef.current.push({ intensity: redIntensity, timestamp });
    const now = timestamp;
    redDataRef.current = redDataRef.current.filter(
      (d) => now - d.timestamp <= 6000
    );
    intensityRef.current = redDataRef.current.filter(
      (d) => now - d.timestamp <= 2000
    );

    const intensities = intensityRef.current.map((d) => d.intensity);
    const filteredIntensities = removeOutliers(intensities, 2);
    if (filteredIntensities.length === 0) return;

    const variation =
      Math.max(...filteredIntensities) - Math.min(...filteredIntensities);
    if (variation > 20) {
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

    const bpmVariation =
      Math.max(...filteredBPM.slice(-30)) - Math.min(...filteredBPM.slice(-30));
    const rmssdVariation =
      Math.max(...filteredRmssd.slice(-30)) -
      Math.min(...filteredRmssd.slice(-30));

    const nowTime = Date.now();
    if (nowTime - lastUpdateTimeRef.current >= 1000) {
      setLocalHeartRate({
        bpm: Math.round(filteredBPM.slice(-30).reduce((a, b) => a + b, 0) / 30),
        sdnn: Math.round(
          filteredSdnn.slice(-30).reduce((a, b) => a + b, 0) / 30
        ),
        rmssd: Math.round(
          filteredRmssd.slice(-30).reduce((a, b) => a + b, 0) / 30
        ),
      });
      lastUpdateTimeRef.current = nowTime;
    }

    if (
      metrics.bpm &&
      metrics.bpm >= 40 &&
      metrics.bpm <= 180 &&
      metrics.sdnn >= 20 &&
      metrics.sdnn <= 180 &&
      metrics.rmssd >= 10 &&
      metrics.rmssd <= 1000 &&
      bpmVariation <= 1000 &&
      rmssdVariation <= 1000
    ) {
      setFingerWarning(null);
      setStable(true);
      onStableReading(metrics);
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
      if (redIntensity !== undefined)
        handleFrameJS(redIntensity, frame.timestamp);
    } catch (err) {
      console.error("❌ HeartRate frame error:", err);
    }
  }, []);

  return (
    <View style={styles.container}>
      {device && (
        <Animated.View
          style={[styles.cameraContainer, { opacity: cameraOpacity }]}
        >
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
                setShowPlaceholder(false);
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
          !isNaN(localHeartRate.bpm) && (
            <Text style={styles.bpmText}>
              {localHeartRate.bpm
                ? `❤️ ${localHeartRate.bpm} BPM`
                : "Measuring..."}
            </Text>
          )}
        {typeof localHeartRate.rmssd === "number" &&
          !isNaN(localHeartRate.rmssd) && (
            <Text style={styles.rmssdText}>
              RMSSD: {localHeartRate.rmssd.toFixed(0)} ms
            </Text>
          )}
        <Text style={styles.warningText}>{fingerWarning}</Text>
        {stable && <Text style={styles.stableText}>STABLE</Text>}
      </Animated.View>
    </View>
  );
};
