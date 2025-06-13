// MotivationalMirrorCard.js
import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import LinearGradient from "react-native-linear-gradient";
import { Colors, Fonts } from "@constants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { reflectionPrompts, affirmations } from "@/data";
import { styles } from "./MotivationalMirrorScreen.styles";
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
    <GradientBackground colors={[Colors.white, Colors.white, Colors.white]}>
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
              <MirrorCarousel
                items={reflectionPrompts}
                type="prompt"
                gradientColors={Colors.dbtMindfulness}
              />
              <MirrorCarousel
                items={affirmations}
                type="affirmation"
                gradientColors={Colors.dbtInterpersonalEffectiveness}
              />
            </View>
          </>
        }
      />
    </GradientBackground>
  );
};
