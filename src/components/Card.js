import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, Animated, View, Text, StyleSheet } from "react-native";
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
  bgColor = Colors.cardBackground,
  pulse = false,
  pulseSub = false,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    if (pulse || pulseSub) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [pulse]);

  const AnimatedWrapper = pulse ? Animated.View : View;

  return (
    <View>
      {image && (
        <View style={styles.titleWrapper}>
          <Text style={[styles.title, { color: textColor, fontSize: isCompact ? 16 : 18 }]}>
            {title}
          </Text>
        </View>
      )}
      <Animated.View style={pulse ? { transform: [{ scale: pulseAnim }] } : null}>
        <TouchableOpacity onPress={onPress} style={styles.cardWrapper}>
          <View
            style={[
              styles.card,
              {
                height: isSquished ? SCREEN_HEIGHT * 0.05 : SCREEN_HEIGHT * 0.2,
                marginTop: isSquished ? 10 : 0,
              },
            ]}
          >
            {image && (
              <FastImage
                style={[StyleSheet.absoluteFill, styles.image]}
                source={image}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}

            {!image && (
              <View style={[styles.noImage, { backgroundColor: bgColor }]}>
                <Text style={[styles.titleNoImage, { color: textColor }]}>{title}</Text>
                {subtitle && (
                  <Text style={[styles.subTitleNoImage, { color: textColor, fontSize: 14 }]}>
                    {subtitle}
                  </Text>
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={pulseSub ? { transform: [{ scale: pulseAnim }] } : null}>
        {image && (
          <Text style={[styles.subTitle, { color: textColor, fontSize: isCompact ? 14 : 14 }]}>
            {subtitle}
          </Text>
        )}
      </Animated.View>
    </View>
  );
};

const rawStyles = {
  cardWrapper: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    background: "transparent",
    borderWidth: 1,
    borderColor: "white",
  },

  image: {
    borderRadius: 16,
    backgroundColor: "transparent",
    opacity: 1,
  },

  noImage: {
    borderRadius: 16,
    opacity: 0.8,
    flex: 1,
    width: "100%",
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    background: "transparent",
  },

  backgroundImage: {
    borderRadius: 16,
  },
  titleWrapper: {
    marginTop: 0,
    height: 30,
    justifyContent: "end",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 20,
    fontWeight: "300",
    fontFamily: Fonts.body,
    marginLeft: 10,
    marginBottom: 0,
    bottom: 0,
  },
  subTitle: {
    textAlign: "center",
    fontWeight: "300",
    fontFamily: Fonts.body,
    marginTop: 5,
  },
  titleNoImage: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: Fonts.body,
    alignItems: "center",
    textAlign: "center",
    marginBottom: 5,
  },
  subTitleNoImage: {
    fontFamily: Fonts.body,
    fontWeight: "500",
    textAlign: "center",
  },


  newsTextBlock: {
    flex: 1,
    paddingRight: 10,
    justifyContent: "center",
  },
};

const styles = StyleSheet.create(scaledStyle(rawStyles));
