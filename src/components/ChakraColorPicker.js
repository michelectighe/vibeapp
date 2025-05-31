import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { FuzzyGlow } from "@/components/FuzzyGlow";
import { Colors } from "@/constants";
import { hexToRgba } from "@/utils";

const chakraColors = [
  { name: "default", color: hexToRgba(Colors.paleYellow), textColor: "black" },
  { name: "Root", color: hexToRgba(Colors.rootChakra), textColor: "white" },
  { name: "Sacral", color: hexToRgba(Colors.sacralChakra), textColor: "white" },
  { name: "Solar Plexus", color: hexToRgba(Colors.solarPlexusChakra), textColor: "black" },
  { name: "Heart", color: hexToRgba(Colors.heartChakra), textColor: "black" },
  { name: "Throat", color: hexToRgba(Colors.throatChakra), textColor: "white" },
  { name: "Third Eye", color: hexToRgba(Colors.thirdEyeChakra), textColor: "white" },
  { name: "Crown", color: hexToRgba(Colors.crownChakra), textColor: "black" },
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
    backgroundColor: Colors.surface,
  },
  glowWrapper: {
    borderRadius: 20,
    padding: 4,
  },
  selected: {
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
  },
});
