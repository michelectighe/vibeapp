import React, { useEffect, useRef, useState } from "react";
import { useAuth, useModel, useSoundModel } from "@context";
import { View, Animated, Easing } from "react-native";
import { AnimatedLogo, GradientBackground } from "@components";
import { Colors } from "@constants";
import { styles } from "./SplashScreen.styles";
import { globalStyles } from "@styles";
import { initApp } from "@/utils";

export const SplashScreen = ({ navigation, route }) => {
  const { user, authLoading } = useAuth();
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
