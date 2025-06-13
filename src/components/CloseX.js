import React, { useRef, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Animated, Easing } from "react-native";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@/utils";

export const CloseX = React.memo(({ onPress, style }) => {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Only start the animation ONCE when the component mounts
    rotate.setValue(0); // reset only once, if ever needed
    const animation = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();

    // Optionally clean up on unmount
    return () => {
      animation.stop();
    };
  }, [rotate]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          position: "absolute",
          top: 70,
          right: 25,
          zIndex: 100,
          padding: 0,
          fontSize: 48,
          fontFamily: Fonts.bold,
        },
        style,
      ]}
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
});
CloseX.displayName = "CloseX";

const rawStyles = {
  feather: {
    position: "absolute",
    right: 1,
    top: 1,
    width: 40,
    height: 40,
    opacity: 0.6,
  },
};
export const styles = StyleSheet.create(scaledStyle(rawStyles));
