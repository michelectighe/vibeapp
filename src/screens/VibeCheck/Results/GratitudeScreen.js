import React, { useState, useEffect } from "react";
import { View, Text, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAmbientControlForScreen } from "@hooks";
import {
  GradientBackground,
  SectionLayout,
  CustomSpiritualButton,
  CloseX,
  KeyboardDone,
} from "@/components";
import { Colors } from "@/constants";
import { globalStyles } from "@/styles";
import { SCREEN_WIDTH, hexToRgba } from "@/utils";
import { LinedTextInput } from "@/components";
import {
  saveJournalEntryDb,
  saveJournalEntryFs,
  getJournalEntryByIdFs,
  //getJournalEntryByIdDb,
  updateJournalResultDb,
} from "@database";
import { useAnalysis } from "@/context";
import { styles } from "./GratitudeScreen.styles";

export const GratitudeScreen = () => {
  useAmbientControlForScreen(true);
  const { vibrationInfo, resultId, journalId /*setJournalId*/ } = useAnalysis();
  const navigation = useNavigation();
  const [gratitude, setGratitude] = useState("");
  const [kindness, setKindness] = useState("");
  const [saved, setSaved] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [currentJournalId, setCurrentJournalId] = useState(journalId || null);
  const [currentEntry, setCurrentEntry] = useState(null);

  const [overallColor, setColor] = useState(vibrationInfo?.color);
  const [overallColor2, setColor2] = useState(vibrationInfo?.color2);
  const [overallColor3, setColor3] = useState(vibrationInfo?.color3);
  const [overallColor4, setColor4] = useState(vibrationInfo?.color4);
  useEffect(() => {
    if (vibrationInfo == null) return;
    setColor(vibrationInfo.color);
    setColor2(vibrationInfo.color2);
    setColor3(vibrationInfo.color3);
    setColor4(vibrationInfo.color4);
    //  setPromptRequest(true);
  }, [vibrationInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    try {
      const getExisting = async () => {
        //console.log("do we have the current journal id?:", currentJournalId);
        if (!currentJournalId || currentJournalId === 0) {
          //console.log("go ahead and get a new prompt");
          return;
        }
        const journalEntry = await getJournalEntryByIdFs(journalId);
        //console.log("GOT CURRENT ENTRY:", journalEntry);
        setCurrentEntry(journalEntry);
        if (journalEntry) {
          setGratitude(journalEntry.gratitude);
          setKindness(journalEntry.kindness);
          setIsDirty(false);
        }
      };
      getExisting();
    } catch (e) {
      console.error("error getting existing journal entry:", e);
    }
  }, [currentJournalId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async () => {
    const createdAt = new Date();
    const id = currentEntry?.id || createdAt.toISOString(); // or use uuid
    const fullEntry = {
      id,
      prompt: "Gratitude + Kindness",
      entry: "",
      gratitude,
      kindness,
      createdAt,
    };

    try {
      await saveJournalEntryDb(fullEntry);
      await saveJournalEntryFs(
        fullEntry.id,
        fullEntry.prompt,
        fullEntry.entry,
        fullEntry.gratitude,
        fullEntry.kindness,
        fullEntry.createdAt,
      );

      if (!currentEntry) await updateJournalResultDb({ journalId: fullEntry.id, resultId });

      setSaved(true);
      setCurrentEntry(fullEntry);
      setIsDirty(false);
      //console.log("✅ Gratitude entry saved.");
    } catch (err) {
      console.error("❌ Error saving gratitude entry:", err.message);
    }
  };

  if (!overallColor) {
    return (
      <GradientBackground>
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
          topFlex={0.5}
          middleFlex={3}
          bottomFlex={1.2}
          topContent={
            <View style={styles.titleWrapper}>
              <Text style={[styles.prompt, { color: overallColor4 }]}>Gratitude Practice</Text>
            </View>
          }
          middleContent={
            <View style={{ width: "90%", height: "100%", overflow: "hidden" }}>
              <KeyboardDone inputID="gratitudeInput" />
              <LinedTextInput
                value={gratitude}
                onChangeText={(text) => {
                  setGratitude(text);
                  setIsDirty(true);
                }}
                placeholder="What's one thing you're grateful for today?"
                placeholderTextColor={hexToRgba(overallColor3, 0.3)}
                style={[styles.textInput, { backgroundColor: overallColor4 }]}
                textInputStyle={{ paddingHorizontal: 12, paddingTop: 12, color: overallColor3 }}
                textAlignVertical="top"
                textAlign="left"
                multiline={true}
                inputAccessoryViewID={"gratitudeInput"}
              />
              <KeyboardDone inputID="serviceInput" />
              <LinedTextInput
                value={kindness}
                onChangeText={(text) => {
                  setKindness(text);
                  setIsDirty(true);
                }}
                placeholder="What's one way you can help someone today?"
                placeholderTextColor={hexToRgba(overallColor3, 0.3)}
                style={[styles.textInput, { backgroundColor: overallColor4 }]}
                textInputStyle={{ paddingHorizontal: 12, paddingTop: 12, color: overallColor3 }}
                textAlignVertical="top"
                textAlign="left"
                multiline={true}
                inputAccessoryViewID={"serviceInput"}
              />
            </View>
          }
          bottomContent={
            <>
              <View style={styles.bottomText}>
                <CustomSpiritualButton
                  isDirty={isDirty}
                  label="Save Entry"
                  onPress={handleSave}
                  color={overallColor2}
                  textColor={overallColor3}
                />
                {saved && !isDirty && (
                  <Text style={[styles.savedMessage, { color: overallColor4 }]}>
                    Entry Saved 💛
                  </Text>
                )}
              </View>
              <Text style={[styles.bottomNote, { color: overallColor4 }]}>
                Raise your frequency with a kind heart
              </Text>
            </>
          }
        />
      </TouchableWithoutFeedback>
      <CloseX xColor={overallColor4} onPress={() => navigation.goBack()} />
    </GradientBackground>
  );
};
