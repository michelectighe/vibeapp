import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Fonts, Colors } from "@/constants";
import { Badge } from "./Badge";
import { SCREEN_WIDTH , hexToRgba} from "@/utils";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { CardGradient } from "./CardGradient";

export const HomeFooterCard = ({ name = "friend" , newMatchesCount = 0}) => {
  const tabBarHeight = useBottomTabBarHeight();
const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};


  return (

      <View style={[styles.container, { height: tabBarHeight + 40 }]}>
        <CardGradient>
          <Text style={styles.greeting}>
            {getGreeting()}, {name}
          </Text>
          {/* <Text style={styles.subtitle}>Your vibe today is just a tap away.</Text> */}
        </CardGradient>
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
    paddingBottom: 50,
    marginBottom: 0,
    padding: 4,
  //  borderRadius: 15,
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    zIndex: 10,
    width: SCREEN_WIDTH,

  },
  greeting: {
    fontSize: 18,
    fontFamily: Fonts.title,
    color: Colors.cardText,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
    fontFamily: Fonts.body,
    color: Colors.cardText,
    textAlign: "center",
  },
});
