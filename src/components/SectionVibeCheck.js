import React, { useState, useEffect } from "react";
import { Animated, View, Text, StyleSheet , TouchableOpacity} from "react-native";
import FastImage from "react-native-fast-image";
import { Colors, Fonts } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_WIDTH, SCREEN_HEIGHT, parseMetric } from "@/utils";
import { CardGradient } from "./CardGradient";



export const SectionVibeCheck = ({latestResult = null}) => {
  //  console.log(latestResult)
   const navigation = useNavigation();
   const [imageError, setImageError] = useState(false);
   const [latestResultDsiplay, setLatestResult] = useState(null);
   const [latestResultId, setLatestResultId] = useState(null);
   const image = require("@assets/images/home/vibe.png");

   useEffect(() => {
    if (latestResult) {
      const result =  `Latest Result: ${parseMetric(latestResult.hawkinsScore).score} on ${new Date(
        latestResult.timestamp,
        ).toLocaleDateString()}`;
      const resultId = latestResult.resultId;
      setLatestResult(result);
      setLatestResultId(resultId);
    }
  }, [latestResult]);

  const startVibeCheck = () => {
    navigation.navigate("VibeCheck", { screen: "VibeCheckScreen" });
  };
  const goToLatestResult = () => {
    navigation.navigate("VibeCheck", {
      screen: "Results",
      params: { resultId: latestResultId },
    });
  };

  return (
    <View style={styles.sectionContainer}>
      <CardGradient>
        <TouchableOpacity onPress={startVibeCheck} style={styles.cardWrapper}>
          <View style={[styles.card]}>
            <View style={[styles.textCard, { backgroundColor: "transparent" }]}>
              <View style={styles.textBlock}>
                <Text style={[styles.title, { color: Colors.buttonText }]} numberOfLines={2}>
                  Daily Vibe Check
                </Text>
                <Text style={[styles.subTitle, { color: Colors.buttonText }]} numberOfLines={2}>
                  Tap to check your frequency
                </Text>
              </View>

              {image && !imageError && (
                <FastImage
                  key={image}
                  source={image}
                  style={styles.imageRight}
                  resizeMode={FastImage.resizeMode.cover}
                  onError={() => setImageError(true)} // ✅ handle failure
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
        {latestResultDsiplay && (
          <TouchableOpacity onPress={goToLatestResult}>
            <View style={styles.results}>
              <Text style={styles.resultsText}>{latestResultDsiplay}</Text>
            </View>
          </TouchableOpacity>
        )}
      </CardGradient>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    marginBottom: 32,
  },
  cardWrapper: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    background: "transparent",
    width: SCREEN_WIDTH * 0.9,
  },
  card: {
    height: SCREEN_HEIGHT * 0.2,
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  textCard: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    justifyContent: "space-between",
    width: "96%",
    height: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "400",
    fontFamily: Fonts.body,
    alignItems: "center",
    textAlign: "center",
    marginBottom: 4.5,
  },
  subTitle: {
    fontFamily: Fonts.body,
    fontWeight: "300",
    textAlign: "center",
  },
  imageRight: {
    width: "38%",
    height: "75%",
    borderRadius: 16,
  },
  textBlock: {
    flex: 1,
    paddingRight: 10,
    justifyContent: "center",
  },
  results: {
    backgroundColor: "rgba(255,255,255,0.25)", //"#e0e0e0", //"#a0a0a0",
    borderWidth: 0.5,
    borderColor: "#ddd",
    width: "90%",
    alignSelf: "center",
    borderRadius: 16,
    marginBottom: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  resultsText: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    color: Colors.buttonText,
    fontFamily: Fonts.body,
    marginVertical: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)", // soft white line, adjust for dark background
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 0.5,
  },
});