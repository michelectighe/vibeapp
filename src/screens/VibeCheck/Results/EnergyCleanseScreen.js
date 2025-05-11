import React, { useState, useEffect, useRef } from "react";
import { Text, View, ActivityIndicator } from "react-native";
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

  const { meditation, frequency, breathing } = getVibeRecommendations({
    vibrationLevel: vibrationInfo,
  });
  console.log("meditation:", meditation);
  console.log("frequency:", frequency);
  console.log("breathing:", breathing);
  useEffect(() => {
    if (vibrationInfo == null) return;
    setColor(vibrationInfo.color);
    setColor2(vibrationInfo.color2);
    setColor3(vibrationInfo.color3);
  }, [vibrationInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMeditationPress = async (item) => {
    if (isPlayingRef.current) {
      await stopTrack();
    } else {
      await playTrack(item.id, item.audio, item.title, "VibeKey", 1, true);
      isPlayingRef.current = true;
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
        middleFlex={4}
        bottomFlex={0}
        safe={false}
        topContent={
          <View style={styles.titleWrapper}>
            <Text style={[styles.title, { color: overallDarkColor }]}>
              Energy Cleanse Recommendations
            </Text>
          </View>
        }
        middleContent={
          <View style={styles.middle}>
            <Text style={[styles.sectionTitle, { color: overallDarkColor }]}>Meditation</Text>
            <MeditationCard item={meditation} onPress={handleMeditationPress} />
            <Text style={[styles.sectionTitle, { color: overallLightColor }]}>Frequency</Text>
            <FrequencyCard item={frequency} />
            <Text style={[styles.sectionTitle, { color: overallDarkColor }]}>Breathing</Text>
            <BreathingCard item={breathing} />
          </View>
        }
        bottomContent={<></>}
      />
    </GradientBackground>
  );
};
