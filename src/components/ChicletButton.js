import React, { useRef, useEffect } from "react";
import {
  ImageBackground,
  View,
  Animated,
  StyleSheet,
  Text,
} from "react-native";
import { SCREEN_WIDTH } from "@utils";

export const ChicletButton = ({ imgSource = "", label = "" }) => {
  const imageFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(imageFade, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const SIZE = SCREEN_WIDTH * 0.7; // Button will be 50% of screen width

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            width: SIZE * 1.2,
            height: SIZE * 0.5,
            borderRadius: SIZE / 2,
            opacity: imageFade,
          },
        ]}
      >
        <ImageBackground
          source={imgSource}
          resizeMode="contain"
          style={styles.imageBackground}
        >
          <View style={styles.overlay}>
            <Text style={styles.label}>{label}</Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    overflow: "hidden",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  label: {
    color: "purple",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: "15%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)", // optional semi-transparent overlay
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
