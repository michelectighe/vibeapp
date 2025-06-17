// MotivationalMirrorCard.js
import React, { useLayoutEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/utils";
import { styles } from "./MotivationMirrorScreen.styles";
import { SectionLayout, EnvelopeReveal , FuzzyGlowChakra} from "@/components";
import { Colors } from "@/constants";


export const MotivationMirrorScreen = () => {
  const device = useCameraDevice("front");
  const navigation = useNavigation();
  const mirrorImage = require("@assets/images/mirror1.png");
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
    <ImageBackground
      style={{ flex: 1, width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 1.15 }}
      source={mirrorImage}
      resizeMode="stretch"
    >
      <SectionLayout
        topFlex={3}
        middleFlex={1}
        bottomFlex={0}
        safe={false}
        topContent={
          <View style={styles.mirrorWrapper}>
            <View style={styles.mirrorGlowWrapper}>
              <FuzzyGlowChakra
                glowSize={SCREEN_WIDTH * 1.1}
                glowColor={Colors.white} // or another color from your palette
              />
              <View style={styles.lightedBorder}>
                <View style={styles.mirrorContainer}>
                  <Camera device={device} isActive={true} photo={false} style={styles.camera} />
                </View>
              </View>
            </View>
          </View>
        }
        middleContent={
          <>
            <View style={{ paddingBottom: 100 }}>
              <EnvelopeReveal />
            </View>
          </>
        }
      />
    </ImageBackground>
  );
};
