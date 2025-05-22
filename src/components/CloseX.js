import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors, Fonts } from "@constants";
import { Ionicons } from "@expo/vector-icons";
import { scaledStyle } from "@/utils";

export const CloseX = ({ xColor = Colors.textLight, onPress }) => {
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
           <Ionicons name="close-circle-outline" size={36} color={xColor} style={styles.icon} />

    </TouchableOpacity>
  );
};

const rawStyles = {

};
export const styles = StyleSheet.create(scaledStyle(rawStyles));