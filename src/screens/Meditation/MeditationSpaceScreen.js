import React, { useState, useRef, useCallback, useEffect } from "react";

import { ImageBackground, View, Text, Animated, StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { useEnvironment } from "@context";
import { Colors } from "@constants";
import { styles } from "./MeditationSpaceScreen.styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { CloseX } from "@/components";
import { useAmbientControlForScreen } from "@/hooks";
import { debounceLabel } from "@utils";
export const MeditationSpaceScreen = () => {
  const { environment, vibeList, soundLabels, stopEnvironmentTracking } = useEnvironment();
  useAmbientControlForScreen(false);
  const navigation = useNavigation();
  const [vibeListCat, setVibeListCat] = useState("");
  const [spaceLabel, setSpaceLabel] = useState("Neutral");
  const [magLabel, setMagLabel] = useState("");
  const [soundLabel, setSoundLabel] = useState("");
  const [topSoundLabels, setTopSoundLabels] = useState("");
  const [magValue, setMagValue] = useState();
  const imageFade = useRef(new Animated.Value(0)).current;
  const lastSoundLabelRef = useRef(null);
  const lastMagLabelRef = useRef(null);
  const lastSetTimestampRef = useRef(null);
  const debounceSoundTimeout = useRef(null);
  const debounceMagTimeout = useRef(null);
  const detailsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(async () => {
      Animated.timing(detailsOpacity, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    }, 1600);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useFocusEffect(
    useCallback(() => {
      return () => {
        stopEnvironmentTracking();
      };
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    Animated.timing(imageFade, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (environment?.overall && environment.magnetometer && environment.sound) {
      debounceLabel({
        newLabel: environment.sound.label,
        lastLabelRef: lastSoundLabelRef,
        lastSetTimestampRef,
        timeoutRef: debounceSoundTimeout,
        setter: setSoundLabel,
      });
      debounceLabel({
        newLabel: environment.magnetometer.label,
        lastLabelRef: lastMagLabelRef,
        lastSetTimestampRef,
        timeoutRef: debounceMagTimeout,
        setter: setMagLabel,
      });
      setVibeListCat(vibeList);
      setTopSoundLabels(soundLabels);
      // setSoundValue(environment.sound.value);
      setMagValue(environment.magnetometer.value);
      setSpaceLabel(environment.overall.label);
    }
  }, [environment]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={styles.container}>
      <CloseX xColor={Colors.textDark} onPress={() => navigation.goBack()} />
      <ImageBackground
        style={styles.backgroundImage}
        source={require("@assets/images/meditationBackground.png")}
        resizeMode="cover"
      >
        {vibeListCat && environment && (
          <Animated.View style={[styles.infoContainer, { opacity: detailsOpacity }]}>
            <View style={styles.card}>
              <BlurView blurType="light" blurAmount={1} style={StyleSheet.absoluteFill} />
              <View style={styles.sideBySide}>
                <View style={styles.leftColumn}>
                  <View style={styles.largeCard}>
                    <View style={styles.subLargeCardShort}>
                      <Text style={styles.iconLabel}>🎧 Background Sound</Text>
                      <Animated.Text style={[styles.iconValue]}>{soundLabel}</Animated.Text>
                    </View>
                    <View style={styles.dividerLeft} />
                    <View style={styles.subLargeCardTall}>
                      <Text style={[styles.iconLabel, {}]}>Detected Tones</Text>
                      {topSoundLabels.map((label, i) => (
                        <Animated.Text key={i} style={[styles.iconValue]}>
                          {label}
                        </Animated.Text>
                      ))}
                    </View>
                  </View>
                </View>

                <View style={styles.rightColumn}>
                  <View style={styles.largeCard}>
                    <View style={[styles.subLargeCardShort]}>
                      <Text style={styles.iconLabel}>📡 Magnetic Field</Text>
                      <Animated.Text style={styles.iconValue}>{magLabel}</Animated.Text>
                      <Animated.Text style={styles.iconSubValue}>
                        {magValue.toFixed(1)} µT
                      </Animated.Text>
                    </View>
                    <View style={styles.dividerRight} />
                    <View style={[styles.subLargeCardTall]}>
                      <Text style={styles.iconLabel}>Location Vibe</Text>
                      <Animated.Text style={styles.iconValue} numberOfLines={2}>
                        {spaceLabel}
                      </Animated.Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        )}
      </ImageBackground>
    </View>
  );
};


// 📍 