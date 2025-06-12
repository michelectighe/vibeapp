import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Fonts } from "@/constants";

const FONT_SIZE = 16;
const LINE_HEIGHT = 28;
const NUM_LINES = Math.floor(200 / LINE_HEIGHT); // You can also make this dynamic

export const LinedTextInput = ({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  style,
  textInputStyle,
  ...rest
}) => {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: NUM_LINES }).map((_, i) => (
        <View key={i} style={[styles.line, { top: i * LINE_HEIGHT + LINE_HEIGHT - 1 }]} />
      ))}

      <TextInput
        multiline
        style={[
          StyleSheet.absoluteFill,
          styles.textInput,
          {
            fontSize: FONT_SIZE,
            lineHeight: LINE_HEIGHT,
          },
          textInputStyle, // 🔥 allow prop override for direct TextInput styling
        ]}
        textAlign="left"
        textAlignVertical="top"
        includeFontPadding={false}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    height: 200,
    position: "relative",
    backgroundColor: "transparent",
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  textInput: {
    paddingHorizontal: 12,
    paddingTop: 12,
    color: "#000",
    fontFamily: Fonts.journal,
    textAlign: "left", // avoids right-alignment on RTL devices
    textAlignVertical: "top",
  },
});

