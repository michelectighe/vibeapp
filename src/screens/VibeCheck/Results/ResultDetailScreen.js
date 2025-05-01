import React, { useState, useEffect, useContext } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAnalysis } from "@context";
import { VIBE_CHECK_SCREENS } from "@navigation";
import {
  GradientBackground,
  CustomSpiritualButton,
  ScrollContainer,
  CloseX,
} from "@components";
import { getVibeDetails } from "@utils";
import { Colors, Fonts } from "@constants";

export default function ResultDetailScreen({
  navigation,
  close,
  setNextScreen,
}) {
  const backgroundImage = require("@assets/images/backgroundVibeCheck.webp");
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
  const [showChakraScreen, setShowChakraScreen] = useState();

  useEffect(() => {
    return () => {
      console.log("Cleaning up ResultsScreen...");
    };
  }, []);

  useEffect(() => {
    const details = getVibeDetails(overallVibrationScore);
    if (details) {
      setOverallLabel(details.label);
      setOverallText1(details.text1);
      setLabel2(details.label2);
      setOverallText2(details.text2);
      setLabel3(details.label3);
      setOverallText3(details.text3);
      setLabel4(details.label4);
      setOverallText4(details.text4);
      setLabel5(details.label5);
      setOverallText5(details.text5);
      setColor(details.color);
      setColor2(details.color2);
    }
  }, []);

  const goToNextScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CloseX xColor={overallColor} onPress={() => navigation.goBack()} />
      <View style={{ marginTop: "20%" }}>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            textShadowRadius: 1,
            textShadowOffset: { width: 1, height: 1 },
            textShadowColor: overallColor,
            fontSize: 36,
          }}
        >
          {overallLabel}
        </Text>
      </View>
      <ScrollView>
        <View
          style={[
            styles.textContainer,
            { backgroundColor: overallColor, marginTop: 20 },
          ]}
        >
          <Text style={styles.overallText}>{overallText1}</Text>
        </View>
        <View style={[styles.textContainer, { backgroundColor: overallColor }]}>
          <Text style={styles.chicletHeader}>Curated Spiritual Collection</Text>

          <View style={{ marginTop: 10 }}>
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
          <Text style={{ textAlign: "center", fontSize: 18, color: "#f5f6fa" }}>
            By recognizing these factors and implementing spiritual practices,
            you can gradually raise your vibrational frequency and realign with
            your highest potential.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  textHeader: {
    textAlign: "center",
    fontSize: 18,
    fontStyle: "bold",
    color: "#f5f6fa",
  },
  overallText: {
    textAlign: "center",
    fontSize: 18,
    color: "#f5f6fa",
  },
  textContainer: {
    margin: 20,
    marginTop: 0,
    borderRadius: 20,
    padding: 10,
  },
  chicletWrapper: {
    marginTop: 10,
    marginBottom: 10,
    gap: 10,
    alignItems: "center",
  },
  chicletHeader: {
    textAlign: "center",
    fontSize: 18,
    color: "#f5f6fa",
    marginBottom: 10,
  },
  chicletContainer: {
    gap: 12, // vertical spacing between chiclets
    paddingVertical: 10,
    alignItems: "center",
  },
});
