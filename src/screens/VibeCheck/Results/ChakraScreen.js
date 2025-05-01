import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Fonts, Colors } from "@constants";
import { useAnalysis } from "@context";
import { FuzzyGlow, EdgeGlow } from "@components";

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
      <View
        style={{
          width: width - 32,
          height: 180,
          borderRadius: 20,
          backgroundColor: "#fff",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 7,
          overflow: "hidden",
          position: "relative",
        }}
      >
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

const ChakraScreen = () => {
  const { chakraScores } = useAnalysis();
  const navigation = useNavigation();

  const personalizedChakraData = chakraMeta.map((chakra) => ({
    ...chakra,
    score: chakraScores[chakra.id] ?? 0,
    meaning: `Balance your ${chakra.name} chakra`,
  }));

  return (
    <View style={{ flex: 1,  paddingTop: 60 }}>
      <Text style={styles.title}>Chakra Balance</Text>

      <FlatList
        data={personalizedChakraData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 22,
        }}
        renderItem={({ item }) => <ChakraCard chakra={item} />}
      />

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
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 36,
    fontFamily: Fonts.Script,
    marginBottom: 10,
  },
  textOverlay: {
    zIndex: 1,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  meaning: {
    fontSize: 16,
    color: "#666",
    marginBottom: 6,
  },
  score: {
    fontSize: 16,
    color: "#000",
  },
});

export default ChakraScreen;
