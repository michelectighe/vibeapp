import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useAnalysis } from "@context";
import { CustomSpiritualButton, CloseX } from "@components";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./ResultDetailsScreen.styles";
import { globalStyles } from "@styles";
import { ResultsBackground, CardGradient } from "@/components";
import { Colors } from "@/constants";
import { hexToRgba } from "@/utils";

export const ResultDetailScreen = ({ navigation }) => {
  useAmbientControlForScreen(true);
  const { vibrationInfo } = useAnalysis();

  const [overallLabel, setOverallLabel] = useState();
  const [overallText1, setOverallText1] = useState();
  const [overallText2, setOverallText2] = useState();
  const [overallText3, setOverallText3] = useState();
  const [overallText4, setOverallText4] = useState();
  const [overallText5, setOverallText5] = useState();
  const [overallColor, setColor] = useState();
  const [overallColor2, setColor2] = useState();
  const [overallColor3, setColor3] = useState();
  const [overallColor4, setColor4] = useState();
  const [viewColor, setViewColor] = useState();
  const [label2, setLabel2] = useState();
  const [label3, setLabel3] = useState();
  const [label4, setLabel4] = useState();
  const [label5, setLabel5] = useState();

  useEffect(() => {
    const result = vibrationInfo;
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
      setColor3(result.color3);
      setColor4(result.color4);
      setViewColor(hexToRgba(result.color3));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!overallColor) {
    return (
      <ResultsBackground glowColor={Colors.white}>
        <View style={[globalStyles.centered, { flex: 1 }]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </ResultsBackground>
    );
  }

  return (
    <ResultsBackground glowColor={overallColor}>
      <View style={styles.root}>
        <CloseX  style={{top: 50}} xColor={overallColor4} onPress={() => navigation.goBack()} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
            <Text
              style={[
                styles.overallLabel,
                { color: overallColor, textShadowColor: overallColor4 },
              ]}
            >
              {overallLabel}
            </Text>

          {/* <View style={[styles.textContainer, { backgroundColor: viewColor }]}> */}
          <CardGradient
            style={[styles.textContainer, { borderColor: overallColor4}]}
            colors={[overallColor4, overallColor2]}
          >
            <Text style={[styles.overallText, { color: overallColor }]}>{overallText1}</Text>
            {/* </View> */}
          </CardGradient>

          {/* <View style={[styles.textContainer, { backgroundColor: viewColor }]}> */}
          <Text style={[styles.chicletHeader, { color: overallColor }]}>
            Curated Spiritual Collection
          </Text>

          <View style={styles.chicletWrapper}>
            <CustomSpiritualButton
              label="Energy Cleanse"
              onPress={() => navigation.navigate("EnergyCleanseScreen")}
              color={overallColor4}
              textColor={overallColor}
            />
            <CustomSpiritualButton
              label="Chakra Balance"
              onPress={() => navigation.navigate("ChakraScreen")}
              color={overallColor4}
              textColor={overallColor}
            />
            <CustomSpiritualButton
              label="Detailed Results"
              onPress={() => navigation.navigate("ResultsBreakdown")}
              color={overallColor4}
              textColor={overallColor}
            />
          </View>
          {/* </View> */}

          <CardGradient
            style={[styles.textContainer, { borderColor: overallColor4 }]}
            colors={[overallColor4, overallColor2]}
          >
            {/* <View style={[styles.textContainer, { backgroundColor: viewColor }]}> */}
            <Text style={[styles.textHeader, { color: overallColor }]}>{label2}</Text>
            <Text style={[styles.overallText, { color: overallColor }]}>{overallText2}</Text>
            {/* </View> */}
          </CardGradient>

          <CardGradient
            style={[styles.textContainer, { borderColor: overallColor2 }]}
            colors={[overallColor4, overallColor2]}
          >
            <Text style={[styles.textHeader, { color: overallColor }]}>{label3}</Text>
            <Text style={[styles.overallText, { color: overallColor }]}>{overallText3}</Text>
          </CardGradient>

          <CardGradient
            style={[styles.textContainer, { borderColor: overallColor2 }]}
            colors={[overallColor4, overallColor2]}
          >
            <Text style={[styles.textHeader, { color: overallColor }]}>{label4}</Text>
            <Text style={[styles.overallText, { color: overallColor }]}>{overallText4}</Text>
          </CardGradient>

          <CardGradient
            style={[styles.textContainer, { borderColor: overallColor2}]}
            colors={[overallColor4, overallColor2]}
          >
            <Text style={[styles.textHeader, { color: overallColor }]}>{label5}</Text>
            <Text style={[styles.overallText, { color: overallColor }]}>{overallText5}</Text>
          </CardGradient>
        </ScrollView>
      </View>
    </ResultsBackground>
  );
};
