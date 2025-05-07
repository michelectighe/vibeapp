import React from "react";
import { View, Button, Platform } from "react-native";
import * as Haptics from "expo-haptics";

export default function HapticTest() {
  const triggerHaptic = () => {
    if (Platform.OS === "ios") {
      //   Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      // Haptics.selectionAsync();
      // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Test Haptic" onPress={triggerHaptic} />
    </View>
  );
}
