// MotivationalMirrorCard.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
} from "react-native-reanimated";


const CARD_WIDTH = ((SCREEN_WIDTH * 0.9) /2) - 10;


export const CardMotivationalMirror = () => {
  const navigation = useNavigation();
  const rotation = useSharedValue(0); // from 0 to 180
  const image = require("@assets/images/home/mirror1.png");
  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(withTiming(180, { duration: 2000 }), withTiming(0, { duration: 2000 })),
      -1,
      false,
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const animatedStyle = useAnimatedStyle(() => {
    const rotateY = `${rotation.value}deg`;

    const opacity = interpolate(rotation.value, [0, 90, 180], [1, 0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return {
      transform: [{ rotateY }],
      opacity,
      backfaceVisibility: "visible", // prevents text from showing mirrored unintentionally
    };
  });

  return (
    <View>
      <View style={styles.titleWrapper}>
        <Text style={[styles.title, { color: Colors.cardText, fontSize: 16 }]}>
          Reflection Time
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Tools", { screen: "MotivationMirrorScreen" })}
        style={styles.cardWrapper}
      >
        <View style={styles.card}>
          {image && (
            <FastImage
              style={[StyleSheet.absoluteFill, styles.image]}
              source={image}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
        </View>
      </TouchableOpacity>
      <View style={{ width: CARD_WIDTH, alignItems: "center" }}>
        <Animated.Text style={[styles.animatedMirrorText, animatedStyle]}>Mirror</Animated.Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    background: "transparent",
    marginRight: 15,
    borderWidth: 1,
    borderColor: "white",
  },
  titleWrapper: {
    marginTop: 0,
    height: 30,
    justifyContent: "end",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 16,
    fontWeight: "300",
    fontFamily: Fonts.body,
    marginLeft: 10,
    marginBottom: 0,
    bottom: 0,
  },
  image: {
    borderRadius: 16,
    backgroundColor: "transparent",
    opacity: 1,
  },
  card: {
    width: CARD_WIDTH,
    height: SCREEN_HEIGHT * 0.2,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    background: "transparent",
  },
  cardGradient: {
    //  flex: 1,
    width: CARD_WIDTH,
    height: SCREEN_HEIGHT * 0.2,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
  },

  animatedMirrorText: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: Fonts.journal,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#d0d0d0", // optional: override if SilverText styles are too complex to animate
  },

  subTitle: {
    textAlign: "center",
    fontWeight: "300",
    fontFamily: Fonts.body,
    marginTop: 5,
  },
});
