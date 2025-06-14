import React, { useRef, useEffect } from "react";
import {
  ImageBackground,
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as Haptics from "expo-haptics";
import { SCREEN_WIDTH } from "@utils";

export const CustomButton = ({ imgSource = "", onPress }) => {
  const imageFade = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const textFade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(imageFade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    textFade.setValue(1); // ⬅️ Set the correct initial value before loop starts

    Animated.loop(
      Animated.sequence([
        Animated.timing(textFade, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(textFade, {
          toValue: 1, // ⬅️ Be precise
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePress = () => {
    Haptics.selectionAsync(); // light tap feedback
    //  Haptics.impactAsync();
    //Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    if (onPress) onPress();
  };

  const SIZE = SCREEN_WIDTH * 0.5;
  let Touchable = TouchableOpacity;

  if (Platform.OS === "android") {
    const { TouchableNativeFeedback } = require("react-native");
    Touchable = TouchableNativeFeedback;
  }

  return (
    <View style={styles.wrapper}>
      <Touchable onPress={handlePress}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
              opacity: imageFade,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <ImageBackground source={imgSource} resizeMode="cover" style={styles.imageBackground} />
          {/* <Animated.Text style={[styles.tapMeText, { opacity: textFade }]}>Tap Me</Animated.Text> */}
        </Animated.View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  animatedContainer: {
    overflow: "hidden",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  tapMeText: {
    position: "absolute",
    // top: "50%",
    bottom: "40%",
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
