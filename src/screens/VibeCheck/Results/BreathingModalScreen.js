import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { BreathingCircle, GradientBackground, SectionLayout, CloseX } from "@components";
import { useAnalysis } from "@context";
import { Colors } from "@/constants";
import { useAmbientControlForScreen } from "@hooks";
import { useRoute, useNavigation } from "@react-navigation/native";
import { styles } from "./BreathingModalScreen.styles";

export const BreathingModalScreen = () => {
  useAmbientControlForScreen(true);
  const route = useRoute();
  const { pattern } = route.params;
  const navigation = useNavigation();
  const vibrationInfo = useAnalysis();
  const [overallColor, setColor] = useState();
  const [overallColor2, setColor2] = useState();
  const [overallColor3, setColor3] = useState();
  const [overallColor4, setColor4] = useState();

  useEffect(() => {
    const result = vibrationInfo;
    if (result == null) return;

    console.log("result:", result);
    setColor(result.auraColor);
    setColor2(result.color2);
    setColor3(result.color3);
    setColor4(result.color4);
  }, [vibrationInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!overallColor) {
    return (
      <GradientBackground colors={[Colors.white, Colors.white, Colors.white]}>
        <View style={[{ flex: 1 }]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground colors={[overallColor, overallColor2, overallColor3]} logo={false}>
      <CloseX xColor={Colors.textDark} onPress={() => navigation.goBack()} />
      <SectionLayout
        topFlex={6}
        middleFlex={3}
        bottomFlex={1}
        topContent={
          <View style={styles.middle}>
            <BreathingCircle pattern={pattern} key={pattern.id} />
          </View>
        }
        middleContent={<></>} // no selector
        bottomContent={
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>{pattern.name}</Text>
            <Text style={styles.description}>{pattern.description}</Text>
            <Text style={styles.timing}>
              {pattern.inhale}-{pattern.hold1}-{pattern.exhale}
              {pattern.hold2 ? `-${pattern.hold2}` : ""}
            </Text>
          </View>
        }
      />
    </GradientBackground>
  );
};
