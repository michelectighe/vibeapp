import React, { useState, useEffect, useRef } from "react";
import * as SQLite from "expo-sqlite";
import { View, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { GradientBackground, AddNoteModal } from "@components";
import { StickyNote } from "@components/StickyNote";
import { DeleteConfirmationModal } from "@components/DeleteConfirmationModal";

import { saveStickyNoteToDB, deleteStickyNoteById } from "@database";
import { styles } from "./StreakScreen.styles";
import { Colors } from "@constants";
import uuid from "react-native-uuid";

export const StreakScreen = () => {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const noteRefs = useRef({});

  const [showDeleteModal, setShowDeleteModal] = useState({
    visible: false,
    deleteId: null,
  });

  useEffect(() => {
    const loadNotes = async () => {
      const db = await SQLite.openDatabaseAsync("vibrationResults.db");
      const result = await db.getAllAsync("SELECT * FROM sticky_notes");
      setNotes(result);
      console.log("notes:", result);
    };
    loadNotes();
  }, []);

  const handleDeleteNote = async (id) => {
    setShowDeleteModal({ visible: true, deleteId: id });
  };

  const handleDelete = async (id) => {
    const noteRef = noteRefs.current[id];
    if (noteRef?.triggerDelete) {
      noteRef.triggerDelete();
    }
    setTimeout(async () => {
      await deleteStickyNoteById(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    }, 1600);
  };
  const handleAddNote = async (text) => {
    if (!text) return;
    const newId = uuid.v4(); // returns a UUID string
    const newNote = {
      id: newId,
      timestamp: new Date().toISOString(),
      text,
      x: 20,
      y: 20,
      rotation: 0,
      color: "#FFFACD", // default pale yellow
      done: false,
    };
    console.log("new note;", newNote);
    await saveStickyNoteToDB(newNote);
    setNotes((prev) => [...prev, newNote]);
  };

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.streakTitle}>Your Daily Vibe Goals</Text>
          <Text style={styles.descriptionText}>
            Drag and rotate your sticky notes to place your daily intentions.
          </Text>
        </View>
        <View style={styles.notesArea}>
          <FastImage
            source={require("@assets/images/streaks/cork.png")}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: -1,
              alignSelf: "center",
            }}
          />

          {notes.map((note) => (
            <StickyNote
              key={note.id}
              ref={(ref) => {
                noteRefs.current[note.id] = ref;
              }}
              id={note.id}
              text={note.text}
              doneValue={note.done}
              color="#FFFACD"
              onDelete={() => handleDeleteNote(note.id)}
            />
          ))}
        </View>
        <DeleteConfirmationModal
          visible={showDeleteModal.visible}
          onCancel={() => setShowDeleteModal({ visible: false, deleteId: null })}
          onConfirm={() => {
            console.log(showDeleteModal.deleteId);
            if (showDeleteModal.deleteId) {
              handleDelete(showDeleteModal.deleteId);
            }
            setShowDeleteModal({ visible: false, deleteId: null });
          }}
          containerStyle={styles.localModalContainer}
        />

        <View style={styles.bottomSection}>
          <StickyNote
            id="add"
            text="Add a Goal"
            doneValue={false}
            disableDrag={true}
            color={Colors.StickyNote}
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>
      <AddNoteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={(text) => handleAddNote(text)}
      />
    </GradientBackground>
  );
};
