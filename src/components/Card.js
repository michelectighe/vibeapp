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
  bgColor = Colors.surface,
  pulse = false,
  isNews = false,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [imageError, setImageError] = useState(false);
  //console.log("title:", title);
  //console.log("isNews:", isNews);
  useEffect(() => {
    if (pulse) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.02,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [pulse]);

  const AnimatedWrapper = pulse ? Animated.View : View;

  return (
    <View>
      {image && !isNews && (
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
              { height: isSquished ? SCREEN_HEIGHT * 0.1 : SCREEN_HEIGHT * 0.2 },
            ]}
          >
            {image && !isNews && (
              <FastImage
                style={[StyleSheet.absoluteFill, styles.image]}
                source={image}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
            {isNews && (
              <View style={[styles.newsCard, { backgroundColor: bgColor }]}>
                <View style={styles.newsTextBlock}>
                  <Text style={[styles.titleNoImage, { color: textColor }]} numberOfLines={2}>
                    {title}
                  </Text>
                  <Text style={[styles.subTitleNoImage, { color: textColor }]} numberOfLines={2}>
                    {subtitle}
                  </Text>
                </View>

                {image && !imageError && (
                  <FastImage
                    key={image}
                    source={image}
                    style={styles.newsImageRight}
                    resizeMode={FastImage.resizeMode.cover}
                    onError={() => setImageError(true)} // ✅ handle failure
                  />
                )}
              </View>
            )}

            {!image && !isNews && (
              <View style={[styles.noImage, { backgroundColor: bgColor }]}>
                <Text style={[styles.titleNoImage, { color: textColor }]}>{title}</Text>
                <Text
                  style={[
                    styles.subTitleNoImage,
                    { color: textColor, fontSize: isCompact ? 14 : 14 },
                  ]}
                >
                  {subtitle}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
      {image && !isNews && (
        <Text style={[styles.subTitle, { color: textColor, fontSize: isCompact ? 14 : 14 }]}>
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
    opacity: 0.8,
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
  subTitle: {
    textAlign: "center",
    fontWeight: "500",
    fontFamily: Fonts.body,
    marginTop: 5,
  },
  titleNoImage: {
    fontSize: 16,
    fontWeight: "700",
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
  newsCard: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },

  newsTextBlock: {
    flex: 1,
    paddingRight: 10,
    justifyContent: "center",
  },

  newsImageRight: {
    width: "35%",
    height: "90%",
    borderRadius: 12,
  },
};

const styles = StyleSheet.create(scaledStyle(rawStyles));
