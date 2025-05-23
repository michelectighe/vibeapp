import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Platform,
  InputAccessoryView,
  Appearance,
} from "react-native";
import { hexToRgba } from "@/utils";
import { hextoArrayBuffer, hextoutf8 } from "jsrsasign";

export const KeyboardDone = ({ inputID }) => {
  if (Platform.OS !== "ios") return null;

  const isDark = Appearance.getColorScheme() === "dark";

  const barColor = isDark ? hexToRgba("#1C1C1E") : hexToRgba("#D1D1D6");
  const buttonColor = isDark ? hexToRgba("#2C2C2E") : hexToRgba("#E5E5EA");
  const textColor = isDark ? "#FFFFFF" : "#000000";

  return (
    <InputAccessoryView nativeID={inputID}>
      <View style={{ backgroundColor: barColor, padding: 8, alignItems: "flex-end" }}>
        <TouchableOpacity
          onPress={Keyboard.dismiss}
          style={{
            backgroundColor: buttonColor,
            paddingVertical: 6,
            paddingHorizontal: 16,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: textColor, fontWeight: "600" }}>Done</Text>
        </TouchableOpacity>
      </View>
    </InputAccessoryView>
  );
};
