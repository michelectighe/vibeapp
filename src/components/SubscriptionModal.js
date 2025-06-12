import React, { useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { Colors, Fonts } from "@constants"; // optional if you're using custom colors/fonts
import { SCREEN_WIDTH } from "@/utils";

export const SubscriptionModal = ({ visible, onClose, onUpgrade }) => {
  useEffect(() => {
    //console.log("🧪 SubscriptionModal visible?", visible);
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <BlurView intensity={40} tint="dark" style={styles.blurOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Go Premium</Text>

          <Text style={styles.trialInfo}>✨ 7-Day Free Trial</Text>
          <Text style={styles.description}>
            Unlock premium features to elevate your frequency, gain deep insights, and explore your
            full vibrational potential.
          </Text>
          <Text style={styles.cancelInfo}>Cancel anytime. No pressure. 🌿</Text>

          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={() => {
              onClose(false); // hide modal
              onUpgrade?.(); // let the parent handle what to do
            }}
          >
            <Text style={styles.upgradeText}>Start Free Trial</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onClose(false)} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Maybe Later</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  blurOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: SCREEN_WIDTH * 0.85,
    backgroundColor: Colors.white,
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.textDark || Colors.veryDarkGray,
  },
  trialInfo: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.forestGreen,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 15,
    color: Colors.veryDarkGray,
  },
  cancelInfo: {
    fontSize: 13,
    fontStyle: "italic",
    color: Colors.mediumGray,
    marginBottom: 20,
  },
  upgradeButton: {
    backgroundColor: Colors.forestGreen,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginBottom: 10,
  },
  upgradeText: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
  cancelButton: {
    paddingVertical: 6,
  },
  cancelText: {
    color: Colors.mediumGray,
    fontSize: 14,
  },
});
