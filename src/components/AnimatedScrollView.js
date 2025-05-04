import React, { useRef, useCallback } from "react";
import { Animated, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export const AnimatedHorizontalScroll = ({ children, style, ...props }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useFocusEffect(
    useCallback(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, [])
  );

  return (
    <Animated.View style={[{ transform: [{ translateX: slideAnim }] }, style]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} {...props}>
        {children}
      </ScrollView>
    </Animated.View>
  );
};

export const AnimatedVerticalScroll = ({ children, style, ...props }) => {
  const slideAnim = useRef(new Animated.Value(100)).current;

  useFocusEffect(
    useCallback(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, [])
  );

  return (
    <Animated.View style={[{ transform: [{ translateY: slideAnim }] }, style]}>
      <ScrollView showsVerticalScrollIndicator={false} {...props}>
        {children}
      </ScrollView>
    </Animated.View>
  );
};
