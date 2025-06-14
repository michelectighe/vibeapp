import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Platform } from "react-native";
import * as Haptics from "expo-haptics"; // or use react-native-haptic-feedback if not on Expo

export const MirrorAffirmationDrawer = () => {
  const [open, setOpen] = useState(false);
  const paperAnim = useRef(new Animated.Value(0)).current;
  const drawerAnim = useRef(new Animated.Value(0)).current;

  const toggleDrawer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Animated.parallel([
      Animated.timing(drawerAnim, {
        toValue: open ? 0 : 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(paperAnim, {
        toValue: open ? 0 : 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();

    setOpen(!open);
  };

  const drawerTranslate = drawerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const paperTranslate = paperAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });

  const paperOpacity = paperAnim;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.drawer, { transform: [{ translateY: drawerTranslate }] }]}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.knob} />
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
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    paddingBottom: 100,
  },
  drawer: {
    width: 280,
    height: 80,
    backgroundColor: "#ddd",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    position: "relative",
  },
  knob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#aaa",
    position: "absolute",
    top: "15%",
  },
  paper: {
    position: "absolute",
    top: -60,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
});
