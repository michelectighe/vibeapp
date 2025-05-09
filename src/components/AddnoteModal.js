// components/AddNoteModal.js
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { SCREEN_WIDTH,Colors, Fonts } from "@constants";


export const AddNoteModal = ({ visible, onClose, onSave }) => {
  const [text, setText] = useState("");

  const handleSave = () => {
    if (!text.trim()) return;
    onSave(text.trim());
    setText("");
    onClose();
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1, width: SCREEN_WIDTH * 0.9 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={80} // tweak if needed for your layout
        >
          <View style={styles.overlay}>
            <View style={styles.modal}>
              <Text style={styles.title}>New Goal</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your goal"
                value={text}
                onChangeText={setText}
                multiline
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={onClose} style={styles.cancel}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={styles.save}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  modal: {
    backgroundColor: Colors.stickyNotes,
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontFamily: Fonts.AppTitleFont,
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    height: 80,
    textAlignVertical: "top",
    fontFamily: Fonts.Script,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancel: {
    backgroundColor: "#aaa",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  save: {
    backgroundColor: "#aaa",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontFamily: Fonts.Body,
    color: "#fff",
    fontSize: 16,
  },
});
