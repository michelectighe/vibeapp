import React, { useState, useEffect, useRef } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useAnalysis } from "@context";
import {
  GradientBackground,
  MeditationCard,
  FrequencyCard,
  BreathingCard,
  SectionLayout,
  CloseX,
} from "@components";

import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./EnergyCleanseScreen.styles";
import { Colors } from "@/constants";
import { globalStyles } from "@/styles";
import { getVibeRecommendations } from "@utils";
import { playTrack, stopTrack } from "@services";

export const EnergyCleanseScreen = () => {
  useAmbientControlForScreen(false);
  const { vibrationInfo } = useAnalysis();
  const navigation = useNavigation();
  const [overallColor, setColor] = useState();
  const [overallLightColor, setColor2] = useState();
  const [overallDarkColor, setColor3] = useState();
  const isPlayingRef = useRef();
  const [completed, setCompleted] = useState({
    meditation: false,
    frequency: false,
    breathing: false,
  });


  const { meditation, frequency, breathing } = getVibeRecommendations({
    vibrationLevel: vibrationInfo,
  });
  //console.log("meditation:", meditation);
  //console.log("frequency:", frequency);
  //console.log("breathing:", breathing);
  useEffect(() => {
    if (vibrationInfo == null) return;
    setColor(vibrationInfo.color);
    setColor2(vibrationInfo.color2);
    setColor3(vibrationInfo.color3);
  }, [vibrationInfo]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (
      completed.meditation &&
      completed.frequency &&
      completed.breathing
    ) {
      saveCleanseToFirebase();
    }
  }, [completed]);


  const handlePress = async (item, type) => {
    console.log('f item:', item)
    if (isPlayingRef.current) {
      await stopTrack();
      isPlayingRef.current = false;
      setCompleted((prev) => ({ ...prev, [type]: true }));
    } else {
      await playTrack(item.id, item.audio, item.title, "VibeKey", 1, true);
      isPlayingRef.current = true;
    }
  };
  const handleBreathingPress = (pattern, type) => {
    console.log('breathingPress:', pattern)
    if (isPlayingRef.current) {
      stopTrack();
      isPlayingRef.current = false;
    }
    setCompleted((prev) => ({ ...prev, [type]: true }));
    navigation.navigate("BreathingModalScreen", { pattern });
  };


  const saveCleanseToFirebase = async () => {
    try {
      const timestamp = new Date();
      const userId = "TODO: get current user ID";

      await firestore()
        .collection("users")
        .doc(userId)
        .collection("cleanses")
        .add({
          completedAt: timestamp,
          vibrationInfo,
          meditationId: meditation.id,
          frequencyId: frequency.id,
          breathingId: breathing.id,
        });

      console.log("✅ Cleanse written to Firebase");
    } catch (e) {
      console.warn("❌ Failed to write cleanse:", e);
    }
  };


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
    <GradientBackground colors={[Colors.white, overallColor, Colors.white]} logo={false}>
      <CloseX xColor={Colors.darkText} onPress={() => navigation.goBack()} />
      <SectionLayout
        topFlex={1}
        middleFlex={6}
        bottomFlex={1}
        safe={false}
        topContent={
          <View style={styles.titleWrapper}>
            <Text style={[styles.title, { color: overallDarkColor }]}>
              Energy Cleanse
            </Text>
            <Text style={[styles.subTitle, { color: overallDarkColor }]}>Recommendations</Text>
          </View>
        }
        middleContent={
          <View style={styles.middle}>
            <Text style={[styles.sectionTitle, { color: overallDarkColor }]}>Meditation</Text>
            <MeditationCard item={meditation} onPress={() => handlePress(meditation, "meditation")} />
            <Text style={[styles.sectionTitle, { color: overallDarkColor }]}>Frequency</Text>
            <FrequencyCard item={frequency} onPress={() => handlePress(frequency, "frequency")} />
            <Text style={[styles.sectionTitle, { color: overallDarkColor }]}>Breathing</Text>
            <BreathingCard item={breathing} onPress={() => handleBreathingPress(breathing, "breathing")} />
          </View>


        }
        bottomContent={<>
          {completed.meditation && completed.frequency && completed.breathing && (
            <Text style={{ textAlign: "center", marginTop: 12, color: overallDarkColor, fontSize: 16 }}>
              🌟 Energy Cleanse Complete!
            </Text>
          )}

        </>}
      />
    </GradientBackground>
  );
};
