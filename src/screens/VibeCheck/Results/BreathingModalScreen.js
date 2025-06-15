import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { BreathingCircle, ResultsBackground, SectionLayout, CloseX } from "@components";
import { useAnalysis } from "@context";
import { Colors } from "@/constants";
import { useAmbientControlForScreen } from "@hooks";
import { useRoute, useNavigation } from "@react-navigation/native";
import { styles } from "./BreathingModalScreen.styles";

export const BreathingModalScreen = () => {
  useAmbientControlForScreen(true);
  const { vibrationInfo } = useAnalysis();
  //console.log("vibrationInfo:", vibrationInfo);
  const route = useRoute();
  const { pattern } = route.params;
  const navigation = useNavigation();
  const [overallColor, setColor] = useState();
  const [overallColor2, setColor2] = useState();
  const [overallColor3, setColor3] = useState();
  const [overallColor4, setColor4] = useState();

  useEffect(() => {
    const result = vibrationInfo;
 //   console.log("result");
    if (result == null) return;

  //  console.log("result:", result);
    setColor(result.color);
    setColor2(result.color2);
    setColor3(result.color3);
    setColor4(result.color4);
  }, [vibrationInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!overallColor) {
    return (
      <ResultsBackground glowColor={Colors.white}>
        <CloseX xColor={Colors.textDark} onPress={() => navigation.goBack()} />
        <View style={[{ flex: 1 }]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </ResultsBackground>
    );
  }

  return (
    <ResultsBackground glowColor={overallColor}>
      <CloseX xColor={overallColor4} onPress={() => navigation.goBack()} />
      <SectionLayout
        topFlex={6}
        middleFlex={1}
        bottomFlex={1}
        topContent={
          <View style={styles.middle}>
            <BreathingCircle
              pattern={pattern}
              //    key={pattern.id}
              fuzzyColor={overallColor3}
              textColor={overallColor2}
            />
          </View>
        }
        middleContent={<></>} // no selector
        bottomContent={
          <View style={[styles.bottomText, { alignItems: "center" }]}>
            <Text style={[styles.title, { color: overallColor }]}>{pattern.title}</Text>
            <Text style={[styles.description, { color: overallColor }]}>
              {pattern.description}
            </Text>
            <Text style={[styles.timing,{color: overallColor}] }>
             ({pattern.inhale}-{pattern.hold1}-{pattern.exhale}
              {pattern.hold2 ? `-${pattern.hold2}` : ""})
            </Text>
          </View>
        }
      />
    </ResultsBackground>
  );
};
