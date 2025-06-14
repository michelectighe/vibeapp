import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import * as Haptics from "expo-haptics";

export const FlipDrawer = () => {
  const [open, setOpen] = useState(false);
  const [points, setPoints] = useState("0,0 200,0 200,60 0,60");

  const shapeAnim = useRef(new Animated.Value(0)).current;

  const toggleDrawer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Animated.timing(shapeAnim, {
      toValue: open ? 0 : 1,
      duration: 1500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();

    setOpen(!open);
  };

  useEffect(() => {
    const id = shapeAnim.addListener(({ value }) => {
    //   const topLeft = 0 + 10 * value;
    //   const topRight = 200 - 10 * value;
    //   const bottomRight = 200 - 30 * value;
    //   const bottomLeft = 0 + 30 * value;

      const topLeft = 0  * value; // move outward left
      const topRight = 200 +5 * value; // move outward right
      const bottomRight = 200 - 30 * value; // expand base right
      const bottomLeft = 0 + 30 * value; // expand base left

      const newPoints = `${topLeft},0 ${topRight},0 ${bottomRight},60 ${bottomLeft},60`;
      setPoints(newPoints);
    });

    return () => {
      shapeAnim.removeListener(id);
    };
  }, [shapeAnim]);

  // Animate paper
const paperTranslate = shapeAnim.interpolate({
  inputRange: [0, 1],
  outputRange: [20, -70], // NEW: rise higher
});


  const paperOpacity = shapeAnim;

  return (
    <View style={styles.drawerContainer}>
      {/* Paper floats above */}
      <Animated.View
        style={[
          styles.paper,
          {
            opacity: paperOpacity,
            transform: [{ translateY: paperTranslate }],
          },
        ]}
      >
        <Text style={styles.text}>I am worthy of love, peace, and healing.</Text>
      </Animated.View>

      {/* Trapezoid Drawer */}
      <View style={styles.drawerWrapper}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Svg width={200} height={60}>
            <Polygon fill="#ccc" stroke="#aaa" strokeWidth={1} points={points} />
          </Svg>

          {/* Centered knob */}
          <View style={styles.knobWrapper}>
            <View style={styles.knob} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100,
  },
  drawerWrapper: {
    width: 200,
    alignItems: "center",
    position: "relative",
  },
  knobWrapper: {
    position: "absolute",
    bottom: 8,
    left: 90, // center of 200 width - half of knob size (20)
    zIndex: 2,
  },
  knob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#888",
  },
  paper: {
    position: "absolute",
    bottom: 80, // float it higher now
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    maxWidth: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
});
