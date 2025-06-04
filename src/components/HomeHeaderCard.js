import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Fonts, Colors } from "@/constants";
import { Badge } from "./Badge";

export const HomeHeaderCard = ({ name = "friend" , newMatchesCount = 0}) => {

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};


  return (
    <View style={styles.container}>
      <Badge value={newMatchesCount} />
      <Text style={styles.greeting}>
        {getGreeting()}, {name}
      </Text>
      <Text style={styles.subtitle}>Your vibe today is just a tap away.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    margin: 16,
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  greeting: {
    fontSize: 24,
    fontFamily: Fonts.title,
    color: Colors.textDark,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
    fontFamily: Fonts.body,
    color: Colors.textMedium,
    textAlign: "center",
  },
});
