import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Fonts, Colors } from "@/constants";
import { Badge } from "./Badge";
import { SCREEN_WIDTH, SCREEN_HEIGHT, hexToRgba } from "@/utils";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "@react-native-community/blur";
import { CardGradient } from "./CardGradient";


export const HomeHeaderCard = ({ name = "friend" }) => {
  const tabBarHeight = useBottomTabBarHeight();
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    // <CardGradient>
    <View style={[styles.container, { backgroundColor: "transparent", height: 70,  }]}>
      <View style={styles.divider} />
      <Text style={styles.greeting}>
        {getGreeting()}, {name}
      </Text>
      {/* <Text style={styles.subtitle}>Your vibe today is just a tap away.</Text> */}
      <View style={styles.divider} />
    </View>
    // </CardGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 4,
    // marginTop: 130,
    borderRadius: 15,
    shadowColor: Colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 12,
    zIndex: 10,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    marginBottom: 30,
  },
  greeting: {
    fontSize: 22,
    fontFamily: Fonts.title,
    color: Colors.white,
    textAlign: "center",
    shadowColor: Colors.black,
    textShadowRadius: 2,
    textShadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)", // soft white line, adjust for dark background
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 16,
    borderRadius: 0.5,
  },
});
