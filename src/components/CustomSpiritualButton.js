/******************************************************** 
 usage example: 
<CustomSpiritualButton
  label="Send Reset Email"
  onPress={handleReset}
  color={Colors.buttonBackground}
  textColor={Colors.textLight}
/>
********************************************************/

import React, { useRef, useEffect } from "react";
import { Animated, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Fonts, Colors } from "@constants";

export const CustomSpiritualButton = ({
  label,
  onPress,
  color = Colors.surface,
  textColor = Colors.textDark,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Animated.View style={{ opacity: fadeAnim, width: "100%" }}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, { backgroundColor: color || Colors.surface }]}
        activeOpacity={0.85}
      >
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontFamily: Fonts.body,
  },
});
