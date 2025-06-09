// components/BannerMessage.js
import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet, View } from "react-native";
import { Colors } from "@/constants";
import { SCREEN_HEIGHT } from "@/utils";

export const BannerMessage = ({ message, visible }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -100,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.banner,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 0,
    width: "100%",
    padding: 12,
    backgroundColor: Colors.buttonBackground,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
   // height: SCREEN_HEIGHT * .2,
  },
  text: {
    color: Colors.textDark,
    fontWeight: "600",
  },
});
