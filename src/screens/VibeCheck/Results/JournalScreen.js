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
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { quantumJournalPrompts } from "@data";
import { styles } from "./JournalScreen.styles";
import { useAmbientControlForScreen } from "@hooks";
import { GradientBackground, SectionLayout, CustomSpiritualButton, CloseX } from "@/components";
import { Colors } from "@/constants";
import { useAnalysis } from "@/context";
import { globalStyles } from "@/styles";

export const JournalScreen = () => {
  useAmbientControlForScreen(true);
  const navigation = useNavigation();
  const [prompt, setPrompt] = useState("");
  const [entry, setEntry] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [saved, setSaved] = useState(false);
  const [animatedText, setAnimatedText] = useState("");
  const [overallColor, setColor] = useState();
  const [overallColor2, setColor2] = useState();
  const [overallColor3, setColor3] = useState();
  const [overallColor4, setColor4] = useState();

  const { vibrationInfo } = useAnalysis();

  useEffect(() => {
    if (vibrationInfo == null) return;
    setColor(vibrationInfo.color);
    setColor2(vibrationInfo.color2);
    setColor3(vibrationInfo.color3);
    setColor4(vibrationInfo.color4);
  }, [vibrationInfo]); // eslint-disable-line react-hooks/exhaustive-deps

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
        setSaved(false);
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
    setSaved(true);
  };

  // 👇 Prevent UI rendering until all required data is ready
  if (!overallColor) {
    return (
      <GradientBackground colors={[Colors.white, Colors.white, Colors.white]}>
        <View style={[globalStyles.centered, { flex: 1 }]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </GradientBackground>
    );
  }
  return (
    <GradientBackground colors={[overallColor, overallColor2, overallColor3]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={0}
          style={{ flex: 1 }}
        >
          <SectionLayout
            topFlex={3}
            middleFlex={13}
            bottomFlex={0}
            topContent={
              <View style={styles.titleWrapper}>
                <Text style={[styles.title, { color: overallColor4 }]}>Daily Journal</Text>{" "}
                <Text style={[styles.prompt, { color: overallColor4 }]}>{animatedText}</Text>
              </View>
            }
            middleContent={
              <View style={{ width: "90%", overflow: "hidden" }}>
                <ScrollView
                  style={{ marginTop: 20, minWidth: "90%" }}
                  contentContainerStyle={{ paddingBottom: 40 }}
                  showsVerticalScrollIndicator={false}
                >
                  <TextInput
                    multiline
                    placeholder="Write whatever flows through..."
                    placeholderTextColor={Colors.mediumGray}
                    style={styles.textInput}
                    value={entry}
                    onChangeText={setEntry}
                  />

                  <CustomSpiritualButton
                    label="Save Entry"
                    onPress={handleSave}
                    color={overallColor2}
                    textColor={overallColor4}
                  />
                  <View style={styles.bottomText}>
                    <Text style={[styles.bottomNote, { color: overallColor4 }]}>
                      Your words shape your reality
                    </Text>
                  </View>
                </ScrollView>
                {saved && (
                  <Text style={[styles.savedMessage, { color: overallColor4 }]}>
                    Journal Entry Saved
                  </Text>
                )}
              </View>
            }
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <CloseX xColor={overallColor4} onPress={() => navigation.goBack()} />
    </GradientBackground>
  );
};
