import React, { createContext, useState, useEffect, useCallback, useContext, useRef } from "react";
import { Magnetometer } from "expo-sensors";
import { useFocusEffect } from "@react-navigation/native";
import { evaluateEnvironment, analyzePeacefulness } from "@utils";
import AudioRecord from "react-native-audio-record";
import { Buffer } from "buffer";
import { useModels } from "@context";
import { initMedia, cleanupMedia } from "@/utils";

const EnvironmentContext = createContext();

export const EnvironmentProvider = ({ children }) => {
  // State to hold sensor data and computed averages.
  const { soundModel, sounds } = useModels();
  const [magnetometerValues, setMagnetometerValues] = useState([]);
  const [environmentValues, setEnvironmentValues] = useState([]);
  const [soundValues, setSoundValues] = useState([]);
  const [vibeList, setVibeList] = useState([]);
  const [soundLabels, setSoundLabels] = useState([]);
  const [averageMagnitude, setAverageMagnitude] = useState(0);
  const [averageSound, setAverageSound] = useState(0);
  const [averageEnvironment, setAverageEnvironment] = useState(0);
  const [latestSound, setLatestSound] = useState(0);
  const [latestMagnitude, setLatestMagnitude] = useState(0);
  const [environment, setEnvironment] = useState();
  const [percentGood, setPercentGood] = useState();
  const environmentSubscriptionRef = useRef();
  const intervalRef = useRef();
  const recordingRef = useRef();
  const magnetometerInterval = 1000;
  const audioBuffer = React.useRef([]);
  const MAX_VALUES = 100; // max sound and mag values to hold

  useFocusEffect(
    useCallback(() => {
      try {
        const setup = async () => {
          try {
            await initMedia(
              {
                settings: {
                  sampleRate: 15600,
                  channels: 1,
                  bitsPerSample: 16,
                  audioSource: 6,
                  wavFile: "realtime.wav",
                },
              },
              "audio",
            );
            setTimeout(async () => {
              startEnvironmentTracking();
              ////console.log("🎙️ Audio recording started after delay");
            }, 500);

            ////console.log("recording started");
          } catch (e) {
            console.warn("Setup failed in EnvironmnetContext init media:", e);
          }
        };
        setup();
      } catch (error) {
        console.error("Error in StartEnvironmentTracking:", error);
      }

      // Clean up when the component loses focus.
      return () => {
        try {
          (async () => {
            try {
              await cleanupMedia({
                useAudio: true,
                useSoundLevel: false,
                useCamera: false,
              });
            } catch (e) {
              console.warn("❌ Cleanup failed in EnvironmentContext:", e);
            }
          })();
          stopEnvironmentTracking();
        } catch (error) {
          console.error("Error in StopEnvironmentTracking:", error);
        }
      };
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  );
  // Update calm score based on sound & magnetometer data
  useEffect(() => {
    // //console.log('use effect')
    if (latestSound !== null && latestMagnitude !== null && percentGood != null) {
      const soundLevelDb = 100 + latestSound; // convert to decibels
      const evaluation = evaluateEnvironment({
        soundLevelDb: soundLevelDb,
        magnetometerValue: latestMagnitude,
        percentGood: percentGood,
      });
      updateEnvironmentValues(evaluation);
      setEnvironment(evaluation);

      //  ////console.log("length of sound values: ", soundValues.length);
      if (soundValues.length > 0) {
        const avg = soundValues.reduce((acc, val) => acc + val, 0) / soundValues.length;
        setAverageSound(avg);
      }
      if (magnetometerValues.length > 0) {
        const avg =
          magnetometerValues.reduce((acc, val) => acc + val, 0) / magnetometerValues.length;
        setAverageMagnitude(avg);
      }
      if (environmentValues.length > 0) {
        const avg = environmentValues.reduce((acc, val) => acc + val, 0) / environmentValues.length;
        //console.log("AVERAGE ENV:", avg)
        const roundAvg = Math.round(avg);
        setAverageEnvironment(roundAvg);
      }
    }
  }, [latestSound, latestMagnitude, percentGood, vibeList]); // eslint-disable-line react-hooks/exhaustive-deps

  const startEnvironmentTracking = async () => {
    setMagnetometerValues([]);
    setEnvironmentValues([]);
    setLatestMagnitude(0);
    setAverageMagnitude(0);
    setAverageSound(0);

    environmentSubscriptionRef.current = Magnetometer.addListener((data) => {
      const magnitude = Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);

      setMagnetometerValues((prev) => {
        const updated = [...prev, magnitude];
        return updated.length > MAX_VALUES
          ? updated.slice(-MAX_VALUES) // keep only the most recent ones
          : updated;
      });
      setLatestMagnitude(magnitude);
      //    ////console.log("MAG:", magnitude);
    });
    Magnetometer.setUpdateInterval(magnetometerInterval);

    AudioRecord.on("data", (data) => {
      const chunk = Buffer.from(data, "base64");
      for (let i = 0; i < chunk.length; i += 2) {
        const sample = chunk.readInt16LE(i);
        const value = sample / 32768;
        audioBuffer.current.push(value);
      }
    });

    AudioRecord.start();
    console.log("audio start");
    intervalRef.current = setInterval(async () => {
      //  console.log("audiolength:", audioBuffer.current.length);
      if (!soundModel || audioBuffer.current.length < 15600) return;

      const slice = audioBuffer.current.slice(-15600);
      const padded = new Float32Array(15600);
      padded.set(slice);

      const result = await analyzePeacefulness(padded, soundModel, sounds);
      //  console.log('result:', result)
      updateValues(result);
    }, 1000);
  };
  /************************************************************ */
  const updateValues = (results) => {
    //console.log("results:", results)
    const { rankedCategories, percentGood, decibels, topLabels } = results;

    setSoundValues((prev) => {
      const updated = [...prev, decibels];
      return updated.length > MAX_VALUES
        ? updated.slice(-MAX_VALUES) // keep only the most recent ones
        : updated;
    });
    setLatestSound(decibels);
    setVibeList(rankedCategories);
    setSoundLabels(topLabels);
    setPercentGood(Number(percentGood));
    //setBad(percentBad);
  };

  const updateEnvironmentValues = (evaluation) => {
    const { overall } = evaluation;
    setEnvironmentValues((prev) => {
      const updated = [...prev, overall.value];
      return updated.length > MAX_VALUES
        ? updated.slice(-MAX_VALUES) // keep only the most recent ones
        : updated;
    });
    //console.log('ENV VALUES:', overall.value)
  };

  const stopEnvironmentTracking = async () => {
    if (environmentSubscriptionRef.current) {
      environmentSubscriptionRef.current.remove();
      environmentSubscriptionRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);

      try {
        if (recordingRef.current) {
          await recordingRef.current.stop();
        }
      } catch (e) {
        if (e.message?.includes("already been unloaded")) {
          console.warn("Recording already stopped and unloaded.");
        } else {
          console.warn("Error stopping recording:", e);
        }
      } finally {
        intervalRef.current = null; // ✅ always clean it up safely
        recordingRef.current = null;
      }
    }
  };

  return (
    <EnvironmentContext.Provider
      value={{
        environment,
        averageMagnitude,
        averageSound,
        averageEnvironment,
        vibeList,
        soundLabels,
        startEnvironmentTracking,
        stopEnvironmentTracking,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};
export const useEnvironment = () => useContext(EnvironmentContext);
