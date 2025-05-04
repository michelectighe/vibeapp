import React, { useEffect, useRef, useState } from "react";
import { initApp } from "@utils";
import { useAuth, useModel } from "@context";
import { View, Animated, Easing } from "react-native";
import { AnimatedLogo, GradientBackground } from "@components";
import { Colors } from "@constants";
import { styles } from "./SplashScreen.styles";
import { globalStyles } from "@styles";

export const SplashScreen = ({ navigation, route }) => {
  const { model, setModel } = useModel();
  const { user, authLoading } = useAuth();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0.1)).current;
  const [matchId, setMatchId] = useState(null);

  useEffect(() => {
    setMatchId(route.params?.id || null);
  }, [route]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 7000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const startApp = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        await initApp({ setModel });

        if (authLoading) return;

        if (matchId) {
          navigation.replace("Tabs", {
            screen: "VibeMatch",
            params: { screen: "MatchScreen", params: { id: matchId } },
          });
        } else if (user) {
          navigation.replace("Tabs", { screen: "Home" });
        } else {
          navigation.replace("Welcome");
        }
      } catch (e) {
        console.error("❌ Init failed", e);
      }
    };
    startApp();
  }, [authLoading, user]);

  return (
    <Animated.View style={[styles.animatedView, { opacity: fadeAnim }]}>
      <GradientBackground
        colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}
        logo={false}
      >
        <View style={globalStyles.container}>
          <AnimatedLogo />
        </View>
      </GradientBackground>
    </Animated.View>
  );
};
