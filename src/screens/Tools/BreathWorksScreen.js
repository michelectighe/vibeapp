import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BreathingCircle, BreathingPatternSelector } from "@components";
import { BREATH_PATTERNS } from "@constants";

const BreathWorksScreen = () => {
  const [selectedPattern, setSelectedPattern] = useState(BREATH_PATTERNS[0]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>{selectedPattern.name}</Text>
        <BreathingPatternSelector
          patterns={BREATH_PATTERNS}
          selectedId={selectedPattern.id}
          onSelect={setSelectedPattern}
        />
      </View>

      <View style={styles.main}>
        <BreathingCircle pattern={selectedPattern} key={selectedPattern.id} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDEBD0",
  },
  top: {
    paddingTop: 60,
 //   paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 50,
    marginTop: 20,
    textAlign: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BreathWorksScreen;
