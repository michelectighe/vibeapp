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
  InputAccessoryView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { quantumJournalPrompts } from "@data";
import { styles } from "./QuantumJournalScreen.styles";
import { useAmbientControlForScreen } from "@hooks";
import {
  GradientBackground,
  SectionLayout,
  CustomSpiritualButton,
  CloseX,
  KeyboardDone,
} from "@/components";
import { Colors } from "@/constants";
import { useAnalysis } from "@/context";
import { globalStyles } from "@/styles";
import { SCREEN_WIDTH } from "@/utils";
import { LinedTextInput } from "@/components";
import { saveJournalEntryDb, saveJournalEntryFs } from "@database";

export const QuantumJournalScreen = () => {
  const route = useRoute();
  useAmbientControlForScreen(true);
  const navigation = useNavigation();
  const [prompt, setPrompt] = useState("");
  const [entry, setEntry] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const [animatedText, setAnimatedText] = useState("");
  const [promptRequest, setPromptRequest] = useState(true);
  const [currentEntry, setCurrentEntry] = useState(route.params?.journalEntry || null);

  useEffect(() => {
    if (currentEntry) {
      setPromptRequest(false);
      console.log("currentEntry:", currentEntry);
      setPrompt(currentEntry.prompt);
      setEntry(currentEntry.entry);
      setIsTyping(false);
      setIsDirty(false);
    }
    return () => {};
  }, [currentEntry]);

  useEffect(() => {
    console.log("currentEntry for new:", currentEntry);
    if (!currentEntry && promptRequest) {
      const newPrompt =
        quantumJournalPrompts[Math.floor(Math.random() * quantumJournalPrompts.length)];
      console.log("newPrompt:", newPrompt);
      let i = 0;
      const interval = setInterval(() => {
        setAnimatedText(newPrompt.slice(0, i + 1));
        i++;
        if (i === newPrompt.length) {
          clearInterval(interval);
          setIsTyping(false);
          setSaved(false);
          setPrompt(newPrompt);
          setPromptRequest(false); // 👈 move it here
          setEntry("");
        }
      }, 60);

      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [promptRequest, currentEntry]);

  const handleSave = async () => {
    const createdAt = new Date().toISOString();
    const id = currentEntry?.id || createdAt; // or use uuid

    const newEntry = { id, prompt, entry, createdAt };

    try {
      await saveJournalEntryDb(newEntry);

      //  if (userIsLoggedIn()) {
      await saveJournalEntryFs(id, prompt, entry, createdAt);
      //  }

      setSaved(true);
      setIsDirty(false);
      console.log("✅ Journal entry saved locally and to Firestore!");
    } catch (err) {
      console.error("❌ Error saving journal entry:", err.message);
    }
  };

  const handleNewPrompt = () => {
    setCurrentEntry(null);
    setPromptRequest(true);
  };

  return (
    <GradientBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
        <SectionLayout
          topFlex={1}
          middleFlex={3}
          bottomFlex={2}
          topContent={
            <View style={styles.titleWrapper}>
              {(animatedText || prompt) && (
                <Text style={[styles.prompt, { color: Colors.textLight }]}>
                  {animatedText || prompt}
                </Text>
              )}
            </View>
          }
          middleContent={
            <View style={{ width: "90%", height: "80%", overflow: "hidden" }}>
              <KeyboardDone inputID="journalInputAccessory" />
              <LinedTextInput
                value={entry}
                onChangeText={(t) => {
                  setEntry(t);
                  setIsDirty(true);
                }}
                placeholder="Write whatever flows through..."
                placeholderTextColor={Colors.mediumGray}
                style={{ backgroundColor: Colors.surface, borderRadius: 12 }}
                textAlignVertical="top"
                textAlign="left"
                multiline={true}
                scrollEnabled={true}
                keyboardAppearance="dark"
                inputAccessoryViewID={"journalInputAccessory"}
              />
              {saved && !isDirty && <Text style={[styles.savedMessage]}>Journal Entry Saved</Text>}
            </View>
          }
          bottomContent={
            <>
              <View style={styles.bottomText}>
                <CustomSpiritualButton
                  isDirty={isDirty}
                  label="Save Entry"
                  onPress={handleSave}
                  color={Colors.surface}
                  textColor={Colors.textDark}
                />
                <CustomSpiritualButton
                  label="New Prompt"
                  onPress={handleNewPrompt}
                  color={Colors.surface}
                  textColor={Colors.textDark}
                />
              </View>
              <Text style={[styles.bottomNote, { color: Colors.textLight }]}>
                Your words shape your reality
              </Text>
            </>
          }
        />
      </TouchableWithoutFeedback>
      <CloseX xColor={Colors.textDark} onPress={() => navigation.goBack()} />
    </GradientBackground>
  );
};

