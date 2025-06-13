// SwipeHintDots.js
import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

export const SwipeHintDots = ({ bottom = -10, right =20, dotColor = "white" }) => {
  const fadeAnims = [
    useRef(new Animated.Value(0.2)).current,
    useRef(new Animated.Value(0.2)).current,
    useRef(new Animated.Value(0.2)).current,
  ];

  useEffect(() => {
    const animateDot = (index) =>
      Animated.sequence([
        Animated.timing(fadeAnims[index], {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnims[index], {
          toValue: 0.2,
          duration: 400,
          useNativeDriver: true,
        }),
      ]);

    const loop = Animated.loop(
      Animated.stagger(
        200,
        fadeAnims.map((_, i) => animateDot(i)),
      ),
    );

    loop.start();

    // Stop after 3 loops
    const timeout = setTimeout(() => loop.stop(), 3600);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={[styles.container, { bottom, right }]}>
      {fadeAnims.map((anim, i) => (
        <Animated.View
          key={i}
          style={[styles.dot, { backgroundColor: dotColor, opacity: anim, marginLeft: i === 0 ? 0 : 6 }]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    zIndex: 10,
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
