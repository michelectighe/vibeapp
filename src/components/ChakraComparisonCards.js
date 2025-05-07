import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { FuzzyGlow } from "./FuzzyGlow";
import { EdgeGlow } from "./EdgeGlow";

export const ChakraComparisonCard = ({ chakra, yourScore, theirScore }) => {
  const { width } = useWindowDimensions();

  const yourGlowSize = (yourScore || 0) * 1.5 + 20;
  const theirGlowSize = (theirScore || 0) * 1.5 + 20;

  return (
    <View style={[styles.card, { width: width - 32 }]}>
      <EdgeGlow width={width - 32} height={180} borderRadius={20} glowColor={chakra.color} />
      <View style={styles.leftGlow}>
        <FuzzyGlow glowSize={yourGlowSize} glowColor={chakra.color} />
      </View>
      <View style={styles.rightGlow}>
        <FuzzyGlow glowSize={theirGlowSize} glowColor={chakra.color} />
      </View>
      <View style={styles.textRow}>
        <View style={styles.half}>
          <Text style={styles.label}>You</Text>
          <Text style={styles.value}>{yourScore != null ? yourScore : "-"}</Text>
        </View>
        <View style={styles.center}>
          <Text style={styles.chakraName}>{chakra.name}</Text>
        </View>
        <View style={styles.half}>
          <Text style={styles.label}>Them</Text>
          <Text style={styles.value}>{theirScore != null ? theirScore : "-"}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 180,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 7,
    overflow: "hidden",
    position: "relative",
  },
  leftGlow: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  rightGlow: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    zIndex: 1,
  },
  half: {
    alignItems: "center",
  },
  center: {
    alignItems: "center",
    flex: 1,
  },
  chakraName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#aaa",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#000",
  },
});
