import React, {
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";

import {
  ImageBackground,
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";

import { useWindowDimensions } from "react-native";
import { ProgressDots, HomeButton } from "@components";
import { MEDITATION_SCREENS } from "@navigation/screens";
import { useRoute } from "@react-navigation/native";
import { useEnvironment } from "@context";
import { Colors } from "@constants";
import { styles } from "./MeditationSpaceScreen.styles";
import { globalStyles } from "@styles";

export const MeditationSpaceScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { environment } = useEnvironment();
  const cardWidth = width * 0.5;
  const cardHeight = width * 0.5;
  const [combinedCalm, setCombinedCalm] = useState(0);
  const [spaceLabel, setSpaceLabel] = useState("Neutral");
  const [magLabel, setMagLabel] = useState("");
  const [soundLabel, setSoundLabel] = useState("");
  const glowAnim = useRef(new Animated.Value(0.5)).current;
  const [glowSizeNum, setGlowSizeNum] = useState(width * 0.5);
  const imageFade = useRef(new Animated.Value(0)).current;
  const [glowColor, setGlowColor] = useState("#FFFF66");

  const route = useRoute();
  const currentIndex = MEDITATION_SCREENS.indexOf(route.name);

  const goToNextScreen = () => {
    if (currentIndex < MEDITATION_SCREENS.length - 1) {
      const nextScreen = MEDITATION_SCREENS[currentIndex + 1];
      navigation.navigate(nextScreen);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    Animated.timing(imageFade, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (
      environment &&
      environment.overall &&
      environment.magnetometer &&
      environment.sound
    ) {
      setSoundLabel(environment.sound.label);
      setMagLabel(environment.magnetometer.label);
      setCombinedCalm(environment.overall.score);
      setSpaceLabel(environment.overall.label);
    }
  }, [environment]);

  useEffect(() => {
    setGlowColor("white");
    setGlowSizeNum(100);
    const scaledSize = 30;
    Animated.timing(glowAnim, {
      toValue: scaledSize,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [combinedCalm]);

  useEffect(() => {
    const listener = glowAnim.addListener(({ value }) => {
      const newSize = width * (0.2 + value * 0.8);
      setGlowSizeNum(1000);
    });

    return () => glowAnim.removeListener(listener);
  }, []);

  return (
    <View style={globalStyles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("@assets/images/backgroundMeditation.webp")}
        resizeMode="cover"
      >
        <View style={styles.centerContainer}>
          <Text style={styles.labelText}> {soundLabel}</Text>
          <Text style={styles.labelText}> {magLabel}</Text>
          <Text style={styles.labelText}>Overall: {spaceLabel}</Text>

          {!isNaN(combinedCalm) && (
            <Text style={styles.scoreText}>{combinedCalm.toFixed(0)}</Text>
          )}
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.bottomInner}>
            <View style={styles.bottomColumn}></View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
