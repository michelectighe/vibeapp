import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { FuzzyGlow } from "@/components/FuzzyGlow";
import { Colors } from "@/constants";

const chakraColors = [
  { name: "Root", color: Colors.rootChakra, textColor: "white" },
  { name: "Sacral", color: Colors.sacralChakra, textColor: "white" },
  { name: "Solar Plexus", color: Colors.solarPlexusChakra, textColor: "black" },
  { name: "Heart", color: Colors.heartChakra, textColor: "black" },
  { name: "Throat", color: Colors.throatChakra, textColor: "white" },
  { name: "Third Eye", color: Colors.thirdEyeChakra, textColor: "white"},
  { name: "Crown", color: Colors.crownChakra, textColor: "black" },
];

export const ChakraColorPicker = ({ onColorSelect, selectedColor }) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      {chakraColors.map(({ name, color, textColor }) => {
    //    console.log("name:", name)
     //   console.log("textColor:", textColor)
        const isSelected = selectedColor === color;

        return (
          <TouchableOpacity
            key={name}
            style={[styles.glowWrapper, isSelected && styles.selected]}
            onPress={() => onColorSelect(color, textColor)}
          >
            <FuzzyGlow glowColor={color} glowSize={40} pulse={isSelected} />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    gap: 12,
    alignItems: "center",
    backgroundColor: "white",
  },
  glowWrapper: {
    borderRadius: 20,
    padding: 4,
  },
  selected: {
    borderWidth: 2,
    borderColor: "#fff",
  },
});
