import React, { useState, useCallback, useEffect, useRef } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAnalysis } from "@context";
import { GradientBackground, CardTools, SectionLayout, CloseX } from "@components";

import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./EnergyCleanseScreen.styles";
import { Colors } from "@/constants";
import { globalStyles } from "@/styles";
import { getVibeRecommendations } from "@utils";
import { playTrack, stopTrack, isPlayingTrack } from "@services";
import { hexToRgba } from "@/utils";

export const EnergyCleanseScreen = () => {
  const auth = getAuth();
  const [userId, setUserId] = useState();
  const { vibrationInfo } = useAnalysis();
  const navigation = useNavigation();
  const [overallColor, setColor] = useState();
  const [overallColor2, setColor2] = useState();
  const [overallColor3, setColor3] = useState();
  const [overallColor4, setColor4] = useState();
  const [cardColor, setCardColor] = useState();
  const isPlayingRef = useRef();
  const [playingState, setPlayingState] = useState({
    meditation,
    frequency,
  });
  const [completed, setCompleted] = useState({
    meditation: false,
    frequency: false,
    breathing: false,
  });

  useFocusEffect(
    useCallback(() => {
      const checkAudioStatus = async () => {
        try {
          const status = await isPlayingTrack(true); // get title needs to be true
          const { title } = status;
          //console.log("playing:", status);
          if (title?.toLowerCase().includes("meditation")) {
            setPlayingState({ meditation: true, frequency: false });
          } else if (title?.toLowerCase().includes("frequency")) {
            setPlayingState({ meditation: false, frequency: true });
          } else {
            setPlayingState({ meditation: false, frequency: false });
          }
        } catch (e) {
          console.warn("Error checking audio status:", e);
          setPlayingState({ meditation: false, frequency: false });
        }
      };

      checkAudioStatus();

      return () => {
        //console.log("leaving");
      };
    }, []),
  );

  const isAudioPlaying = playingState.meditation || playingState.frequency;
  useAmbientControlForScreen(!isAudioPlaying); // only play ambient if no audio is playing

  useEffect(() => {
    if (auth) {
      setUserId(auth.user?.uid || null);
    }
  }, [auth]);

  const { meditation, frequency, breathing } = getVibeRecommendations({
    vibrationLevel: vibrationInfo,
  });
  useEffect(() => {
    if (vibrationInfo == null) return;
    setColor(vibrationInfo.color);
    setColor2(vibrationInfo.color2);
    setColor3(vibrationInfo.color3);
    setColor4(vibrationInfo.color4);
    setCardColor(vibrationInfo.color2);
  }, [vibrationInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (completed.meditation && completed.frequency && completed.breathing) {
      saveCleanseToFirebase();
    }
  }, [completed]);

  const handlePress = async (item, type) => {
    if (playingState[type]) {
      // 🔇 Stop current playing track
      await stopTrack();
      setPlayingState((prev) => ({ ...prev, [type]: false }));
    } else {
      // 🔄 Stop all previous tracks first
      await stopTrack();

      // 🔊 Start the new track
      await playTrack(item.id, item.audio, item.audioTitle, "VibeKey", 1);
      setCompleted((prev) => ({ ...prev, [type]: true }));
      // ✅ Mark only this one as playing
      setPlayingState({
        meditation: false,
        frequency: false,
        [type]: true,
      });
    }
  };

  const handleBreathingPress = (pattern, type) => {
    //console.log("breathingPress:", pattern);
    // if (isPlayingRef.current) {
    //   stopTrack();
    //   isPlayingRef.current = false;
    // }
    setCompleted((prev) => ({ ...prev, [type]: true }));
    navigation.navigate("BreathingModalScreen", { pattern });
  };

  const saveCleanseToFirebase = async () => {
    try {
      const timestamp = new Date();

      await getFirestore().collection("users").doc(userId).collection("cleanses").add({
        completedAt: timestamp,
        vibrationInfo,
        meditationId: meditation.id,
        frequencyId: frequency.id,
        breathingId: breathing.id,
      });

      //console.log("✅ Cleanse written to Firebase");
    } catch (e) {
      console.warn("❌ Failed to write cleanse:", e);
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
      colors={
        overallColor
          ? [overallColor4, overallColor, overallColor2, overallColor3, overallColor4]
          : [Colors.white, Colors.white, Colors.white]
      }
    >
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
              Recommended Cleanses
            </Text>
          </View>
        }
        middleContent={
          <View style={styles.middle}>
            <Text style={[styles.sectionTitle, { color: overallColor3 }]}>Meditation</Text>
            <CardTools
              item={meditation}
              onPress={() => handlePress(meditation, "meditation")}
              bgColor={cardColor}
              textColor={overallColor3}
              isPlaying={playingState.meditation}
            />
            <Text style={[styles.sectionTitle, { color: overallColor3 }]}>Frequency</Text>
            <CardTools
              item={frequency}
              onPress={() => handlePress(frequency, "frequency")}
              bgColor={cardColor}
              textColor={overallColor3}
              isPlaying={playingState.frequency}
            />
            <Text style={[styles.sectionTitle, { color: overallColor3 }]}>Breathing</Text>
            <CardTools
              item={breathing}
              onPress={() => handleBreathingPress(breathing, "breathing")}
              bgColor={cardColor}
              textColor={overallColor3}
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
