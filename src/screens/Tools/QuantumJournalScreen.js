// screens/QuantumJournalScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { quantumJournalPrompts } from "@data";
import { styles } from "./QuantumJournalScreen.styles";
import { useAmbientControlForScreen } from "@hooks";

export const QuantumJournalScreen = () => {
  useAmbientControlForScreen(true);
  const [prompt, setPrompt] = useState("");
  const [entry, setEntry] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [animatedText, setAnimatedText] = useState("");

  useEffect(() => {
    const newPrompt =
      quantumJournalPrompts[
        Math.floor(Math.random() * quantumJournalPrompts.length)
      ];
    let i = 0;
    const interval = setInterval(() => {
      setAnimatedText(newPrompt.slice(0, i + 1));
      i++;
      if (i === newPrompt.length) {
        clearInterval(interval);
        setIsTyping(false);
        setPrompt(newPrompt);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const handleSave = () => {
    // Save logic to Firestore or AsyncStorage
    console.log("Saved:", { prompt, entry });
    setEntry("");
    setPrompt("");
    setAnimatedText("");
    setIsTyping(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quantum Journal</Text>
      <Text style={styles.prompt}>{animatedText}</Text>

      {!isTyping && (
        <ScrollView style={styles.inputContainer}>
          <TextInput
            multiline
            placeholder="Write whatever flows through..."
            placeholderTextColor="#888"
            style={styles.textInput}
            value={entry}
            onChangeText={setEntry}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save Entry</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};
