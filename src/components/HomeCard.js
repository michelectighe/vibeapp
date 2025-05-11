import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";

export const HomeCard = ({ title, subtitle, onPress, image, textColor }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardWrapper}>
      {image && (
        <View style={styles.card}>
          <FastImage
            style={StyleSheet.absoluteFill}
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
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    height: SCREEN_HEIGHT * 0.2,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  backgroundImage: {
    borderRadius: 12,
  },
  overlay: {
    position: "absolute",
    bottom: 5,
    left: 10,
    backgroundColor: "transparent",
    padding: 12,
    borderRadius: 12,
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: Fonts.Body,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: "700",
    fontFamily: Fonts.Body,
  },
};

const styles = StyleSheet.create(scaledStyle(rawStyles));
