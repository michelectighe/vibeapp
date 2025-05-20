import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";

export const Card = ({ title, subtitle, onPress, image, textColor }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardWrapper}>
      {image && (
        <View style={styles.card}>
        <FastImage
          style={[StyleSheet.absoluteFill, styles.image]}
          source={image}
          resizeMode={FastImage.resizeMode.cover}
        />

          <View style={styles.overlay}>
            <Text style={[styles.title, { color: textColor }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: textColor }]}>{subtitle}</Text>
          </View>
        </View>
      )}
      {!image && (
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        
      )}
    </TouchableOpacity>
  );
};

const rawStyles = {
  cardWrapper: {
  //  width: SCREEN_WIDTH * .9,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    background: "transparent",
  },
  image: {
    borderRadius: 20,
  },
  card: {
    height: SCREEN_HEIGHT * 0.2,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    background: "transparent",
    overflow: "hidden",
  },

  backgroundImage: {
    borderRadius: 20,
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    bottom: 5,
    left: 1,
    backgroundColor: "transparent",
    padding: 12,
    borderRadius: 20,
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: Fonts.body,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: "700",
    fontFamily: Fonts.body,
  },
};

const styles = StyleSheet.create(scaledStyle(rawStyles));
