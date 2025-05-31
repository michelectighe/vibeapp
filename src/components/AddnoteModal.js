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
import { ChakraColorPicker, CustomSpiritualButton, KeyboardDone } from "@components";
import { SCREEN_HEIGHT } from "@/utils";

export const AddNoteModal = ({ visible, onClose, onSave }) => {
  const [text, setText] = useState("");
  const [stickyColor, setStickyColor] = useState(Colors.paleYellow); // default
  const [stickyTextColor, setStickyTextColor] = useState(Colors.darkText); // Not undefined!

  const handleSave = () => {
    if (!text.trim()) return;
    //  console.log("Saving with color:", stickyColor, "textColor:", stickyTextColor);

    onSave(text.trim(), stickyColor, stickyTextColor || Colors.textDark);
    setText("");
    setStickyColor(Colors.rootChakra); // optional reset
    setStickyTextColor("white");
    onClose();
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={[styles.modal]}>
            <Text style={styles.title}>New Goal</Text>
            <KeyboardDone inputID="addNoteAccessory" colorOpacity={true} />
            <TextInput
              style={[styles.input, { backgroundColor: stickyColor, color: stickyTextColor }]}
              placeholder="Enter your goal"
              placeholderTextColor={stickyTextColor}
              value={text}
              onChangeText={setText}
              multiline
              keyboardAppearance="dark"
              inputAccessoryViewID={"addNoteAccessory"}
            />
            <View style={[styles.buttonRow]}>
              <View style={styles.buttonCancel}>
                <CustomSpiritualButton
                  label="Cancel"
                  onPress={onClose}
                  color={Colors.surface}
                  textColor={Colors.buttonText}
                />
              </View>
              <View style={styles.buttonSave}>
                <CustomSpiritualButton
                  label="Save"
                  onPress={handleSave}
                  color={Colors.surface}
                  textColor={Colors.buttonText}
                />
              </View>
            </View>
            <View style={styles.colorPicker}>
              <ChakraColorPicker
                selectedColor={stickyColor}
                onColorSelect={(color, textColor) => {
                  setStickyColor(color);
                  setStickyTextColor(textColor); // ✅ This is the only place to update state
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH * 0.9,
    justifyContent: "center",
    //   backgroundColor: "rgba(0,0,0,0.4)",
    backgroundColor: "transparent",
    padding: 20,
  },
  modal: {
    height: SCREEN_HEIGHT * 0.6,
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: Fonts.title,
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    color: Colors.textDark,
  },
  input: {
    borderRadius: 8,
    padding: 10,
    height: SCREEN_HEIGHT * 0.35,
    textAlignVertical: "top",
    fontFamily: Fonts.journal,
    color: "white",
  },
  buttonRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonCancel: {
    width: "45%",
  },
  buttonSave: {
    width: "45%",
  },
  cancel: {
    backgroundColor: Colors.mediumGray,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  save: {
    backgroundColor: Colors.mediumGray,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontFamily: Fonts.body,
    color: Colors.white,
    fontSize: 16,
  },
  colorPicker: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.055,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 0,
    backgroundColor: "transparent",
  },
});
