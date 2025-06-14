import React from "react";
import { Text, FlatList, TouchableOpacity, StyleSheet, View } from "react-native";
import { Colors } from "@constants";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "@/utils";
import { BlurView } from "@react-native-community/blur";
import { GradientBackground } from "./GradientBackground";
const CARD_WIDTH = SCREEN_WIDTH *.45;

export const BreathingPatternSelector = ({ patterns, selectedId, onSelect }) => {

  return (
    <FlatList 
      horizontal
      data={patterns}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + 12}
      renderItem={({ item }) => {
      //  console.log("color:", item.gradient);
        const isSelected = item.id === selectedId;
        return (
          <TouchableOpacity
            style={[styles.button, isSelected && styles.selectedCard]}
            onPress={() => onSelect(item)}
          >
            <GradientBackground colors={item.gradient}>
              {/* <BlurView
                style={[StyleSheet.absoluteFill, styles.card]}
                blurType="light"
                blurAmount={15}
                reducedTransparencyFallbackColor="rgba(255,255,255,0.2)"
              /> */}
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.timing}>
                {item.inhale}-{item.hold1}-{item.exhale}
                {item.hold2 ? `-${item.hold2}` : ""}
              </Text>
            </GradientBackground>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    paddingRight: 0,
 //   width: "100%",
  },
  button: {
    borderRadius: 20,
    marginRight: 12,
    overflow: "hidden",
    width: CARD_WIDTH,
    height: SCREEN_HEIGHT * 0.18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    backgroundColor: "transparent",
    alignContent: "center",
    alignItems: "center",
  },
  card: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.15)", // fallback for Android
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: Colors.white,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.white,
    textAlign: "center",
    marginTop: 30,
  },
  description: {
    fontSize: 14,
    color: Colors.white,
    textAlign: "center",
    marginVertical: 4,
    marginTop: 10,
  },
  timing: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.white,
    fontWeight: "500",
    textAlign: "center",
  },
});
