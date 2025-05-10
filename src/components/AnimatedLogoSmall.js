import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";
import FastImage from "react-native-fast-image";

export const AnimatedLogoSmall = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start rotating the circle
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.logoContainer}>
      <Animated.Image
        source={require("@assets/images/dots.webp")}
        style={[
          styles.dots,
          {
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
      />
      <FastImage
        source={require("@assets/images/VLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: 120,
    height: 120,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "transparent",
  },

  dots: {
    position: "absolute",
    width: 120,
    height: 120,
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
  },

  logo: {
    position: "absolute",
    top: 40,
    width: 100, // make it larger than the container
    height: 100,
    zIndex: 1,
    resizeMode: "contain",
  },
});
