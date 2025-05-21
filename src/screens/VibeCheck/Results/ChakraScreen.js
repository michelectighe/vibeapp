import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAnalysis } from "@context";
import { CloseX, ChakraCard } from "@components";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./ChakraScreen.styles";
import { Colors } from "@/constants";
import { SCREEN_WIDTH } from "@/utils";
import { GradientBackground, SectionLayout } from "@/components";

const chakraMeta = [
  { id: "root", name: "Root", color: Colors.rootChakra, textColor: Colors.rootChakraText },
  { id: "sacral", name: "Sacral", color: Colors.sacralChakra, textColor: Colors.sacralChakraText },
  {
    id: "solarPlexus",
    name: "Solar Plexus",
    color: Colors.solarPlexusChakra,
    textColor: Colors.solarPlexusChakraText,
  },
  { id: "heart", name: "Heart", color: Colors.heartChakra, textColor: Colors.heartChakraText },
  { id: "throat", name: "Throat", color: Colors.throatChakra, textColor: Colors.throatChakraText },
  {
    id: "thirdEye",
    name: "Third Eye",
    color: Colors.thirdEyeChakra,
    textColor: Colors.thirdEyeChakraText,
  },
  { id: "crown", name: "Crown", color: Colors.crownChakra, textColor: Colors.crownChakraText },
];

export const ChakraScreen = () => {
  useAmbientControlForScreen(true);
  const { chakraScores, vibrationInfo } = useAnalysis();
  const navigation = useNavigation();
  const [overallColor, setColor] = useState();
  const [overallColor2, setColor2] = useState();
  const [overallColor3, setColor3] = useState();
  const [overallColor4, setColor4] = useState();

  useEffect(() => {
    if (vibrationInfo == null) return;
    setColor(vibrationInfo.color);
    setColor2(vibrationInfo.color2);
    setColor3(vibrationInfo.color3);
    setColor4(vibrationInfo.color4);
  }, [vibrationInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePress = (event, chakra) => {
    const { pageX, pageY } = event.nativeEvent;
    navigation.navigate("ChakraDetailModal", {
      chakra,
      originX: pageX,
      originY: pageY,
    });
  };

  const personalizedChakraData = chakraMeta.map((chakra) => ({
    ...chakra,
    score: chakraScores[chakra.id] ?? 0,
    meaning: `Balance your ${chakra.name} chakra`,
  }));
  const topChakra = personalizedChakraData.reduce((max, chakra) =>
    chakra.score > max.score ? chakra : max,
  );

  return (
    <GradientBackground colors={["#d2cfff", "#b3bfff", "#6a7cff"]} logo={false}>
      {/* <GradientBackground colors={["#d2c8ff", "#a2b6ff", "#405480"]} logo={false}> */}
      <CloseX xColor={overallColor4} onPress={() => navigation.goBack()} />

      <SectionLayout
        topFlex={1}
        middleFlex={0}
        bottomFlex={0}
        safe={false}
        topContent={
          <>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {topChakra && (
                <View style={styles.titleWrapper}>
                  <Text style={[styles.title, { color: topChakra.color }]}>Chakra Balance</Text>
                </View>
              )}
              {personalizedChakraData.map((chakra) => (
                <ChakraCard
                  key={chakra.id}
                  chakra={chakra}
                  onPress={(event) => handlePress(event, chakra)}
                />
              ))}
            </ScrollView>
          </>
        }
      />
    </GradientBackground>
  );
};
