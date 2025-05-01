import React, { useContext, useState, useRef, useEffect } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  View,
  Text,
  Modal,
  StyleSheet,
  Animated,
  Button,
  SafeAreaView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
//import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { GradientBackground, ProgressDots, ScrollContainer } from "@components";
import { Colors, Fonts } from "@constants";


import { useWindowDimensions } from "react-native";
import { VIBE_CHECK_SCREENS } from "@navigation"; // ✅ Import once, use everywhere
import { useRoute } from "@react-navigation/native";
import ExpandableItem from "@utils";

const VibeCheckDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentIndex = VIBE_CHECK_SCREENS.indexOf(route.name);
  const { width } = useWindowDimensions();

  const [selectedOption, setSelectedOption] = useState(null);
  const scaleAnim = useRef(new Animated.Value(0)).current; // initial scale set to 0
  const cardWidth = width * 0.5;
  const cardHeight = width * 0.5;
  // Navigate to the next screen
  const TAB_BAR_HEIGHT = 95; // adjust if necessary
  const extraPadding = TAB_BAR_HEIGHT; // 20 extra pixels for safety

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

  // const swipeGesture = Gesture.Pan().onEnd((event) => {
  //   if (event.translationX < 50 && event.velocityX < 0) {
  //     // Swipe left → Go forward
  //     runOnJS(goToNextScreen)();
  //   } else if (event.translationX > 50 && event.velocityX > 0) {
  //     // Swipe right → Go back
  //     runOnJS(goBack)();
  //   }
  // });

  // Define the bullet options with labels and descriptions.
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
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        {/* <GestureDetector gesture={swipeGesture}> */}
        <View
          style={{ flex: 1, width: "100%", justifyContent: "center" }}
          className="items-center"
        >
          {/* <ImageBackground
              style={{ flex: 1, width: "100%", height: "100%" }}
              source={require("@assets/images/backgroundVibeCheck.webp")}
              resizeMode="cover"
            > */}

          {/* Expandable List */}
          <ScrollContainer>
            <View style={{ marginHorizontal: 20 }}>
              {options.map((item, index) => (
                <ExpandableItem
                  key={index}
                  title={item.label}
                  description={item.description}
                  themeColors={themeColors}
                  theme={theme}
                //      onToggle={handleItemToggle} // pass the callback
                />
              ))}
            </View>
          </ScrollContainer>
          <Button title="Continue" onPress={goToNextScreen} />

          {/* ✅ Use the progress dots, passing the state-based currentIndex */}
          {/* <ProgressDots
                currentIndex={currentIndex}
                totalScreens={VIBE_CHECK_SCREENS.length}
              /> */}
          {/* </ImageBackground> */}
        </View>
        {/* </GestureDetector> */}
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

export default VibeCheckDetailsScreen;
