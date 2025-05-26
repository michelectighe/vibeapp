import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Platform,
  InputAccessoryView,
  Appearance,
  StyleSheet,
} from "react-native";
import { hexToRgba, scaledStyle, SCREEN_WIDTH } from "@/utils";

export const KeyboardDone = ({ inputID, colorOpacity = true }) => {
  if (Platform.OS !== "ios") return null;

  const isDark = Appearance.getColorScheme() === "dark";

  // const barColor = isDark ? hexToRgba("#1C1C1E") : hexToRgba("#D1D1D6");
  const barColor = colorOpacity
    ? hexToRgba(isDark ? "#1C1C1E" : "#D1D1D6", 0.08)
    : isDark
    ? hexToRgba("#1C1C1E")
    : hexToRgba("#E5E5EA");
  const buttonColor = colorOpacity
    ? hexToRgba(isDark ? "#2C2C2E" : "#D1D1D6")
    : isDark
    ? hexToRgba("#2C2C2E")
    : hexToRgba("#E5E5EA");

  const textColor = isDark ? "#FFFFFF" : "#000000";

  return (
    <InputAccessoryView nativeID={inputID}>
      <View style={{ backgroundColor: barColor, padding: 8, alignItems: "flex-end" }}>
        <TouchableOpacity
          onPress={Keyboard.dismiss}
          style={[
            styles.buttonDone,
            {
              backgroundColor: buttonColor,
            },
          ]}
        >
          <Text style={{ color: textColor, textAlign: "center", fontWeight: "600" }}>Done</Text>
        </TouchableOpacity>
      </View>
    </InputAccessoryView>
  );
};

const rawStyles = {
  buttonDone: {
    paddingVertical: 15,
    // paddingHorizontal: 2,
    borderRadius: 8,
    width: SCREEN_WIDTH * 0.3,
    textAlign: "center",
    height: "100%",
  },
};
export const styles = StyleSheet.create(scaledStyle(rawStyles));