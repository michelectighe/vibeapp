import React, {  useEffect, useRef } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Animated as RNAnimated } from "react-native";
import FastImage from "react-native-fast-image";
import { Colors, Fonts } from "@constants";
import { scaledStyle } from "@utils";
import { SCREEN_HEIGHT } from "@/utils";
import Animated,{
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from "react-native-reanimated";


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
  cloudAnim = false,
}) => {
  const pulseAnim = useRef(new RNAnimated.Value(1)).current;
  const sway = useSharedValue(0);

  useEffect(() => {
    sway.value = withRepeat(
      withSequence(withTiming(3, { duration: 4000 }), withTiming(-3, { duration: 4000 })),
      -1,
      true,
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pulse || pulseSub) {
      RNAnimated.loop(
        RNAnimated.sequence([
          RNAnimated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1500,
            useNativeDriver: true,
          }),
          RNAnimated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [pulse]); // eslint-disable-line react-hooks/exhaustive-deps

  const swayStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: sway.value },
        { scale: 1.05 }, // slightly zoomed in to prevent gaps
      ],
    };
  });

  return (
    <View>
      {image && (
        <View style={styles.titleWrapper}>
          <Text style={[styles.title, { color: textColor, fontSize: isCompact ? 16 : 18 }]}>
            {title}
          </Text>
        </View>
      )}
      <RNAnimated.View style={pulse ? { transform: [{ scale: pulseAnim }] } : null}>
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
            {cloudAnim && (
              <Animated.Image
                source={image}
                style={[styles.cloudImage, swayStyle]}
                resizeMode="cover"
              />
            )}

            {image && !cloudAnim && (
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
      </RNAnimated.View>
      <RNAnimated.View style={pulseSub ? { transform: [{ scale: pulseAnim }] } : null}>
        {image && (
          <Text style={[styles.subTitle, { color: textColor, fontSize: isCompact ? 14 : 14 }]}>
            {subtitle}
          </Text>
        )}
      </RNAnimated.View>
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
    backgroundColor: "transparent",
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

  cloudImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },

  newsTextBlock: {
    flex: 1,
    paddingRight: 10,
    justifyContent: "center",
  },
};

const styles = StyleSheet.create(scaledStyle(rawStyles));
