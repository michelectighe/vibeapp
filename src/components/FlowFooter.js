import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@constants";

export const FlowFooter = ({ onNext, onBack, isLastScreen = false, nextLabel = "Next" }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onNext} style={styles.button}>
        <Text style={styles.buttonText}>{isLastScreen ? "Finish" : nextLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.buttonBackground,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.lightText,
    fontWeight: "bold",
    fontSize: 16,
  },
});
