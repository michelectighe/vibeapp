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

  useEffect(() => {
    Animated.timing(imageFade, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePress = () => {
   // Haptics.selectionAsync(); // light tap feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    if (onPress) onPress();
  };

  const SIZE = SCREEN_WIDTH * 0.5;
  let Touchable = TouchableOpacity;

  // if (Platform.OS === "android") {
  //   const { TouchableNativeFeedback } = require("react-native");
  //   Touchable = TouchableNativeFeedback;
  // }

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
            },
          ]}
        >
          <ImageBackground source={imgSource} resizeMode="cover" style={styles.imageBackground} />
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
});
