import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import { Magnetometer } from "expo-sensors";
import SoundLevel from "react-native-sound-level";
import { useFocusEffect } from "@react-navigation/native";
import { evaluateEnvironment } from "@utils";

const EnvironmentContext = createContext();

export const EnvironmentProvider = ({ children }) => {
  // State to hold sensor data and computed averages.
  const [magnetometerValues, setMagnetometerValues] = useState([]);
  const [soundValues, setSoundValues] = useState([]);
  const [averageMagnitude, setAverageMagnitude] = useState(0);
  const [averageSound, setAverageSound] = useState(0);
  const [latestSound, setLatestSound] = useState(0);
  const [latestMagnitude, setLatestMagnitude] = useState(0);
  const [environment, setEnvironment] = useState();
  const environmentSubscriptionRef = useRef();
  const intervalRef = useRef();
  const recordingRef = useRef();
  const magnetometerInterval = 1000;
  const soundIntervalDuration = 1000;
  const MAX_VALUES = 100; // max sound and mag values to hold

  useFocusEffect(
    useCallback(() => {
      try {
        startEnvironmentTracking();
      } catch (error) {
        console.error("Error in StartEnvironmentTracking:", error);
      }

      // Clean up when the component loses focus.
      return () => {
        try {
          stopEnvironmentTracking();
        } catch (error) {
          console.error("Error in StopEnvironmentTracking:", error);
        }
      };
    }, [])
  );
  // Update calm score based on sound & magnetometer data
  useEffect(() => {
    if (latestSound !== null && latestMagnitude !== null) {
      const soundLevelDb = 100 + latestSound; // convert to decibels
      const evaluation = evaluateEnvironment({
        soundLevelDb: soundLevelDb,
        magnetometerValue: latestMagnitude,
      });
      //      //console.log("eval:", evaluation);
      setEnvironment(evaluation);
      //  //console.log("length of sound values: ", soundValues.length);
      if (soundValues.length > 0) {
        const avg =
          soundValues.reduce((acc, val) => acc + val, 0) / soundValues.length;
        setAverageSound(avg);
      }
      if (magnetometerValues.length > 0) {
        const avg =
          magnetometerValues.reduce((acc, val) => acc + val, 0) /
          magnetometerValues.length;
        setAverageMagnitude(avg);
      }
    }
  }, [latestSound, latestMagnitude]);

  const startEnvironmentTracking = async () => {
    setMagnetometerValues([]);
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
      //     //console.log("MAGNITUDE:", magnitude);
      setLatestMagnitude(magnitude);
      //    //console.log("MAG:", magnitude);
    });
    Magnetometer.setUpdateInterval(magnetometerInterval);

    /************************************************************/
    /*  start sound recording                                   */
    /************************************************************/

    // Poll the recording for metering values at the set interval.
    let metering;
    SoundLevel.start();
    intervalRef.current = setInterval(async () => {
      try {
        SoundLevel.onNewFrame = (data) => {
          metering = data.value; // <- raw dB reading
        };
        //      //console.log("soundsfrom environment context:", metering);
        setSoundValues((prev) => {
          const updated = [...prev, metering];
          return updated.length > MAX_VALUES
            ? updated.slice(-MAX_VALUES) // keep only the most recent ones
            : updated;
        });
        setLatestSound(metering);
        //            //console.log("sound:", metering);
      } catch (error) {
        console.error("Error getting recording status:", error);
      }
    }, soundIntervalDuration);
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
        startEnvironmentTracking,
        stopEnvironmentTracking,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};
export const useEnvironment = () => useContext(EnvironmentContext);
