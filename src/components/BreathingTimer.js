// useCountdownTimer.js
import { useEffect, useRef, useState } from "react";

export const useCountdownTimer = (durationInSec, onComplete) => {
  const [timeLeft, setTimeLeft] = useState(durationInSec);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(durationInSec);
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [durationInSec]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return { timeLeft, minutes, seconds };
};

// BreathingTimerModal.js
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = [60, 120, 180, 300];

export const BreathingTimerModal = ({ visible, onClose, onSelect }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Select Duration</Text>
          {options.map((sec) => (
            <TouchableOpacity
              key={sec}
              onPress={() => {
                onSelect(sec);
                onClose();
              }}
            >
              <Text style={styles.option}>
                {sec / 60} minute{sec >= 120 ? "s" : ""}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    minWidth: 240,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  option: {
    fontSize: 16,
    paddingVertical: 8,
    textAlign: "center",
  },
  cancel: {
    fontSize: 14,
    color: "gray",
    marginTop: 12,
    textAlign: "center",
  },
});
