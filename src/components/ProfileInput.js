// components/ProfileInput.js
import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import { scaledStyle } from "@/utils";

export const ProfileInput = ({
  label,
  value,
  onChangeText,
  secure = false,
  error = "",
  autoComplete = "off",
  keyboardType = "default",
}) => (
  <View>
    <TextInput
      style={styles.input}
      placeholder={label}
      placeholderTextColor="#999"
      secureTextEntry={secure}
      value={value}
      onChangeText={onChangeText}
      autoComplete={autoComplete}
      keyboardType={keyboardType}
      autoCapitalize="none"
    />
    {!!error && (
      <Text style={{ color: "#ccc", marginLeft: 15, marginBottom: 8 }}>
        {error}
      </Text>
    )}
  </View>
);

const rawStyles = {
  input: {
    width: "100%",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
    //   textAlignVertical: "top",
  },
};
const styles = StyleSheet.create(scaledStyle(rawStyles));
