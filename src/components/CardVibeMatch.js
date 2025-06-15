import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT } from "@/utils";
import { CardGradient } from "./CardGradient";
import { GlowingDivider } from "./GlowingDivider";

export const CardVibeMatch = ({ title, subtitle, onPress, image, textColor = Colors.cardText, divider = false }) => {
  return (
    <CardGradient colors={[Colors.gradient4, Colors.gradient2]} style={styles.cardWrapper}>
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <View style={styles.imageWrapper}>
          <FastImage style={styles.image} source={image} resizeMode={FastImage.resizeMode.cover} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          {divider && <GlowingDivider height={2} />}
          <Text style={[styles.subTitle, { color: textColor }]}>{subtitle}</Text>
        </View>
      </TouchableOpacity>
    </CardGradient>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    height: SCREEN_HEIGHT * 0.31,
    borderRadius: 16,
    overflow: "hidden",
  },
  touchable: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  top: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
    overflow: "hidden",
    margin: 10,
    ...StyleSheet.absoluteFill,
  },
  imageWrapper: {
    height: "55%",
    width: "100%",
    overflow: "hidden",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 10,
  },
  image: {
    borderRadius: 16,
    width: "100%",
    height: "100%",
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily: Fonts.body,
    color: Colors.cardText,
    textAlign: "center",
    marginBottom: 10,
  },

  subTitle: {
    fontSize: 14,
    fontWeight: "300",
    fontFamily: Fonts.body,
    textAlign: "center",
    marginTop: 4,
  },
});
