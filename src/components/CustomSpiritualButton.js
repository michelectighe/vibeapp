/******************************************************** 
 usage example: 
<CustomSpiritualButton
  label="Send Reset Email"
  onPress={handleReset}
  color={Colors.vcButtonColor}
  textColor={Colors.vcButtonTextColor}
/>
********************************************************/

import React, { useRef, useEffect } from "react";
import {
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

const CustomSpiritualButton = ({ label, onPress, color, textColor }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, width: "100%" }}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, { backgroundColor: color || "#888" }]}
        activeOpacity={0.85}
      >
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    // color: "#fff",
  },
});

export default CustomSpiritualButton;
