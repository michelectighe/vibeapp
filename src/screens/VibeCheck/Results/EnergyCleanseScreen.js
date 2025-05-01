// EnergyCleanseScreen.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAnalysis } from "@context";
import { GradientBackground, MeditationCard, FrequencyCard } from "@components";
import { getEnergyCleanseContent } from "@data";
import { Colors, Fonts } from "@constants";

export default function EnergyCleanseScreen() {
  const { overallVibrationScore } = useAnalysis();
  const navigation = useNavigation();
  const { meditations, frequencies } = getEnergyCleanseContent(
    overallVibrationScore
  );

  return (
    <GradientBackground colors={["white", "white", "white"]} logo={false}>
      <View style={styles.container}>
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
        style={{
          position: "absolute",
          top: 50,
          right: 20,
          zIndex: 100,
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 24, color: "#333" }}>✕</Text>
      </TouchableOpacity>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 60,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 12,
    textAlign: "center",
    color: "#333",
  },
});
