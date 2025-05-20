/* eslint-disable react-hooks/exhaustive-deps */

import React, { useRef, useCallback } from "react";
import { View, Text, Animated } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useUserProfile } from "@context";
import {
  GradientBackground,
  SectionLayout,
  CustomSpiritualButton,
  AnimatedHorizontalScroll,
} from "@components";
import { Colors } from "@constants";
import { welcomeCards } from "@data";
import { styles } from "./WelcomeScreen.styles";
import { globalStyles } from "@/styles";
import { useAmbientControlForScreen } from "@hooks";

export const WelcomeScreen = () => {
  useAmbientControlForScreen(true);
  const positionY = useRef(new Animated.Value(-30)).current;
  const navigation = useNavigation();
  const { loading } = useUserProfile();

  useFocusEffect(
    useCallback(() => {
      positionY.setValue(-30);
      Animated.timing(positionY, {
        toValue: 45,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, []),
  );

  const slideAnim = useRef(new Animated.Value(300)).current;

  useFocusEffect(
    useCallback(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, []),
  );

  if (loading) return <Text>Loading...</Text>;

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <SectionLayout
        topFlex={2}
        middleFlex={3}
        bottomFlex={3}
        topContent={
          <View style={globalStyles.titleWrapper}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={[styles.welcomeText, { fontSize: 18 }]}>
              Ever wonder what your vibrational frequency is?
            </Text>
          </View>
        }
        middleContent={
          <AnimatedHorizontalScroll>
            {welcomeCards.map((card, index) => (
              <View key={index} style={styles.infoCard}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardDescription}>{card.description}</Text>
              </View>
            ))}
          </AnimatedHorizontalScroll>
        }
        bottomContent={
          <View style={styles.buttonWrapper}>
            <CustomSpiritualButton
              label="Log In"
              onPress={() =>
                navigation.navigate("Tabs", {
                  screen: "Settings",
                  params: {
                    screen: "SignInScreen",
                  },
                })
              }
              color={Colors.buttonBackground}
              textColor={Colors.buttonText}
            />
            <CustomSpiritualButton
              label="Sign Up"
              onPress={() =>
                navigation.navigate("Tabs", {
                  screen: "Settings",
                  params: {
                    screen: "SignUpScreen",
                  },
                })
              }
              color={Colors.buttonBackground}
              textColor={Colors.buttonText}
            />
            <CustomSpiritualButton
              label="Continue as Guest"
              onPress={() => navigation.replace("Tabs", { screen: "Home" })}
              color={Colors.buttonBackground}
              textColor={Colors.buttonText}
            />
            <Text style={[styles.welcomeTextBottom]}>
              Use VibeKey to Unlock the Energy Behind Your Mood
            </Text>
          </View>
        }
      />
    </GradientBackground>
  );
};
