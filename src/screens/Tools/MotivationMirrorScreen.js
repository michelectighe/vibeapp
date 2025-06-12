// MotivationalMirrorCard.js
import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import LinearGradient from "react-native-linear-gradient";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { reflectionPrompts, affirmations } from "@/data";
import { GradientBackground, MirrorCarousel, GlowingDivider, SectionLayout } from "@/components";

export const MotivationMirrorScreen = () => {
  const device = useCameraDevice("front");
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ gestureEnabled: false });
  }, [navigation]);
  
  if (!device) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Loading mirror...</Text>
      </View>
    );
  }

  return (
    <GradientBackground>
      <SectionLayout
        topFlex={1}
        middleFlex={1}
        bottomFlex={0}
        topContent={
          <View style={styles.mirrorWrapper}>
            <View style={styles.lightedBorder}>
              <LinearGradient
                colors={["#ffffff", "#ffd700", "#ffffff"]}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.mirrorContainer}>
                <Camera device={device} isActive={true} photo={false} style={styles.camera} />
              </View>
            </View>
          </View>
        }
        middleContent={
          <>
            <GlowingDivider width={SCREEN_WIDTH} height={2} />
            <View style={{ paddingBottom: 10 }}>
              <MirrorCarousel items={reflectionPrompts} type="prompt" />
              <MirrorCarousel items={affirmations} type="affirmation" />
            </View>
          </>
        }
      />
    </GradientBackground>
  );
};
const styles = StyleSheet.create({
  mirrorWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  lightedBorder: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    borderRadius: SCREEN_WIDTH * 0.4,
    overflow: "hidden",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    position: "relative",
  },

  mirrorContainer: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_WIDTH * 0.75,
    borderRadius: SCREEN_WIDTH * 0.375,
    overflow: "hidden",
    backgroundColor: Colors.cardBackground,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  camera: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },

  placeholder: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: Colors.cardBackground,
    alignSelf: "center",
    marginVertical: 20,
  },
  placeholderText: {
    color: Colors.cardText,
    fontFamily: Fonts.body,
    fontSize: 16,
  },
});
