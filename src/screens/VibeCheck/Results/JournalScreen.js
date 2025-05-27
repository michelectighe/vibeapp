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
import { useNavigation } from "@react-navigation/native";
import { quantumJournalPrompts } from "@data";
import { styles } from "./JournalScreen.styles";
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
  const [promptRequest, setPromptRequest] = useState(true);

  const { vibrationInfo } = useAnalysis();

  useEffect(() => {
    if (vibrationInfo == null) return;
    setColor(vibrationInfo.color);
    setColor2(vibrationInfo.color2);
    setColor3(vibrationInfo.color3);
    setColor4(vibrationInfo.color4);
    setPromptRequest(true);
  }, [vibrationInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log("promptRequest", promptRequest);
    if (!promptRequest) return;
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
    return () => clearInterval(interval);
  }, [promptRequest]);

  const handleSave = async () => {
    const createdAt = new Date().toISOString();
    const id = createdAt; // or use uuid

    const newEntry = { id, prompt, entry, createdAt };

    try {
      await saveJournalEntryDb(newEntry);

    //  if (userIsLoggedIn()) {
        await saveJournalEntryFs(prompt, entry, createdAt);
    //  }

      setSaved(true);
      console.log("✅ Journal entry saved locally and to Firestore!");
    } catch (err) {
      console.error("❌ Error saving journal entry:", err.message);
    }
  };

  const handleNewPrompt = () => {
    // setEntry("");
    setPromptRequest(true);
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
    <GradientBackground
      colors={[overallColor4, overallColor, overallColor2, overallColor3, overallColor4]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
        <SectionLayout
          topFlex={1}
          middleFlex={3}
          bottomFlex={2}
          topContent={
            <View style={styles.titleWrapper}>
              {(animatedText || prompt) && (
                <Text style={[styles.prompt, { color: overallColor4 }]}>
                  {animatedText || prompt}
                </Text>
              )}
            </View>
          }
          middleContent={
            <View style={{ width: "90%", overflow: "hidden" }}>
              <KeyboardDone inputID="journalInputAccessory" />
              <LinedTextInput
                value={entry}
                onChangeText={setEntry}
                placeholder="Write whatever flows through..."
                placeholderTextColor={Colors.mediumGray}
                style={{ backgroundColor: overallColor4, borderRadius: 12 }}
                textAlignVertical="top"
                textAlign="left"
                multiline={true}
                scrollEnabled={true}
                keyboardAppearance="dark"
                inputAccessoryViewID={"journalInputAccessory"}
              />
            </View>
          }
          bottomContent={
            <>
              <View style={styles.bottomText}>
                {saved && (
                  <Text style={[styles.savedMessage, { color: overallColor4 }]}>
                    Journal Entry Saved
                  </Text>
                )}
                <CustomSpiritualButton
                  label="Save Entry"
                  onPress={handleSave}
                  color={overallColor2}
                  textColor={overallColor3}
                />
                <CustomSpiritualButton
                  label="New Prompt"
                  onPress={handleNewPrompt}
                  color={overallColor2}
                  textColor={overallColor3}
                />
              </View>
              <Text style={[styles.bottomNote, { color: overallColor4 }]}>
                Your words shape your reality
              </Text>
            </>
          }
        />
      </TouchableWithoutFeedback>
      <CloseX xColor={overallColor4} onPress={() => navigation.goBack()} />
    </GradientBackground>
  );
};
