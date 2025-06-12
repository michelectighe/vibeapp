import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@constants";
import promptsData from "@assets/data/awareness_prompts.json";
import { getRandomItem, hexToRgba } from "@utils";
import { GlowingDivider } from "./GlowingDivider";
import { CardGradient } from "./CardGradient";

export const SectionAwareness = () => {
  const [prompt, setPrompt] = useState(null);
  const [response, setResponse] = useState(null);
  const [shouldShow, setShowButtons] = useState(true);

  useEffect(() => {
    const randomPrompt = getRandomItem(promptsData);
    setResponse(null);
    setPrompt(randomPrompt);
  }, []);

  const handleResponse = (choice) => {
    setResponse(choice);
    setShowButtons(false);
  };

  const renderReflection = () => {
    if (!prompt || !response) return null;
    return <Text style={styles.reflectionText}>{prompt.reflections[response]}</Text>;
  };

  return (
    <View style={styles.container}>
      {prompt && (
        <CardGradient style={styles.gradient}>
          <Text style={styles.title}>Daily Awareness Check-In</Text>
          <View style={styles.card}>
            <Text style={styles.promptText}>{prompt.prompt}</Text>
            <Text style={styles.subtitleText}>{!response && "Tap to reflect"}</Text>

            {shouldShow && (
              <View style={styles.buttonsContainer}>
                {[
                  { emoji: "😊", label: "Yes", value: "yes" },
                  { emoji: "😐", label: "Kind of", value: "maybe" },
                  { emoji: "🙁", label: "Not really", value: "no" },
                  { emoji: "🤔", label: "Not sure", value: "unsure" },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleResponse(option.value)}
                    style={styles.button}
                  >
                    <Text style={styles.buttonEmoji}>{option.emoji}</Text>
                    <Text style={styles.buttonLabel}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {!shouldShow && renderReflection()}
          </View>
        </CardGradient>
      )}

      <GlowingDivider height={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  gradient: {
    borderWidth: .7,
    borderColor: Colors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.buttonText,
    marginTop: 12,
    textAlign: "center",
    //  marginBottom: 12,
  },
  card: {
    backgroundColor: "transparent",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  promptText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.buttonText,
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 13,
    fontWeight: "300",
    color: Colors.buttonText,
    marginTop: 13,
    marginBottom: 13,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: hexToRgba(Colors.buttonBackground, 0.9),
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 6,
    width: "22%",
    aspectRatio: 1, // keeps square shape
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonEmoji: {
    fontSize: 28,
    marginBottom: 2,
  },

  buttonLabel: {
    fontSize: 13,
    color: Colors.buttonText,
    fontWeight: "500",
    textAlign: "center",
  },
  reflectionText: {
    marginTop: 16,
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "600",
    color: Colors.buttonText,
  },
});
