import React, { useEffect, useRef, useState } from "react";
import { initApp } from "@utils";
import { useAuth, useModels } from "@context";
import { View, Animated, Easing } from "react-native";
import { AnimatedLogo, GradientBackground } from "@components";
import { Colors } from "@constants";
import { styles } from "./SplashScreen.styles";
import { globalStyles } from "@styles";

export const SplashScreen = ({ navigation, route, matchId = null }) => {
  const { user, authLoading } = useAuth();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0.1)).current;

  // useEffect(() => {
  //   setMatchId(route.params?.id || null);
  // }, [route]);

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

  useEffect(() => {
    const startApp = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        await initApp();

        if (authLoading) return;
        //console.log("DO WE COME IN HERE WITH AN ID:", matchId);

        if (!matchId) {
          // don't do this if coming from the match screen (deep link)
          if (user) {
            navigation.replace("Tabs", { screen: "Home" });
          } else {
            navigation.replace("Welcome");
          }
        }
      } catch (e) {
        console.error("❌ Init failed", e);
      }
    };
    startApp();
  }, [authLoading, user]); // eslint-disable-line react-hooks/exhaustive-deps

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
