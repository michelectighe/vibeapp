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
import { Colors } from "@/constants";
import { SCREEN_WIDTH } from "@/utils";

const chakraMeta = [
  { id: "root", name: "Root", color: Colors.rootChakra },
  { id: "sacral", name: "Sacral", color: Colors.sacralChakra },
  { id: "solarPlexus", name: "Solar Plexus", color: Colors.solarPlexusChakra },
  { id: "heart", name: "Heart", color: Colors.heartChakra },
  { id: "throat", name: "Throat", color: Colors.throatChakra },
  { id: "thirdEye", name: "Third Eye", color: Colors.thirdEyeChakra },
  { id: "crown", name: "Crown", color: Colors.crownChakra },
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
        <EdgeGlow width={width - 32} height={180} borderRadius={20} glowColor={chakra.color} />
        <View
          style={{
            Position: "absolute",
            left: 0,
            right: 0,
            width: SCREEN_WIDTH,
            alignItems: "center",
          }}
        >
          <FuzzyGlow glowSize={glowSize * 0.9} glowColor={chakra.color} />
        </View>
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

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Text style={styles.closeIcon}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};
