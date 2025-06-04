import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, createContext, useState, useEffect, useContext, useRef } from "react";
import { Accelerometer } from "expo-sensors";
import { evaluateMotion } from "@utils";

const MotionContext = createContext();

export const MotionProvider = ({ children }) => {
  const [latestMotion, setLatestMotion] = useState(0);
  const [isFidgeting, setIsFidgeting] = useState(false);
  const [motionEval, setMotionEval] = useState();

  const [realtimeStdDev, setRealtimeStdDev] = useState(0);
  const [sessionStdDev, setSessionStdDev] = useState(0);
  const [realtimeMotionValues, setRealtimeMotionValues] = useState([]);
  const [sessionMotionValues, setSessionMotionValues] = useState([]);

  const motionSubscriptionRef = useRef();
  const motionInterval = 500;
  const MAX_VALUES = 100;
  const MAX_REALTIME_VALUES = 3; // this one is used to get the standard deviation

  useFocusEffect(
    useCallback(() => {
      try {
        startMotionTracking();
      } catch (error) {
        console.error("Error in StartMotionTracking:", error);
      }

      return () => {
        try {
          stopMotionTracking();
        } catch (error) {
          console.error("Error in StopMotionTracking:", error);
        }
      };
    }, []),
  );

  useEffect(() => {
    if (!realtimeStdDev) return;
    const evaluation = evaluateMotion(realtimeStdDev);
    setMotionEval(evaluation);
  }, [realtimeStdDev]);

  useEffect(() => {
    if (realtimeMotionValues.length == 0) {
      setRealtimeStdDev(0);
      setIsFidgeting(false);
      return;
    }
    // StdDev (Fidgeting / variation)
    const sum = realtimeMotionValues.reduce((a, b) => a + b, 0);
    const mean = sum / realtimeMotionValues.length;
    const variance =
      realtimeMotionValues.reduce((acc, v) => acc + (v - mean) ** 2, 0) /
      realtimeMotionValues.length;
    const stdDev = Math.sqrt(variance);
    setRealtimeStdDev(stdDev);
    setIsFidgeting(stdDev > 0.1);

    if (sessionMotionValues.length > 0) {
      const sum = realtimeMotionValues.reduce((a, b) => a + b, 0);
      const mean = sum / realtimeMotionValues.length;
      setSessionStdDev(
        Math.sqrt(
          sessionMotionValues.reduce((acc, v) => acc + (v - mean) ** 2, 0) /
            sessionMotionValues.length,
        ),
      );
    }
    // Fidgeting threshold: tweak as you like (0.07 is a reasonable start for hand-held phone)
  }, [realtimeMotionValues, sessionMotionValues]);

  const startMotionTracking = async () => {
    setRealtimeMotionValues([]);
    setSessionMotionValues([]);
    setRealtimeStdDev(0);
    setSessionStdDev(0);
    setIsFidgeting(false);

    motionSubscriptionRef.current = Accelerometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

      // Short window
      setRealtimeMotionValues((prev) => {
        const updated = [...prev, magnitude];
        return updated.length > MAX_REALTIME_VALUES ? updated.slice(-MAX_REALTIME_VALUES) : updated;
      });

      // Session window (all values up to 100, or as many as session length)
      setSessionMotionValues((prev) => {
        const updated = [...prev, magnitude];
        return updated.length > MAX_VALUES ? updated.slice(-MAX_VALUES) : updated; // Or never trim if you want full session
      });
    });
    Accelerometer.setUpdateInterval(motionInterval);
  };

  const stopMotionTracking = async () => {
    if (motionSubscriptionRef.current) {
      motionSubscriptionRef.current.remove();
      motionSubscriptionRef.current = null;
    }
  };

  return (
    <MotionContext.Provider
      value={{
        isFidgeting,
        sessionStdDev,
        motionEval,
        startMotionTracking,
        stopMotionTracking,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
};

export const useMotion = () => {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return context;
};
