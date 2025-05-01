import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import { VIBE_CHECK_SCREENS } from "@navigation";
import {
  GradientBackground,
  TypewriterText,
  FloatingPhrase,
} from "@components";
import { Fonts, Colors, buddhistSayings } from "@constants";

const EmotionTransitionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentIndex = VIBE_CHECK_SCREENS.indexOf(route.name);
  const { height } = useWindowDimensions();
  const [currentSaying, setCurrentSaying] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * buddhistSayings.length);
    setCurrentSaying(buddhistSayings[randomIndex]);

    const timer = setTimeout(() => {
      if (currentIndex < VIBE_CHECK_SCREENS.length - 1) {
        const nextScreen = VIBE_CHECK_SCREENS[currentIndex + 1];
        navigation.navigate(nextScreen);
      }
    }, 5000); // 5-second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <View style={styles.container}>
         {/* Quote */}
        <TypewriterText
          text={currentSaying}
          delay={50}
          style={styles.quoteText}
        />
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   justifyContent: "center",
    marginTop: 50,
 //   paddingHorizontal: 24,
    backgroundColor: "transparent",
  },
  quoteText: {
    fontSize: 48,
    fontFamily: Fonts.Script,
    color: Colors.vcButtonTextColor,
    marginLeft: 50,
    marginRight: 50,
    textAlign: "center",
    lineHeight: 64,
  //  paddingHorizontal: 10,
  },
});

export default EmotionTransitionScreen;
