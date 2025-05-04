import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAnalysis } from "@context";
import { GradientBackground, MeditationCard, FrequencyCard } from "@components";
import { getEnergyCleanseContent } from "@data";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./EnergyCleanseScreen.styles";
import { globalStyles } from "@styles";

export const EnergyCleanseScreen = () => {
  useAmbientControlForScreen(true);
  const { overallVibrationScore } = useAnalysis();
  const navigation = useNavigation();
  const { meditations, frequencies } = getEnergyCleanseContent(
    overallVibrationScore
  );

  return (
    <GradientBackground colors={["white", "white", "white"]} logo={false}>
      <View style={globalStyles.container}>
        <Text style={styles.title}>Energy Cleanse</Text>

        <Text style={styles.sectionTitle}>🧘 Meditations</Text>
        <FlatList
          data={meditations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MeditationCard item={item} />}
        />

        <Text style={styles.sectionTitle}>🎶 Frequencies</Text>
        <FlatList
          data={frequencies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FrequencyCard item={item} />}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      >
        <Text style={styles.closeIcon}>✕</Text>
      </TouchableOpacity>
    </GradientBackground>
  );
};
