import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAnalysis } from "@context";
import { FuzzyGlow, EdgeGlow } from "@components";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./ChakraScreen.styles";
import { globalStyles } from "@styles";

const chakraMeta = [
  { id: "root", name: "Root", color: "#e53935" },
  { id: "sacral", name: "Sacral", color: "#fb8c00" },
  { id: "solarPlexus", name: "Solar Plexus", color: "#fdd835" },
  { id: "heart", name: "Heart", color: "#43a047" },
  { id: "throat", name: "Throat", color: "#1e88e5" },
  { id: "thirdEye", name: "Third Eye", color: "#8e24aa" },
  { id: "crown", name: "Crown", color: "#6a1b9a" },
];

const ChakraCard = ({ chakra }) => {
  useAmbientControlForScreen(true);
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const glowSize = chakra.score * 1.5 + 30;

  const handlePress = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    navigation.navigate("ChakraDetail", {
      chakra,
      originX: pageX,
      originY: pageY,
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.card, { width: width - 32 }]}>
        <EdgeGlow
          width={width - 32}
          height={180}
          borderRadius={20}
          glowColor={chakra.color}
        />
        <FuzzyGlow glowSize={glowSize * 0.9} glowColor={chakra.color} />
        <View style={styles.textOverlay}>
          <Text style={styles.name}>{chakra.name}</Text>
          <Text style={styles.meaning}>{chakra.meaning}</Text>
          <Text style={styles.score}>Score: {chakra.score}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export const ChakraScreen = () => {
  const { chakraScores } = useAnalysis();
  const navigation = useNavigation();

  const personalizedChakraData = chakraMeta.map((chakra) => ({
    ...chakra,
    score: chakraScores[chakra.id] ?? 0,
    meaning: `Balance your ${chakra.name} chakra`,
  }));

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Chakra Balance</Text>

      <FlatList
        data={personalizedChakraData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => <ChakraCard chakra={item} />}
      />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      >
        <Text style={styles.closeIcon}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};
