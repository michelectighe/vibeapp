// JournalScreen.js
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
import { GradientBackground, JournalPromptCard } from "@components";
import { getJournalPrompts } from "@data";
import { Colors, Fonts } from "@constants";

export default function JournalScreen() {
  const { overallVibrationScore } = useAnalysis();
  const prompts = getJournalPrompts(overallVibrationScore);
  const navigation = useNavigation();
  return (
    <GradientBackground colors={["white", "white", "white"]} logo={false}>
      <View style={styles.container}>
        <Text style={styles.title}>📝 Journal Prompts</Text>
        <FlatList
          data={prompts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <JournalPromptCard item={item} />}
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
});
