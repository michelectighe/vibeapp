import React, { useEffect, useRef, useState } from "react";
import { initApp } from "@utils";
import { useAuth, useModel } from "@context";
import { View, Animated, StyleSheet, Dimensions, Easing } from "react-native";
import { AnimatedLogo, GradientBackground } from "@components";
import { Colors, Fonts } from "@constants";
const { width, height } = Dimensions.get("window");

const SplashScreen = ({ navigation, route }) => {
  const { model, setModel } = useModel();
  const { user, authLoading } = useAuth();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0.1)).current;
  const [matchId, setMatchId] = useState(null);

  useEffect(() => {
    setMatchId(route.params?.id || null);
  }, [route]);

  useEffect(() => {
    // Start rotating animation (if still used)
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 7000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();

    // 👇 Fade in animation
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
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <GradientBackground
        colors={[
          Colors.VibeGradient1,
          Colors.VibeGradient2,
          Colors.VibeGradient1,
        ]}
        logo={false}
      >
        <View style={styles.container}>
          <AnimatedLogo />
        </View>
      </GradientBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
});

export default SplashScreen;
