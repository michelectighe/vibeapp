import React, { useRef, useEffect } from "react";
import { ImageBackground, View, Animated, StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "@utils";

export const CustomButton = ({ imgSource = "" }) => {
  const imageFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(imageFade, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const SIZE = SCREEN_WIDTH * 0.5; // Button will be 50% of screen width

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            width: SIZE,
            height: SIZE,
            borderRadius: SIZE / 2,
            opacity: imageFade,
          },
        ]}
      >
        <ImageBackground source={imgSource} resizeMode="cover" style={styles.imageBackground} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
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
});
