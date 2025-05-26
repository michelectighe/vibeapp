import React, { useImperativeHandle, useRef, forwardRef, useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { updateStickyNotePosition } from "@database";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  makeMutable,
} from "react-native-reanimated";
import FastImage from "react-native-fast-image";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { Colors, Fonts } from "@constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import { globalZIndexCounter } from "../state/zIndexStore";


export const StickyNote = forwardRef(
  (
    {
      id,
      text,
      doneValue,
      disableDrag = false,
      onPress,
      onDelete,
      color = Colors.stickyNotes,
      textColor = Colors.textDark,
    },
    ref,
  ) => {
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const rotation = useSharedValue(0);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);
    const zIndex = useSharedValue(0);
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);
    const tackOpacity = useSharedValue(1);
    const tackScale = useSharedValue(1);
    const [done, setDone] = useState(doneValue);
    const checkmarkOpacity = useSharedValue(0);
    const checkmarkScale = useSharedValue(0.5);
    const [visible, setVisible] = useState(true);
    // const zIndexCounter = makeMutable(10);

    //console.log('zindexcurrent:', zIndex.current)
    useEffect(() => {
      if (done) {
        checkmarkOpacity.value = withTiming(1, { duration: 300 });
        checkmarkScale.value = withSpring(0.7, { damping: 8 });
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      const loadPosition = async () => {
        try {
          const db = await SQLite.openDatabaseAsync("vibrationResults.db");
          const results = await db.getFirstAsync(
            "SELECT x, y, rotation FROM sticky_notes WHERE id = ?",
            [id],
          );
          if (results) {
            offsetX.value = results.x;
            offsetY.value = results.y;
            rotation.value = results.rotation;
          }
        } catch (e) {
          console.warn("Failed to load sticky note from DB:", e);
        }
      };
      loadPosition();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      scale.value = 0.4;
      opacity.value = 0;

      scale.value = withSpring(1, { damping: 6 });
      opacity.value = withTiming(1, { duration: 300 });
    }, []);

    const savePositionWithDone = async (newDoneValue) => {
      try {
        await updateStickyNotePosition(id, {
          x: offsetX.value,
          y: offsetY.value,
          rotation: rotation.value,
          done: newDoneValue,
        });
      } catch (e) {
        console.warn("Failed to save sticky note to DB:", e);
      }
    };

    const panGesture = Gesture.Pan()
      .onStart((e) => {
        tackOpacity.value = withTiming(0, { duration: 100 });
        tackScale.value = withTiming(0.5, { duration: 100 });
        startX.value = offsetX.value - e.translationX;
        startY.value = offsetY.value - e.translationY;
         zIndex.value = globalZIndexCounter.value++;
      })
      .onUpdate((e) => {
        offsetX.value = e.translationX + startX.value;
        offsetY.value = e.translationY + startY.value;
      })
      .onEnd(() => {

        offsetX.value = withSpring(offsetX.value);
        offsetY.value = withSpring(offsetY.value);
        tackOpacity.value = withTiming(1, { duration: 1000 });
        tackScale.value = withSpring(1.2, { damping: 10, stiffness: 1000 }, () => {
          tackScale.value = withSpring(1);
        });
        runOnJS(savePositionWithDone)(done);
      });
    const rotateGesture = Gesture.Rotation().onUpdate((e) => {
      rotation.value = e.rotation;
    });

    const doubleTapGesture = Gesture.Tap()
      .numberOfTaps(2)
      .onEnd(() => {
        const newDone = !done;

        if (newDone) {
          checkmarkOpacity.value = withTiming(1, { duration: 400 });
          checkmarkScale.value = withSpring(0.71, { damping: 8 });
        } else {
          checkmarkOpacity.value = withTiming(0, { duration: 300 });
          checkmarkScale.value = withTiming(0.5, { duration: 300 });
        }
        runOnJS(setDone)(newDone);
        runOnJS(savePositionWithDone)(newDone);
      });
    // const singleTapGesture = Gesture.Tap()
    //   .numberOfTaps(1)
    //   .onStart(() => {
    //      zIndex.value = globalZIndexCounter.value++;
    //   })
    //   .onEnd(() => {
    //   });

    const gesture = Gesture.Simultaneous(
      Gesture.Simultaneous(panGesture, rotateGesture),
      doubleTapGesture,
    //  singleTapGesture,
    );

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: offsetX.value },
        { translateY: offsetY.value },
        { rotateZ: `${rotation.value}rad` },
      ],
      zIndex: zIndex.value,
      scale: scale.value,
      opacity: opacity.value,
    }));
    const tackStyle = useAnimatedStyle(() => ({
      opacity: tackOpacity.value,
      transform: [{ scale: tackScale.value }],
    }));

    const animateOut = async () => {
      scale.value = withTiming(0, { duration: 1500 });
      opacity.value = withTiming(0, { duration: 1500 }, (finished) => {
        if (finished) {
          runOnJS(setVisible)(false);
        }
      });
    };
    useImperativeHandle(ref, () => ({
      triggerDelete: animateOut,
    }));

    const NoteContent = (
      <Animated.View style={[styles.note, { backgroundColor: color }, animatedStyle]}>
        {!disableDrag && (
          <Animated.View style={[styles.tacContainer, tackStyle]}>
            <FastImage
              source={require("@assets/images/streaks/tac.png")}
              style={styles.infoImage}
              resizeMode="contain"
            />
          </Animated.View>
        )}

        {!disableDrag && (
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={onDelete}>
              <Icon name="delete" size={25} color={Colors.textDark} />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.center}>
          <Text style={[styles.text, { color: textColor }]}>{text}</Text>
        </View>
        <Animated.View
          style={[
            styles.checkmarkContainer,
            useAnimatedStyle(() => ({
              opacity: checkmarkOpacity.value,
              transform: [{ scale: checkmarkScale.value }],
            })),
          ]}
        >
          <Icon name="check" size={100} color="white" />
        </Animated.View>
      </Animated.View>
    );
    if (!visible) return null;

    return disableDrag ? (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {NoteContent}
      </TouchableOpacity>
    ) : (
      <GestureDetector gesture={gesture}>{NoteContent}</GestureDetector>
    );
  },
);
StickyNote.displayName = "StickyNote";

const styles = StyleSheet.create({
  note: {
    position: "absolute",
    padding: 20,
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  tacContainer: {
    position: "absolute",
    alignContent: "center",
    top: 6,
    //   zIndex: 10,
  },
  iconContainer: {
    position: "absolute",
    bottom: 6,
    left: 6,
    //   zIndex: 10,
  },
  infoImage: {
    width: 25,
    height: 25,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    //   zIndex: 5,
  },
  text: {
    fontFamily: Fonts.journal,
    fontSize: 12,
    textAlign: "center",
  },
});
