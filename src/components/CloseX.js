import { TouchableOpacity, Text } from "react-native";
import { Colors, Fonts } from "@constants";

export const CloseX = ({ xColor = Colors.textLight, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "absolute",
        top: 60,
        right: 30,
        zIndex: 100,
        padding: 0,
        fontSize: 36,
        fontFamily: Fonts.bold,
      }}
    >
      <Text style={{ fontSize: 24, color: xColor }}>✕</Text>
    </TouchableOpacity>
  );
};
