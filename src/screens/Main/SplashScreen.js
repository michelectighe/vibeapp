import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { initApp, getMatchId, resetToNestedScreen } from "@utils";
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            resetToNestedScreen(navigation, ["Tabs", "VibeMatch", "MatchScreen"], {
              MatchScreen: { id: matchId },
            });
          } else {
            // Not logged in, go to sign-in with redirect
            resetToNestedScreen(navigation, ["Tabs", "Settings", "SignInScreen"]);
          }
        } else {
          // No matchId — normal flow
          if (user) {
            resetToNestedScreen(navigation, ["Tabs", "Home"]);
          } else {
            resetToNestedScreen(navigation, ["Tabs", "Settings", "SignInScreen"]);
          }
        }
      } catch (e) {
        console.error("❌ Splash init failed", e);
      }
    };

    startApp();
  }, [authLoading, user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Animated.View style={[styles.animatedView, { opacity: fadeAnim }]}>
      <GradientBackground
        colors={[Colors.marbleBeige, Colors.marbleBeige, Colors.marbleBeige]}
        logo={false}
      >
        <View style={styles.container}>
          <AnimatedLogo />
        </View>
      </GradientBackground>
    </Animated.View>
  );
};
