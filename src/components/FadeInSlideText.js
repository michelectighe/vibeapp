
import { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const FadeInSlideText = ({ text, duration = 3000, style, position = 200 }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(position)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [duration]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Animated.Text style={[style, { opacity, transform: [{ translateY }] }]}>{text}</Animated.Text>
  );
};
  