import React, { useContext, useState, useRef, useEffect } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  View,
  Text,
  Modal,
  Animated,
  Button,
  SafeAreaView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { GradientBackground, ProgressDots, ScrollContainer } from "@components";
import { Colors, Fonts } from "@constants";
import { useWindowDimensions } from "react-native";
import { VIBE_CHECK_SCREENS } from "@navigation/screens";
import { useRoute } from "@react-navigation/native";
import { ExpandableItem } from "@utils";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./VibeCheckDetailsScreen.styles";

export const VibeCheckDetailsScreen = () => {
  useAmbientControlForScreen(false);
  const navigation = useNavigation();
  const route = useRoute();
  const currentIndex = VIBE_CHECK_SCREENS.indexOf(route.name);
  const { width } = useWindowDimensions();

  const [selectedOption, setSelectedOption] = useState(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const cardWidth = width * 0.5;
  const cardHeight = width * 0.5;
  const TAB_BAR_HEIGHT = 95;
  const extraPadding = TAB_BAR_HEIGHT;

  const goToNextScreen = () => {
    if (currentIndex < VIBE_CHECK_SCREENS.length - 1) {
      const nextScreen = VIBE_CHECK_SCREENS[currentIndex + 1];
      navigation.navigate(nextScreen);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      navigation.goBack();
    }
  };

  const options = [
    {
      name: "mic-outline",
      label: "Voice Frequency",
      description:
        "Your voice is a powerful indicator of your emotional and physical state. By analyzing its pitch, tone, and clarity, we can identify subtle shifts in energy and stress levels. This helps in understanding your vocal patterns and how they reflect your inner vibrational frequency.",
    },
    {
      name: "pulse-outline",
      label: "Heart Rate Variability",
      description:
        "Heart Rate Variability (HRV) measures the time difference between successive heartbeats, offering insights into the balance of your autonomic nervous system. A higher HRV suggests better adaptability to stress and efficient recovery, while lower HRV might indicate stress or fatigue.",
    },
    {
      name: "walk-outline",
      label: "Motion & Vibration",
      description:
        "This feature evaluates your physical movement patterns and subtle body vibrations. It assesses factors like posture, gait, and even fine tremors to give insight into your physical energy and tension levels. Consistent movement patterns typically signal balance, whereas irregularities can hint at stress or physical strain.",
    },
    {
      name: "cloud-outline",
      label: "Environmental Factors",
      description:
        "Environmental Frequencies analysis captures the ambient energy around you by measuring elements such as sound, light, and other ambient signals. These factors can influence your personal energy field, helping you understand how your surroundings impact your overall vibrational state.",
    },
    {
      name: "happy-outline",
      label: "Emotional State",
      description:
        "By analyzing facial expressions and subtle emotional cues, this feature deciphers your current emotional state. It identifies micro-expressions and mood changes, providing you with real-time feedback on how you’re feeling and insights to help manage your emotions.",
    },
    {
      name: "moon-outline",
      label: "Sleep Quality",
      description:
        "Sleep Quality monitoring evaluates the duration and restorative nature of your sleep. It tracks sleep patterns and disturbances to deliver a comprehensive overview of your rest and recovery. Quality sleep is essential for maintaining balanced energy and overall well-being.",
    },
  ];

  return (
    <GradientBackground
      colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <View style={styles.container}>
          <ScrollView
            style={globalStyles.scrollView}
            contentContainerStyle={globalStyles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.scrollInner}>
              {options.map((item, index) => (
                <ExpandableItem
                  key={index}
                  title={item.label}
                  description={item.description}
                  themeColors={themeColors}
                  theme={theme}
                />
              ))}
            </View>
          </ScrollView>
          <Button title="Continue" onPress={goToNextScreen} />
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};
