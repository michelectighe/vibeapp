// FloatingFeather.js
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

const FloatingFeather = ({ startX = 0.3, delay = 0 }) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const start = () => {
      translateY.setValue(-100);
      translateX.setValue(0);
      rotate.setValue(0);

      Animated.parallel([
        Animated.loop(
          Animated.timing(translateY, {
            toValue: height + 100,
            duration: 10000,
            delay,
            useNativeDriver: true,
          })
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(translateX, {
              toValue: 20,
              duration: 3000,
              useNativeDriver: true,
            }),
            Animated.timing(translateX, {
              toValue: -20,
              duration: 3000,
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(rotate, {
              toValue: 1,
              duration: 5000,
              useNativeDriver: true,
            }),
            Animated.timing(rotate, {
              toValue: -1,
              duration: 5000,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    };

    start();
  }, []);

  const spin = rotate.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-10deg", "10deg"],
  });

  return (
    <Animated.Image
      source={require("@assets/images/feather.png")}
      style={[
        styles.feather,
        {
          left: width * startX,
          transform: [
            { translateY },
            { translateX },
            { rotate: spin },
            { scale: 0.6 },
          ],
        },
      ]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  feather: {
    position: "absolute",
    width: 60,
    height: 60,
    opacity: 0.7,
  },
});

export default FloatingFeather;
