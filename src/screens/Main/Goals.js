import React, { useState, useCallback, useRef } from "react";
import { View, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { GradientBackground, AddNoteModal, CustomSpiritualButton } from "@components";
import { StickyNote, DatePickerStrip } from "@components";
import { DeleteConfirmationModal } from "@components/DeleteConfirmationModal";
import { CloseX } from "@/components";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import {
  saveStickyNoteToDb,
  deleteStickyNoteByIdDb,
  getAllStickyNotes,
  updateStickyDb,
} from "@database";
import { styles } from "./Goals.styles";
import { Colors } from "@constants";
import uuid from "react-native-uuid";
import { format } from "date-fns";
import { SCREEN_WIDTH } from "@/utils";

export const Goals = () => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const noteRefs = useRef({});

  const [selectedDate, setSelectedDate] = useState(); // today
  const [showDeleteModal, setShowDeleteModal] = useState({
    visible: false,
    deleteId: null,
  });
  const [noteToEdit, setNoteToEdit] = useState(null);

  useFocusEffect(
    useCallback(() => {
      console.log("reloading");
      const loadNotes = async () => {
        console.log("trying to get stickies");
        const stickies = await getAllStickyNotes();
        //   console.log("stickies returned:", stickies);
        setNotes(stickies);
      };
      loadNotes();
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleDeleteNote = async (id) => {
    setShowDeleteModal({ visible: true, deleteId: id });
  };

  const handleDelete = async (id) => {
    const noteRef = noteRefs.current[id];
    if (noteRef?.triggerDelete) {
      noteRef.triggerDelete();
    }
    setTimeout(async () => {
      await deleteStickyNoteByIdDb(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    }, 1600);
  };
  const handleEdit = async (note) => {
    setNoteToEdit(note);
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    //  setNoteToEdit(null);
  };

  const handleUpdate = async (text, color) => {
    console.log("saving updated note:", noteToEdit.id, text);
    if (noteToEdit) {
      await updateStickyDb(noteToEdit.id, text, color);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === noteToEdit.id ? noteToEdit : note)),
      );
      setNoteToEdit(null);
      return;
    }
  };
  const handleAddNote = async (text, color, textColor) => {
    if (!text) return;
    const newId = uuid.v4();

    // Random starting X, Y and rotation values
    const randomX = Math.floor(Math.random() * 150); // tweak as needed
    const randomY = Math.floor(Math.random() * 200); // tweak as needed
    const randomRotation = Math.random() * 0.3 - 0.15; // ± ~8.5°

    const sticky = {
      id: newId,
      timestamp: new Date(`${selectedDate}T00:00:00`).toISOString(),
      text,
      x: randomX,
      y: randomY,
      rotation: randomRotation,
      color,
      textColor,
      done: false,
    };
    console.log("awaiting save of:", sticky);
    await saveStickyNoteToDb(sticky);
    setNotes((prev) => [...prev, sticky]);
  };
  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <CloseX xColor={Colors.textDark} onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.streakTitle}>Your Daily Vibe Goals</Text>
          <Text style={styles.descriptionText}>
            Drag and rotate your sticky notes to place your daily intentions.
          </Text>
          <View>
            <CustomSpiritualButton
              label="List View"
              onPress={() =>
                navigation.navigate("Tabs", {
                  screen: "Tools",
                  params: { screen: "GoalsByDayScreen" },
                })
              }
              color={Colors.buttonBackground}
              textColor={Colors.buttonText}
            />
          </View>
        </View>
        <View style={styles.notesArea}>
          <FastImage
            source={require("@assets/images/streaks/cork.png")}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              flex: 1,
              position: "relative", // or "absolute"
              //  position: "absolute",
              width: SCREEN_WIDTH,
              height: "100%",
              zIndex: -1,
              alignSelf: "center",
            }}
          />

          {notes
            .filter((note) => format(new Date(note.timestamp), "yyyy-MM-dd") === selectedDate)
            .map((note) => (
              <StickyNote
                key={note.id}
                ref={(ref) => {
                  noteRefs.current[note.id] = ref;
                }}
                id={note.id}
                text={note.text}
                doneValue={note.done}
                color={note.color || Colors.paleYellow} // fallback just in case
                textColor={note.textColor || Colors.darkColor}
                onDelete={() => handleDeleteNote(note.id)}
                onEdit={() => handleEdit(note)}
              />
            ))}
        </View>

        <DeleteConfirmationModal
          visible={showDeleteModal.visible}
          onCancel={() => setShowDeleteModal({ visible: false, deleteId: null })}
          onConfirm={() => {
            if (showDeleteModal.deleteId) {
              handleDelete(showDeleteModal.deleteId);
            }
            setShowDeleteModal({ visible: false, deleteId: null });
          }}
          containerStyle={styles.localModalContainer}
        />

        <View style={styles.bottomSection}>
          <View style={[styles.datePicker, { width: SCREEN_WIDTH }]}>
            <DatePickerStrip
              selectedDate={selectedDate}
              onSelectDate={(date) => setSelectedDate(date)}
            />
          </View>
          <StickyNote
            id="add"
            text="Add a Goal"
            doneValue={false}
            disableDrag={true}
            color={Colors.paleYellow}
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>

      <AddNoteModal
        visible={modalVisible}
        onClose={() => handleCloseModal()}
        onSave={(text, color, textColor) => handleAddNote(text, color, textColor)}
        onUpdate={(text, color, textColor) => handleUpdate(text, color, textColor)}
        noteToEdit={noteToEdit}
      />
    </GradientBackground>
  );
};
