import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { styles } from "./SelfCareScreen.styles";
import selfCareData from "@assets/data/selfCareData.json";

export const SelfCareScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [carePlan, setCarePlan] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const imgSource = require("@assets/images/selfCare.png");
  const [infoVisible, setInfoVisible] = useState(false);
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(withTiming(1.05, { duration: 1500 }), -1, true);
  }, []);

  const pulsingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: pulse.value === 1 ? 1 : 0.95,
  }));

  const handleSelect = (item) => {
    if (carePlan.includes(item)) {
      setCarePlan(carePlan.filter((i) => i !== item)); // remove if already selected
    } else {
      setCarePlan([...carePlan, item]); // add if not selected
    }
  };
  const openModal = (category) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCategory(null);
  };

  return (
    <ImageBackground source={imgSource} resizeMode="cover" style={styles.imageBackground}>
      <View style={styles.header}>
        <Text style={styles.title}>Take a Moment for You</Text>

        <View style={styles.subtitleInline}>
          <Text style={styles.subTitle}>
            Choose one or more options for your energetic hygiene{" "}
          </Text>
          <TouchableOpacity onPress={() => setInfoVisible(true)}>
            <Text style={styles.infoIcon}>ⓘ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          {["body", "mind", "spirit"].map((category) => (
            <Animated.View key={category} style={[pulsingStyle, { alignItems: "center" }]}>
              <TouchableOpacity style={styles.categoryButton} onPress={() => openModal(category)}>
                <Text style={styles.categoryText}>{category.toUpperCase()}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {carePlan.length > 0 && (
          <View style={styles.carePlanContainer}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.carePlanTitle}>Your Care Plan:</Text>
              {carePlan.map((item, index) => (
                <Text key={index} style={styles.carePlanItem}>
                  • {item}
                </Text>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Modal for self care options */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedCategory?.toUpperCase()} Options</Text>

            <FlatList
              data={selfCareData[selectedCategory]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const isSelected = carePlan.includes(item);
                return (
                  <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
                    <View style={styles.optionRow}>
                      <Text style={styles.optionText}>{item}</Text>
                      {isSelected && <Text style={styles.checkMark}>✓</Text>}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />

            <Pressable onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        visible={infoVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setInfoVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.infoModalContainer}>
            <Text style={styles.modalTitle}>What is Energetic Hygiene?</Text>
            <Text style={styles.modalText}>
              Just like we care for our physical body with regular hygiene, energetic hygiene is
              about clearing, grounding, and recharging your inner energy field.{"\n\n"}
              It's a simple way to release what’s heavy, reconnect with yourself, and return to a
              balanced state.{"\n\n"}
              🕯 Examples:{"\n"}• Taking a slow breath{"\n"}• Setting a boundary{"\n"}• Sitting in
              stillness{"\n"}• Doing something kind for yourself
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setInfoVisible(false)}>
              <Text style={styles.closeButtonText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};
