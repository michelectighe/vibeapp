import { useRef } from "react";
import { TouchableOpacity, StyleSheet, Animated, Easing, Image, Text } from "react-native";
import { Colors, Fonts } from "@constants";
import { Ionicons } from "@expo/vector-icons";
import { scaledStyle } from "@/utils";

export const CloseX = ({ xColor = Colors.textLight, onPress }) => {
  const rotate = useRef(new Animated.Value(0)).current;
  // Rotation loop
  rotate.setValue(0); // reset before loop
  Animated.loop(
    Animated.timing(rotate, {
      toValue: 1,
      duration: 8000, // adjust for desired spin speed
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "absolute",
        top: 70,
        right: 25,
        zIndex: 100,
        padding: 0,
        fontSize: 48,
        fontFamily: Fonts.bold,
      }}
    >
      <Animated.Image
        source={require("@assets/images/feather.png")}
        style={[
          styles.feather,
          {
            transform: [{ rotate: spin }],
          },
        ]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const rawStyles = {
  feather: {
    position: "absolute",
    right: 1,
    top: 1
    ,
    width: 40,
    height: 40,
    opacity: 0.6,
  },
};
export const styles = StyleSheet.create(scaledStyle(rawStyles));
