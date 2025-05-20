import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT } from "@/utils";

export const Card = ({
  title,
  subtitle,
  onPress,
  image,
  textColor,
  isCompact = false,
  isSquished = false,
}) => {
  return (
    <View>
      {image && (
        <View style={styles.titleWrapper}>
          <Text style={[styles.title, { color: textColor, fontSize: isCompact ? 16 : 18 }]}>
            {title}
          </Text>
        </View>
      )}
      <TouchableOpacity onPress={onPress} style={styles.cardWrapper}>
        <View
          style={[styles.card, { height: isSquished ? SCREEN_HEIGHT * 0.1 : SCREEN_HEIGHT * 0.2 }]}
        >
          {image && (
            <FastImage
              style={[StyleSheet.absoluteFill, styles.image]}
              source={image}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
          {!image && (
            <View style={styles.noImage}>
              <Text style={styles.titleNoImage}>{title}</Text>
              <Text style={[styles.subTitleNoImage, { fontSize: isCompact ? 14 : 14 }]}>
                {subtitle}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      {image && (
        <Text style={[styles.subtitle, { color: textColor, fontSize: isCompact ? 14 : 14 }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const rawStyles = {
  cardWrapper: {
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
    backgroundColor: "transparent",
    opacity: 1,
  },
  noImage: {
    borderRadius: 20,
    backgroundColor: Colors.surface,
    flex: 1,
    width: "100%",
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    background: "transparent",
    overflow: "hidden",
  },

  backgroundImage: {
    borderRadius: 20,
  },
  overlay: {
    position: "absolute",
    left: 1,
    backgroundColor: "transparent",
    padding: 12,
    width: "100%",
    // zindex: -1
  },
  titleWrapper: {
    marginTop: 0,
    height: 30,
    justifyContent: "end",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: Fonts.body,
    marginLeft: 10,
    marginBottom: 0,
    bottom: 0,
  },
  titleNoImage: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: Fonts.body,
    alignItems: "center",
    textAlign: "center",
    marginLeft: 10,
    marginBottom: 5,
  },
  subTitleNoImage: {
    color: Colors.textDark,
    fontFamily: Fonts.body,
    textAlign: "center",
  },
};

const styles = StyleSheet.create(scaledStyle(rawStyles));
