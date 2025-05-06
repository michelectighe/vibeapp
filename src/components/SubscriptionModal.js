// components/SubscriptionModal.js
import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const SubscriptionModal = ({ visible, onClose }) => {
  const navigation = useNavigation();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Premium Feature
          </Text>
          <Text style={{ textAlign: "center", marginBottom: 20 }}>
            This feature is available to Premium users. Upgrade to access it!
          </Text>

          <TouchableOpacity
            onPress={() => {
              onClose(false); // false = user declined
            }}
            style={{ marginVertical: 5 }}
          >
            <Text style={{ color: "red" }}>Not Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onClose(true); // true = user wants to upgrade
            }}
            style={{ marginVertical: 5 }}
          >
            <Text style={{ color: "green" }}>Upgrade Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
