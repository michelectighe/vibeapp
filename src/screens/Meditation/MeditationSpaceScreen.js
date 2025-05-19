import React, { useState, useRef, useCallback, useEffect } from "react";

import { ImageBackground, View, Text, Animated } from "react-native";
import { useEnvironment } from "@context";
import { Colors } from "@constants";
import { styles } from "./MeditationSpaceScreen.styles";
import { globalStyles } from "@styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { CloseX } from "@/components";
import { useAmbientControlForScreen } from "@/hooks";

export const MeditationSpaceScreen = () => {
  useAmbientControlForScreen(false);
  const navigation = useNavigation();
  const { environment, vibeList } = useEnvironment();
  const [combinedCalm, setCombinedCalm] = useState(0);
  const [spaceLabel, setSpaceLabel] = useState("Neutral");
  const [magLabel, setMagLabel] = useState("");
  const [soundLabel, setSoundLabel] = useState("");
  const imageFade = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent?.();
      parent?.setOptions({ tabBarStyle: { display: "none" } });
      return () => {
        //console.log("leaving secons focus effect");
      };
    }, [navigation]),
  );

  useEffect(() => {
    Animated.timing(imageFade, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (environment && environment.overall && environment.magnetometer && environment.sound) {
      setSoundLabel(environment.sound.label);
      setMagLabel(environment.magnetometer.label);
      setCombinedCalm(Number(environment.overall.score));
      setSpaceLabel(environment.overall.label);
    }
  }, [environment, vibeList]);

  // useEffect(() => {
  //   setGlowColor(Colors.white);
  //   setGlowSizeNum(100);
  //   const scaledSize = 30;
  //   Animated.timing(glowAnim, {
  //     toValue: scaledSize,
  //     duration: 500,
  //     easing: Easing.inOut(Easing.ease),
  //     useNativeDriver: false,
  //   }).start();
  // }, [combinedCalm]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   const listener = glowAnim.addListener(({ value }) => {
  //     const newSize = width * (0.2 + value * 0.8);
  //     setGlowSizeNum(1000);
  //   });

  //   return () => glowAnim.removeListener(listener);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={globalStyles.container}>
      <CloseX xColor={Colors.darkText} onPress={() => navigation.goBack()} />
      <ImageBackground
        style={styles.backgroundImage}
        source={require("@assets/images/backgroundMeditation.webp")}
        resizeMode="cover"
      >
        <View style={styles.centerContainer}>
          <Text style={styles.labelText}> {soundLabel}</Text>
          <Text style={styles.labelText}> {magLabel}</Text>
          <Text style={styles.labelText}>Overall: {spaceLabel}</Text>
          {vibeList.map((item, index) => (
            <Text key={index} style={styles.vibeItem}>
              {item.category.toUpperCase()}: {(item.score * 100).toFixed(2)}%
            </Text>
          ))}

          {!isNaN(combinedCalm) && combinedCalm != null && <Text style={styles.scoreText}>{combinedCalm.toFixed(0)}</Text>}
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
