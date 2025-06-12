import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Colors, Fonts } from "@constants";
import {
  GradientBackground,
  BreathingAnimation,
  FrequencyPlayer,
  AffirmationCard,
} from "@components";
import { useNavigation } from "@react-navigation/native";


export const EnergyResetScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(0);

  const steps = ["Breath", "Tone", "Affirm", "Complete"];

  const goToNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Energy Reset</Text>
        <Text style={styles.subtitle}>Take a few moments to realign your vibration.</Text>

        {step === 0 && (
          <View style={styles.stepContainer}>
            <BreathingAnimation duration={60000} />
            <Text style={styles.instruction}>Breathe in... hold... and exhale slowly.</Text>
          </View>
        )}

        {step === 1 && (
          <View style={styles.stepContainer}>
            <FrequencyPlayer frequency={528} label="Playing 528Hz Healing Tone" />
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepContainer}>
            <AffirmationCard text="I am grounded. I am light." />
          </View>
        )}

        {step === 3 && (
          <View style={styles.stepContainer}>
            <Text style={styles.completeText}>✅ You’ve reset your energy.</Text>
            <Text style={styles.instruction}>
              Feel free to check in again or return to VibeKey.
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={goToNext} style={styles.button}>
          <Text style={styles.buttonText}>{step === steps.length - 1 ? "Done" : "Next"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.Bold,
    color: Colors.textLight,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.body,
    color: Colors.textLight,
    marginBottom: 30,
    textAlign: "center",
  },
  stepContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
  },
  instruction: {
    fontSize: 16,
    fontFamily: Fonts.body,
    color: Colors.textLight,
    marginTop: 20,
    textAlign: "center",
  },
  completeText: {
    fontSize: 22,
    fontFamily: Fonts.Bold,
    color: Colors.textLight,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.buttonBg,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
    color: Colors.buttonText,
  },
});
