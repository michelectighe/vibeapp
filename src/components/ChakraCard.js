import React, { useRef, useEffect} from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
} from "react-native";
import { StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { scaledStyle } from "@utils";
import { FuzzyGlow } from "./FuzzyGlow";


export const ChakraCard = ({ chakra, onPress }) => {
  const glowSize = chakra.score * 1.5 + 30;

  // Optional: entry animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
        <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY }],
        marginVertical: 10,
        alignItems: "center",
      }}
    >
    <Pressable onPress={onPress}>
      <View style={[styles.card, { width: SCREEN_WIDTH / 2 }]}>
        <View style={styles.fuzzyGlowStyle}>
          <FuzzyGlow glowSize={glowSize * 0.9} glowColor={chakra.color} />
        </View>
        <View style={styles.textOverlay}>
          <Text style={[styles.name, { color: Colors.textLight}]}>{chakra.name} - {chakra.score}</Text>

        </View>
        {/* <Text style={styles.meaning}>{chakra.meaning}</Text> */}
      </View>
    </Pressable>
    </Animated.View>
  );
};

const rawStyles = {
  card: {
    height: SCREEN_HEIGHT * 0.2,
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 7,
 //   overflow: "hidden",
    //   position: "relative",
    backgroundColor: "transparent",
  },
  fuzzyGlowStyle: {
    Position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  //  backgroundColor: "rgba(255, 255, 255, 0.85)",
  },
  textOverlay: {
    position: "absolute",
    bottom: -10,
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  name: {
    fontSize: 20,
  //  fontWeight: "bold",
    marginBottom: 4,
    fontFamily: Fonts.body,
  },
};

  export const styles = StyleSheet.create(scaledStyle(rawStyles));