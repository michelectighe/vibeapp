import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useAnalysis } from "@context";
import { CustomSpiritualButton, CloseX } from "@components";
import { vibrationLevels } from "@data";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./ResultDetailsScreen.styles";
import { globalStyles } from "@styles";

export const ResultDetailScreen = ({ navigation }) => {
  useAmbientControlForScreen(true);
  const { overallVibrationScore } = useAnalysis();

  const [overallLabel, setOverallLabel] = useState();
  const [overallText1, setOverallText1] = useState();
  const [overallText2, setOverallText2] = useState();
  const [overallText3, setOverallText3] = useState();
  const [overallText4, setOverallText4] = useState();
  const [overallText5, setOverallText5] = useState();
  const [overallColor, setColor] = useState();
  const [overallColor2, setColor2] = useState();
  const [label2, setLabel2] = useState();
  const [label3, setLabel3] = useState();
  const [label4, setLabel4] = useState();
  const [label5, setLabel5] = useState();

  const getVibrationInfo = (score) => vibrationLevels.find((level) => score >= level.minScore);

  useEffect(() => {
    const result = getVibrationInfo(overallVibrationScore);
    if (!result) return;
    if (result) {
      setOverallLabel(result.label);
      setOverallText1(result.text1);
      setLabel2(result.label2);
      setOverallText2(result.text2);
      setLabel3(result.label3);
      setOverallText3(result.text3);
      setLabel4(result.label4);
      setOverallText4(result.text4);
      setLabel5(result.label5);
      setOverallText5(result.text5);
      setColor(result.color);
      setColor2(result.color2);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={styles.root}>
      <CloseX xColor={overallColor} onPress={() => navigation.goBack()} />

      <View style={styles.headerContainer}>
        <Text style={[styles.overallLabel, { textShadowColor: overallColor }]}>{overallLabel}</Text>
      </View>

      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={globalStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.textContainer, { backgroundColor: overallColor }]}>
          <Text style={styles.overallText}>{overallText1}</Text>
        </View>

        <View style={[styles.textContainer, { backgroundColor: overallColor }]}>
          <Text style={styles.chicletHeader}>Curated Spiritual Collection</Text>
          <View style={styles.chicletWrapper}>
            <CustomSpiritualButton
              label="Energy Cleanse"
              onPress={() => navigation.navigate("EnergyCleanseScreen")}
              color={overallColor2}
              textColor={overallColor}
            />
            <CustomSpiritualButton
              label="Journal"
              onPress={() => navigation.navigate("JournalScreen")}
              color={overallColor2}
              textColor={overallColor}
            />
            <CustomSpiritualButton
              label="Chakra Balance"
              onPress={() => navigation.navigate("ChakraScreen")}
              color={overallColor2}
              textColor={overallColor}
            />
          </View>
        </View>

        <View style={[styles.textContainer, { backgroundColor: overallColor }]}>
          <Text style={styles.textHeader}>{label2}</Text>
          <Text style={styles.overallText}>{overallText2}</Text>
        </View>

        <View style={[styles.textContainer, { backgroundColor: overallColor }]}>
          <Text style={styles.textHeader}>{label3}</Text>
          <Text style={styles.overallText}>{overallText3}</Text>
        </View>

        <View style={[styles.textContainer, { backgroundColor: overallColor }]}>
          <Text style={styles.textHeader}>{label4}</Text>
          <Text style={styles.overallText}>{overallText4}</Text>
        </View>

        <View style={[styles.textContainer, { backgroundColor: overallColor }]}>
          <Text style={styles.textHeader}>{label5}</Text>
          <Text style={styles.overallText}>{overallText5}</Text>
        </View>

        <View style={[styles.textContainer, { backgroundColor: overallColor }]}>
          <Text style={styles.finalNote}>
            By recognizing these factors and implementing spiritual practices, you can gradually
            raise your vibrational frequency and realign with your highest potential.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
