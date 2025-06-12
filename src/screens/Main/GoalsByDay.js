import React, { useEffect, useState } from "react";
import { View, Text, SectionList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming , runOnJS} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { format } from "date-fns";
import { getAllStickyNotes, updateStickyDoneDb } from "@database";
import { GradientBackground, AddNoteModal, CloseX } from "@/components";
import { styles } from "./GoalsByDay.styles";
import { Colors } from "@/constants";

const groupNotesByDay = (notes = []) => {
  return notes.reduce((acc, note) => {
    (acc[note.timestamp] = acc[note.timestamp] || []).push(note);
    return acc;
  }, {});
};

export const GoalsByDayScreen = () => {
  const navigation = useNavigation();
  const [stickyNotes, setStickyNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const notes = await getAllStickyNotes();
      setStickyNotes(Array.isArray(notes) ? notes : []);
      console.log("notes:", notes);
    })();
  }, []);

  // Helper to update a single note's done state both locally and in DB
  const toggleDone = async (note) => {
    console.log("toggling done for noteid:", note.id);
    const updated = { ...note, done: !note.done };
    await updateStickyDoneDb(note.id, updated.done);
    setStickyNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  };

  const grouped = groupNotesByDay(stickyNotes);
  const sections = Object.keys(grouped)
    .sort()
    .map((timestamp) => ({
      title: format(timestamp, "yyyy-MM-dd"),
      data: grouped[timestamp],
    }));

  return (
    <GradientBackground>
      <CloseX xColor={Colors.textDark} onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.list}>
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.title}>{title}</Text>
            )}
            renderItem={({ item }) => <StickyNoteItem item={item} toggleDone={toggleDone} />}
          />
        </View>
        <AddNoteModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={() => {
            // handle add note here if needed
          }}
        />
      </View>
    </GradientBackground>
  );
};

// Make sure these styles are merged or added to your file
export default GoalsByDayScreen;

const StickyNoteItem = ({ item, toggleDone }) => {
  const [textWidth, setTextWidth] = useState(0);
  const lineWidth = useSharedValue(item.done ? 1 : 0);

  useEffect(() => {
    lineWidth.value = withTiming(item.done ? 1 : 0, { duration: 300 });
  }, [item.done]); // eslint-disable-line react-hooks/exhaustive-deps

  const strikeStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: 0,
    top: 15,
    width: textWidth * lineWidth.value,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
    opacity: 1,
  }));

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(toggleDone)(item);
    });

  return (
    <GestureDetector gesture={doubleTapGesture}>
      <Animated.View style={styles.item}>
        <View style={{ position: "relative", minHeight: 26 }}>
          <Text
            onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
            style={[
              styles.itemText,
              item.done && {
                color: Colors.muted,
                opacity: 0.7,
                textDecorationLine: "line-through",
              },
            ]}
          >
            {item.text}
          </Text>
          <Animated.View style={strikeStyle} />
        </View>
      </Animated.View>
    </GestureDetector>
  );
};
