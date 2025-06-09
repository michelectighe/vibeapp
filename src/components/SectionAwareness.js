// AwarenessTrackerSection.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@constants";
import { InteractiveCard } from "@components";
import promptsData from "@assets/data/awareness_prompts.json"; // move the JSON file here
import { getRandomItem , hexToRgba} from "@utils";


export const SectionAwareness = () => {
  const [prompt, setPrompt] = useState(null);
  const [response, setResponse] = useState(null);
  const [shouldShow, setShowButtons] = useState(true);

  useEffect(() => {
    // Pick a random prompt each time this section mounts
    const randomPrompt = getRandomItem(promptsData);
    setResponse(null);
    setPrompt(randomPrompt);
  }, []);

  const handleResponse = (choice) => {
    setResponse(choice);
    setShowButtons(false);
    // TODO: save choice to local storage or backend if desired
  };

  const renderReflection = () => {
    if (!prompt || !response) return null;
    return <Text style={styles.reflectionText}>{prompt.reflections[response]}</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Awareness Check-In</Text>
      {prompt && (
        <InteractiveCard
          title={prompt.prompt}
          subtitle={response ? "" : "Tap to reflect"}
          bgColor={hexToRgba(Colors.buttonBackground, .5)}
          textColor={Colors.buttonText}
          showButtons={shouldShow}
        >
          {!response && (
            <View style={styles.buttonsContainer}>
              {[
                { label: "✅ Yes", value: "yes" },
                { label: "🤔 Kind of", value: "maybe" },
                { label: "❌ Not really", value: "no" },
                { label: "💭 Not sure", value: "unsure" },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleResponse(option.value)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {renderReflection()}
        </InteractiveCard>
      )}
            {/* Divider always shown */}
            <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 2,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.cardText,
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.buttonBackground,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    width: "45%",
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 14,
  },
  reflectionText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "700",
    color: Colors.cardText,
    fontStyle: "italic",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)", // soft white line, adjust for dark background
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 0.5,
  },
});
