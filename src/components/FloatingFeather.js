import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, StyleSheet, Easing } from "react-native";

const { height, width } = Dimensions.get("window");

export const FloatingFeather = ({ startX = 0.3, delay = 0 }) => {
  //Animation values
  const sway = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  // 🎲 Randomize sway size and speed for uniqueness
  const swayAmplitude = useRef(Math.random() * 40 + 20).current; // 20–60 px
  const swayDuration = useRef(Math.random() * 3000 + 4000).current; // 4s–7s
  const horizontalDrift = useRef(Math.random() * 70 - 25).current; // slight X offset
  const fallProgress = useRef(new Animated.Value(0)).current;
  const fallDuration = useRef(Math.random() * 5000 + 25000).current;

  const translateY = fallProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, height + 100],
  });
  useEffect(() => {
    //fall loop
    Animated.loop(
      Animated.timing(fallProgress, {
        toValue: 1,
        duration: fallDuration,
        delay,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Sway loop using interpolation for sine wave
    Animated.loop(
      Animated.timing(sway, {
        toValue: 1,
        duration: swayDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();


    // Rotation loop
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
    ).start();

    // Fade in and out
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 2000,
          delay: 6000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateX = sway.interpolate({
    inputRange: [0, 1],
    outputRange: [-swayAmplitude, swayAmplitude],
  });

  const spin = rotate.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-25deg", "25deg"],
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: width * startX,
        transform: [{ translateX }],
      }}
    >
      <Animated.Image
        source={require("@assets/images/feather.png")}
        style={[
          styles.feather,
          {
            transform: [{ translateY }, { rotate: spin }, { scale: 0.6 }],
            opacity,
          },
        ]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  feather: {
    position: "absolute",
    width: 60,
    height: 60,
    opacity: 0.6,
  },
});
