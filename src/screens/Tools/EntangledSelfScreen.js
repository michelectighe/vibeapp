// screens/EntangledSelfScreen.js
import React, { useRef, useEffect } from "react";
import { View, Text, Animated, Easing, TouchableOpacity } from "react-native";
import { styles } from "./EntangledSelfScreen.styles";
import { globalStyles } from "@styles";
import { useAmbientControlForScreen } from "@hooks";

export const EntangledSelfScreen = () => {
  useAmbientControlForScreen(true);
  const orb1 = useRef(new Animated.ValueXY({ x: -80, y: 0 })).current;
  const orb2 = useRef(new Animated.ValueXY({ x: 80, y: 0 })).current;

  useEffect(() => {
    const animateOrbs = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(orb1, {
              toValue: { x: -20, y: 0 },
              duration: 2000,
              useNativeDriver: false,
              easing: Easing.inOut(Easing.sin),
            }),
            Animated.timing(orb2, {
              toValue: { x: 20, y: 0 },
              duration: 2000,
              useNativeDriver: false,
              easing: Easing.inOut(Easing.sin),
            }),
          ]),
          Animated.parallel([
            Animated.timing(orb1, {
              toValue: { x: -80, y: 0 },
              duration: 2000,
              useNativeDriver: false,
              easing: Easing.inOut(Easing.sin),
            }),
            Animated.timing(orb2, {
              toValue: { x: 80, y: 0 },
              duration: 2000,
              useNativeDriver: false,
              easing: Easing.inOut(Easing.sin),
            }),
          ]),
        ]),
      ).start();
    };
    animateOrbs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Entangled Self</Text>
      <Text style={styles.subtitle}>You are not alone. You never were.</Text>

      <View style={styles.visualArea}>
        <Animated.View style={[styles.orb, orb1.getLayout()]} />
        <Animated.View style={[styles.orb, orb2.getLayout()]} />
      </View>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueText}>I feel the connection</Text>
      </TouchableOpacity>
    </View>
  );
};
