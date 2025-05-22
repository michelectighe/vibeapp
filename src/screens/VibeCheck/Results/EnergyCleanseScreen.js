import React, { useState, useEffect, useRef } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useAnalysis } from "@context";
import { GradientBackground, CardTools, SectionLayout, CloseX } from "@components";

import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./EnergyCleanseScreen.styles";
import { Colors } from "@/constants";
import { globalStyles } from "@/styles";
import { getVibeRecommendations } from "@utils";
import { playTrack, stopTrack } from "@services";

export const EnergyCleanseScreen = () => {
  useAmbientControlForScreen(false);
  const auth = getAuth();
  const [userID, setUserID] = useState();

  const { vibrationInfo } = useAnalysis();
  const navigation = useNavigation();
  const [overallColor, setColor] = useState();
  const [overallColor2, setColor2] = useState();
  const [overallColor3, setColor3] = useState();
  const [overallColor4, setColor4] = useState();
  const isPlayingRef = useRef();
  const [completed, setCompleted] = useState({
    meditation: false,
    frequency: false,
    breathing: false,
  });

  useEffect(() => {
    if (auth) {
      setUserID(auth.user?.uid || null);
    }
  }, [auth]);

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
    setColor4(vibrationInfo.color4);
  }, [vibrationInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (completed.meditation && completed.frequency && completed.breathing) {
      saveCleanseToFirebase();
    }
  }, [completed]);

  const handlePress = async (item, type) => {
    console.log("f item:", item);
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
//console.log("breathingPress:", pattern);
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

      await firestore().collection("users").doc(userID).collection("cleanses").add({
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
    <GradientBackground colors={[overallColor, overallColor2, overallColor3]} logo={false}>
      <CloseX xColor={overallColor4} onPress={() => navigation.goBack()} />
      <SectionLayout
        topFlex={1}
        middleFlex={3}
        bottomFlex={1}
        safe={true}
        topContent={
          <View style={styles.headerContainer}>
            <Text
              style={[
                styles.overallLabel,
                { color: overallColor4, textShadowColor: overallColor3 },
              ]}
            >
              Energy Cleanse
            </Text>
          </View>
        }
        middleContent={
          <View style={styles.middle}>
            <Text style={[styles.sectionTitle, { color: overallColor4 }]}>Meditation</Text>
            <CardTools
              item={meditation}
              onPress={() => handlePress(meditation, "meditation")}
              bgColor={overallColor}
            />
            <Text style={[styles.sectionTitle, { color: overallColor4 }]}>Frequency</Text>
            <CardTools
              item={frequency}
              onPress={() => handlePress(frequency, "frequency")}
              bgColor={overallColor}
            />
            <Text style={[styles.sectionTitle, { color: overallColor4 }]}>Breathing</Text>
            <CardTools
              item={breathing}
              onPress={() => handleBreathingPress(breathing, "breathing")}
              bgColor={overallColor}
            />
          </View>
        }
        bottomContent={
          <>
            {completed.meditation && completed.frequency && completed.breathing && (
              <Text style={[styles.success, { color: overallColor4 }]}>
                🌟 Energy Cleanse Complete!
              </Text>
            )}
          </>
        }
      />
    </GradientBackground>
  );
};
