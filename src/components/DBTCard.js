import React from "react";
import {  Text, View,  TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons"; // or any icon set
import { Colors, Fonts } from "@/constants";
import { CardGradient } from "./CardGradient";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";

export const DBTCard = ({ skill, onPress , gradientColors}) => {
  return (
    <CardGradient colors={gradientColors} style={{ borderWidth: 1, borderColor: Colors.white }}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Feather name={skill.icon} size={28} color="white" style={styles.icon} />
        <View style={styles.infoText}>
          <Text style={styles.title}>{skill.title}</Text>
          <Text style={styles.teaser}>{skill.teaser}</Text>
        </View>
      </TouchableOpacity>
    </CardGradient>
  );
};

 const styles = StyleSheet.create({
   card: {
     backgroundColor: Colors.cardBg,
     padding: 16,
     borderRadius: 16,
     marginBottom: 50,
     width: SCREEN_WIDTH * 0.45,
     height: SCREEN_HEIGHT * 0.2,
     justifyContent: "center",
     shadowColor: "#000",
     shadowOpacity: 0.1,
     shadowRadius: 6,
     elevation: 3,
   },
   icon: {
     position: "absolute",
     top: 20,
     left: 20,
   },
   infoText: {
     position: "absolute",
     top: "50%",
     left: 20,
   },
   title: {
     fontFamily: Fonts.bold,
     fontSize: 20,
     color: Colors.white,
     marginBottom: 10,
   },
   teaser: {
     fontFamily: Fonts.body,
     fontSize: 16,
     color: Colors.white,
     marginTop: 4,
   },
 });