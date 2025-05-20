// screens/QuantumJournalScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { quantumJournalPrompts } from "@data";
import { styles } from "./QuantumJournalScreen.styles";
import { useAmbientControlForScreen } from "@hooks";
import { GradientBackground, SectionLayout, CustomSpiritualButton, CloseX } from "@/components";
import { Colors } from "@/constants";
import { globalStyles } from "@/styles";

export const QuantumJournalScreen = () => {
  useAmbientControlForScreen(true);
  const navigation = useNavigation();
  const [prompt, setPrompt] = useState("");
  const [entry, setEntry] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [animatedText, setAnimatedText] = useState("");

  useEffect(() => {
    const newPrompt =
      quantumJournalPrompts[Math.floor(Math.random() * quantumJournalPrompts.length)];
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
    //console.log("Saved:", { prompt, entry });
   // setEntry("");
  //  setPrompt("");
    setAnimatedText("");
    setIsTyping(true);
  };

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <SectionLayout
        topFlex={6}
        middleFlex={12}
        bottomFlex={1}
        topContent={
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Quantum Journal</Text>{" "}
            <Text style={styles.prompt}>{animatedText}</Text>
          </View>
        }
        middleContent={
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={0} // tweak if needed for your layout
            >
              <View style={{ width: "90%", overflow: "hidden" }}>
                {!isTyping && (
                  <ScrollView
                    style={{ marginTop: 20, minWidth: "90%" }}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                  >
                    <TextInput
                      multiline
                      placeholder="Write whatever flows through..."
                      placeholderTextColor={Colors.backgroundSpirit}
                      style={styles.textInput}
                      value={entry}
                      onChangeText={setEntry}
                    />

                    <CustomSpiritualButton
                      label="Save Entry"
                      onPress={handleSave}
                      color={Colors.buttonBackground}
                      textColor={Colors.textLight}
                    />
                  </ScrollView>
                )}
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        }
        bottomContent={
          <View style={styles.bottomText}>
            <Text style={styles.text}>Your words shape your reality</Text>
          </View>
        }
      />
      <CloseX xColor={Colors.textDark} onPress={() => navigation.goBack()} />
    </GradientBackground>
  );
};
