
import { useRef, useEffect } from "react";
import { Animated, Text } from "react-native";

export const FadeInSlideText = ({ text, duration = 3000, style }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(200)).current;

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
  }, [duration]);

  return (
    <Animated.Text style={[style, { opacity, transform: [{ translateY }] }]}>{text}</Animated.Text>
  );
};
  