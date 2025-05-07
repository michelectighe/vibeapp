import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

export const useOrientation = () => {
  const [isLandscape, setIsLandscape] = useState(
    () => Dimensions.get("window").width > Dimensions.get("window").height,
  );

  useEffect(() => {
    const onChange = ({ window }) => {
      setIsLandscape(window.width > window.height);
    };

    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      // For RN 0.65+: remove using .remove() on the subscription object
      subscription?.remove?.();
    };
  }, []);

  return isLandscape;
};
