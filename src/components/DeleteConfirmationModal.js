import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Fonts } from "@constants";

export const DeleteConfirmationModal = ({
  //  id,
  visible,
  onCancel,
  onConfirm,
  containerStyle = {},
}) => {
  if (!visible) return null;

  return (
    <View style={[styles.modalOverlay, containerStyle]}>
      <View style={styles.modalBox}>
        <Text style={styles.modalText}>Remove Note?</Text>
        <Text style={styles.modalSubText}>Are you sure you want to delete this note?</Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm} style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalBox: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    width: 280,
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.darkText,
    fontFamily: Fonts.body,
  },
  modalSubText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: Colors.darkText,
    fontFamily: Fonts.body,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.darkText,
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: Colors.red,
    alignItems: "center",
  },
  cancelText: {
    color: Colors.darkText,
    fontFamily: Fonts.body,
  },
  deleteText: {
    color: Colors.white,
    fontWeight: "bold",
    fontFamily: Fonts.body,
  },
});
