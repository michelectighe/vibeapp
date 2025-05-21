import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants";

export const TabBarIcon = ({ name, size, color, focused }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: focused ? 1.2 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  useEffect(() => {
    if (focused) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.9,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [focused]);

  return (
    <Animated.View
      style={{ transform: [{ scale: scaleAnim }], alignItems: "center", justifyContent: "center" }}
    >
      {focused && (
        <Animated.View
          style={[
            styles.pulseCircle,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseAnim.interpolate({
                inputRange: [1, 1.4],
                outputRange: [0.3, 0],
              }),
            },
          ]}
        />
      )}
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  pulseCircle: {
    position: "absolute",
    width: 48,
    height: 48,
    top: -5,
    borderRadius: 24,
    backgroundColor: Colors.activeTab,
    zIndex: -1,
  },
});
