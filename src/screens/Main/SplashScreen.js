import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Easing } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { initApp, getMatchId } from "@utils";
import { useAuth } from "@context";
import { AnimatedLogo, GradientBackground } from "@components";
import { Colors } from "@constants";
import { styles } from "./SplashScreen.styles";

export const SplashScreen = () => {
  const navigation = useNavigation();
  const { user, authLoading } = useAuth();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0.1)).current;

  useEffect(() => {
    // Logo animation
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
  }, []);

  useEffect(() => {
    const startApp = async () => {
      if (authLoading) return;

      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        await initApp();

        const matchId = getMatchId();

        if (matchId) {
          console.log("✅ Deep link matchId found:", matchId);
          if (user) {
            // Logged in, go straight to match
            navigation.navigate("Tabs", {
              screen: "VibeMatch",
              // params: { screen: "MatchScreen", params: { id: matchId } },
              params: { screen: "MatchScreen" },
            });
          } else {
            // Not logged in, go to sign-in with redirect
            navigation.navigate("Tabs", {
              screen: "Settings",
              params: {
                screen: "SignInScreen",
                params: {
                  returnTo: {
                    screen: "VibeMatch",
                    params: { screen: "MatchScreen", params: { id: matchId } },
                  },
                },
              },
            });
            // Don't clear yet — MatchScreen will handle it after login
          }
        } else {
          // No matchId — normal flow
          if (user) {
            navigation.navigate("Tabs", { screen: "Home" });
          } else {
            navigation.navigate("Tabs", {
              screen: "Settings",
              params: { screen: "SignInScreen" },
            });
          }
        }
      } catch (e) {
        console.error("❌ Splash init failed", e);
      }
    };

    startApp();
  }, [authLoading, user]);

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
