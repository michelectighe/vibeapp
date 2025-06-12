import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Badge = ({ value, showNumber = true }) => {
  const navigation = useNavigation();
  return (
    <View style={{ position: "relative", alignSelf: "flex-end" }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("VibeMatch", { screen: "MatchNotificationScreen" })}
      >
        {value > 0 && (
          <View style={styles.badge}>
            {showNumber && <Text style={styles.badgeText}>{value}</Text>}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  badge: {
    // position: "absolute",
    // top: 0,
    // right: 20,
    backgroundColor: "#F44",
    borderRadius: 15,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
    // add a border if needed for separation
    borderWidth: 1,
    borderColor: "#fff",
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});

