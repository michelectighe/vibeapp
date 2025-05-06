import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAnalysis } from "@context";
import {
  GradientBackground,
  MeditationCard,
  FrequencyCard,
  SectionLayout,
  CloseX,
} from "@components";
import { getEnergyCleanseContent } from "@data";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./EnergyCleanseScreen.styles";
import { globalStyles } from "@styles";
import { Colors } from "@/constants";

export const EnergyCleanseScreen = () => {
  useAmbientControlForScreen(true);
  const { overallVibrationScore } = useAnalysis();
  const navigation = useNavigation();
  const { meditations, frequencies } = getEnergyCleanseContent(
    overallVibrationScore
  );

  return (
    <GradientBackground colors={["white", "white", "white"]} logo={false}>
      <SectionLayout
        topFlex={1}
        middleFlex={2}
        bottomFlex={3}
        topContent={<Text style={styles.title}>Energy Cleanse</Text>}
        middleContent={
          <>
            <Text style={styles.sectionTitle}>🧘 Meditations</Text>
            <FlatList
              data={meditations}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MeditationCard item={item} />}
            />
          </>
        }
        bottomContent={
          <>
            <Text style={styles.sectionTitle}>🎶 Frequencies</Text>
            <FlatList
              data={frequencies}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <FrequencyCard item={item} />}
            />
          </>
        }
      />

      <CloseX xColor={Colors.darkText} onPress={() => navigation.goBack()} />
    </GradientBackground>
  );
};
