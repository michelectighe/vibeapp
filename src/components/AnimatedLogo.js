import React, { useEffect, useRef } from "react";
import {
  View,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  Easing,
} from "react-native";

const { width, height } = Dimensions.get("window");

const AnimatedLogo = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start rotating the circle
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.logoContainer}>
      <Animated.Image
        source={require("@assets/images/dots.png")}
        style={[
          styles.dots,
          {
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
      />
      <Image
        source={require("@assets/images/VLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: 200,
    height: 200,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    top: 50,
    overflow: "visible", // this allows logo to grow beyond circle
    //overflow: "hidden",
    backgroundColor: "transparent",
  },

  dots: {
    position: "absolute",
    width: 300,
    height: 300,
    top: -50,
    left: -50,
  },

  logo: {
    width: 250, // make it larger than the container
    height: 250,
    zIndex: 1,
    resizeMode: "contain",
  },
});

export default AnimatedLogo;
