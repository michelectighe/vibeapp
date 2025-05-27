import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Easing , StyleSheet} from "react-native";
import { AnimatedLogo, GradientBackground } from "@components";
import { Colors } from "@constants";
import { scaledStyle } from "@/utils";

export const SplashDeepLink = ( ) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0.1)).current;


  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 7000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Animated.View style={[styles.animatedView, { opacity: fadeAnim }]}>
      <GradientBackground
        colors={[Colors.gradient2, Colors.gradient3, Colors.gradient1]}
        logo={false}
      >
        <View style={styles.container}>
          <AnimatedLogo />
        </View>
      </GradientBackground>
    </Animated.View>
  );
};

const rawStyles = {
  animatedView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
};

export const styles = StyleSheet.create(scaledStyle(rawStyles));