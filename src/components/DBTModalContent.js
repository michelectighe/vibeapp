import React, {useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated } from "react-native";
import { Colors, Fonts } from "@/constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { CardGradient } from "./CardGradient";
import { CloseX } from "./CloseX";

export const DBTModalContent = ({ skill, colors,  onClose }) => {
 const scale = useRef(new Animated.Value(0.8)).current;
 const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (!skill) return null;

  return (
    
      <Animated.View
        style={{
          transform: [{ scale }],
          opacity,
          backgroundColor: "transparent",
          borderRadius: 16,
          padding: 20,
          width: SCREEN_WIDTH * 1.05,
          height: "100%",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        {/* BACKDROP: closes modal */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {/* MODAL CONTENT: should NOT close modal */}
        <CardGradient colors={colors} style={styles.cardGradient}>
          <View style={styles.halfModalContent}>
            <CloseX onPress={onClose} style={{ top: 16, right: 16 }} />

            <Text style={styles.title}>{skill.title}</Text>
            {/* <Text style={styles.teaser}>{skill.teaser}</Text> */}
            <Text style={styles.detailText}>
              {skill.description || "This is a placeholder description of the DBT skill."}
            </Text>
          </View>
        </CardGradient>
        {/* </View> */}
      </Animated.View>
  );
};

const styles = StyleSheet.create({
  halfModalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  halfModalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: SCREEN_HEIGHT * 0.35,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  cardGradient: {
    borderWidth: 1,
    borderColor: Colors.white,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.white,
    marginBottom: 8,
  },
  teaser: {
    fontFamily: Fonts.body,
    fontSize: 18,
    color: Colors.white,
    marginBottom: 12,
  },
  detailText: {
    fontFamily: Fonts.body,
    fontSize: 18,
    color: Colors.white,
  },
});
