import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@constants";

export const CloseX = ({ xColor = Colors.lightText, onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "absolute",
        top: 50,
        right: 30,
        zIndex: 100,
        padding: 0,
      }}
    >
      <Text style={{ fontSize: 24, color: xColor }}>✕</Text>
    </TouchableOpacity>
  );
};
