import React, {
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";

import {
  ImageBackground,
  StatusBar,
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

//import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { useWindowDimensions } from "react-native";
import { ProgressDots, HomeButton } from "@components";
import { MEDITATION_SCREENS } from "@navigation/screens"; // ✅ Import once, use everywhere
import { useRoute } from "@react-navigation/native";
import { useEnvironment } from "@context";
import { Fonts, Colors } from "@constants";
import { styles } from "./MeditationSpaceScreen.styles";
const { width } = Dimensions.get("window");

export const MeditationSpaceScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { environment } = useEnvironment();
  const cardWidth = width * 0.5;
  const cardHeight = width * 0.5;
  const [combinedCalm, setCombinedCalm] = useState(0);
  const [spaceLabel, setSpaceLabel] = useState("Neutral");
  const [magLabel, setMagLabel] = useState("");
  const [soundLabel, setSoundLabel] = useState("");
  const glowAnim = useRef(new Animated.Value(0.5)).current; // Controls glow size & opacity
  const [glowSizeNum, setGlowSizeNum] = useState(width * 0.5);
  const imageFade = useRef(new Animated.Value(0)).current;

  const [glowColor, setGlowColor] = useState("#FFFF66");
  const route = useRoute();
  const currentIndex = MEDITATION_SCREENS.indexOf(route.name);
  const goToNextScreen = () => {
    if (currentIndex < MEDITATION_SCREENS.length - 1) {
      const nextScreen = MEDITATION_SCREENS[currentIndex + 1];
      navigation.navigate(nextScreen);
    }
  };
  const goBack = () => {
    if (currentIndex > 0) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    Animated.timing(imageFade, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  // const swipeGesture = Gesture.Pan().onEnd((event) => {
  //   if (event.translationX < 50 && event.velocityX < 0) {
  //     // Swipe left → Go forward
  //     runOnJS(goToNextScreen)();
  //   } else if (event.translationX > 50 && event.velocityX > 0) {
  //     // Swipe right → Go back
  //     runOnJS(goBack)();
  //   }
  // });

  // Update calm score based on sound & magnetometer data
  useEffect(() => {
    if (
      environment &&
      environment.overall &&
      environment.magnetometer &&
      environment.sound
    ) {
      // //console.log("environment in meditation screen:", environment);
      setSoundLabel(environment.sound.label);
      setMagLabel(environment.magnetometer.label);
      setCombinedCalm(environment.overall.score);
      setSpaceLabel(environment.overall.label);
    }
  }, [environment]);

  useEffect(() => {
    setGlowColor("white");
    setGlowSizeNum(100);
    const scaledSize = 30;
    Animated.timing(glowAnim, {
      toValue: scaledSize,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false, // Width/height cannot be animated with `useNativeDriver: true`
    }).start();
  }, [combinedCalm]); // ✅ Runs when calmness changes

  useEffect(() => {
    const listener = glowAnim.addListener(({ value }) => {
      const newSize = width * (0.2 + value * 0.8); // Scale between 30% - 80%
      setGlowSizeNum(1000);
    });

    return () => glowAnim.removeListener(listener);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      {/* <GestureDetector gesture={swipeGesture}> */}
      <View
        style={{ flex: 1, width: "100%", height: "100%" }}
        className="items-center"
      >
        <ImageBackground
          style={{ flex: 1, width: "100%", height: "100%" }}
          source={require("@assets/images/backgroundMeditation.webp")}
          resizeMode="cover"
        >
          <HomeButton />
          <TouchableOpacity
            className="p-4 rounded-2xl items-center shadow-md"
            onPress={() => navigation.navigate(item.screen)}
            style={{ width: cardWidth, height: cardHeight }} // Dynamically adjust size
          />

          <Text
            style={{
              marginTop: 0,
              textAlign: "center",
              color: Colors.textPrimary,
            }}
            className="font-AppFont text-2xl font-semibold text-textSecondary"
          >
            Sound: {soundLabel}
          </Text>
          <Text
            style={{
              marginTop: 0,
              textAlign: "center",
              color: Colors.textPrimary,
            }}
            className="font-AppFont text-2xl font-semibold text-textSecondary"
          >
            Magnitude: {magLabel}
          </Text>

          <Text
            style={{
              marginTop: 0,
              textAlign: "center",
              color: Colors.textPrimary,
            }}
            className="font-AppFont text-2xl font-semibold text-textSecondary"
          >
            Overall: {spaceLabel}
          </Text>

          {/* Calmness Score */}
          {!isNaN(combinedCalm) && (
            <Text
              style={{
                textAlign: "center",
                color: Colors.textPrimary,
              }}
              className="font-AppFont text-3xl font-semibold text-textSecondary mt-5"
            >
              {combinedCalm.toFixed(0)}
            </Text>
          )}
          <View className="absolute bottom-10 flex-row left-0 right-0 items-center p-4">
            <View className="flex-row items-center justify-between w-3/8 mt-10">
              <View className="flex-column items-center justify-between w-4/8 mt-10"></View>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              className="p-4 rounded-2xl items-center shadow-md"
              onPress={goToNextScreen}
            >
              <Animated.View
                style={{
                  //   flex: 1,
                  overflow: "hidden",
                  opacity: imageFade,
                  borderRadius: 70,
                  backgroundColor: "transparent",
                  height: 150,
                  width: 150,
                  alignItems: "center",
                  alignContent: "center",
                  lef: 0,
                  right: 0,
                  top: "0%",
                }}
              >
                <ImageBackground
                  source={require("@assets/images/buttonMeditate.png")}
                  resizeMode="cover"
                  style={{
                    width: 150,
                    height: 150,
                    backgroundColor: "transparent",
                    alignSelf: "center",
                    position: "absolute",
                    marginTop: 10,
                    left: 0,
                    right: 0,
                  }}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
          {/* <ProgressDots
              currentIndex={currentIndex}
              totalScreens={MEDITATION_SCREENS.length}
            /> */}
        </ImageBackground>
      </View>
      {/* </GestureDetector> */}
    </SafeAreaView>
  );
};
