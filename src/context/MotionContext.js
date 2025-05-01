import { useFocusEffect } from "@react-navigation/native";
import React, {
  useCallback,
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { Accelerometer } from "expo-sensors";
import { evaluateMotion } from "@utils";

const MotionContext = createContext();

export const MotionProvider = ({ children }) => {
  const [motionValues, setMotionValues] = useState([]);
  const [averageMotion, setAverageMotion] = useState(0);
  const [latestMotion, setLatestMotion] = useState(0);
  const [motionEval, setMotionEval] = useState();
  const motionSubscriptionRef = useRef();
  const motionInterval = 500;
  const MAX_VALUES = 100;

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
    }, [])
  );

  useEffect(() => {
    const evaluation = evaluateMotion({
      avgMagnitude: latestMotion,
    });
    //    //console.log("motion eval:", evaluation);
    setMotionEval(evaluation);

    if (motionValues.length) {
      const sum = motionValues.reduce((a, b) => a + b, 0);
      setAverageMotion(sum / motionValues.length);
    }
  }, [motionValues, latestMotion]);

  const startMotionTracking = async () => {
    setMotionValues([]);
    setAverageMotion(0);
    setLatestMotion(0);

    motionSubscriptionRef.current = Accelerometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

      setMotionValues((prev) => {
        const updated = [...prev, magnitude];
        return updated.length > MAX_VALUES
          ? updated.slice(-MAX_VALUES) // keep only the most recent ones
          : updated;
      });
      setLatestMotion(magnitude);
    });
    Accelerometer.setUpdateInterval(motionInterval);
  };

  const stopMotionTracking = async () => {
    //   subscription && subscription.remove();
    if (motionSubscriptionRef.current) {
      motionSubscriptionRef.current.remove();
      motionSubscriptionRef.current = null;
    }
  };

  return (
    <MotionContext.Provider
      value={{
        latestMotion,
        averageMotion,
        motionEval,
        startMotionTracking,
        stopMotionTracking,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
};
export const useMotion = () => useContext(MotionContext);
