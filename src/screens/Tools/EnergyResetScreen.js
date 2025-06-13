import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Modal, Animated } from "react-native";
import { GradientBackground } from "@components";
import { styles } from "./EnergyResetScreen.styles";
import { dbtSkills } from "@/data/dbtSkills"; // we'll create this
import { DBTCard } from "@/components/DBTCard";
import { DBTModalContent, CardGradient, SwipeHintDots } from "@/components";
import { Colors } from "@/constants";
import { SCREEN_WIDTH } from "@/utils";

export const EnergyResetScreen = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGradient, setColors] = useState();
 

  const openModal = (skill, gradients) => {
    setSelectedSkill(skill);
    setModalVisible(true);
    setColors(gradients);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSkill(null);
    setColors(null);
  };

  return (
    <GradientBackground colors={[Colors.white, Colors.white, Colors.white]}>
      <View style={styles.container}>
        <ScrollView
          style={[styles.scrollView]}
          contentContainerStyle={[styles.scrollContent]}
          showsVerticalScrollIndicator={false}
        >
          <CardGradient colors={Colors.screenIntroGradient} style={styles.cardGradient}>
            <Text style={styles.screenTitle}>Energy Reset</Text>
            <Text style={styles.introText}>
              These tools are based on Dialectical Behavior Therapy (DBT), designed to help you
              navigate intense emotions, reset your nervous system, and reconnect with your sense of
              inner balance. Explore the skills below to regulate, reflect, and reset your energy.
            </Text>
          </CardGradient>

          {dbtSkills.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={[styles.sectionTitle, { color: section.gradient[0] }]}>
                {section.title}
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardRow}
                snapToInterval={SCREEN_WIDTH}
                decelerationRate="fast"
                snapToAlignment="start"
              >
                {section.cards.map((card) => (
                  <DBTCard
                    key={card.id}
                    skill={card}
                    onPress={() => openModal(card, section.gradient)}
                    gradientColors={section.gradient}
                  />
                ))}
              </ScrollView>
              <SwipeHintDots dotColor={section.gradient[0]} />
              {/* <SwipeHintArrow color={section.gradient[0]} /> */}
            </View>
          ))}
        </ScrollView>
        <Modal animationType="slide" visible={modalVisible} onRequestClose={closeModal} transparent>
          <DBTModalContent skill={selectedSkill} colors={selectedGradient} onClose={closeModal} />
        </Modal>
      </View>
    </GradientBackground>
  );
};
