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
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  SafeAreaView,
} from "react-native";
//import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import {
  GradientBackground,
  HomeButton,
  ScrollContainer,
  ProgressDots,
} from "@components";
import { Colors, Fonts } from "@constants";
import { useWindowDimensions } from "react-native";
import { MEDITATION_SCREENS } from "@navigation/screens";
import { useRoute } from "@react-navigation/native";
import { ExpandableItem } from "@utils";
import { styles } from "./MeditationScreen.styles";
import { globalStyles } from "@styles";

const { width } = Dimensions.get("window");

export const MeditationScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.5;
  const cardHeight = width * 0.5;
  const route = useRoute();
  const currentIndex = MEDITATION_SCREENS.indexOf(route.name);
  const fadeText1 = useRef(new Animated.Value(0)).current;
  const fadeText2 = useRef(new Animated.Value(0)).current;
  const slideText1 = useRef(new Animated.Value(-100)).current;
  const slideText2 = useRef(new Animated.Value(0)).current;
  const fadeSlideText2 = useRef(new Animated.Value(0)).current;
  const imageFade = useRef(new Animated.Value(0)).current;

  const [showFirstText, setShowFirstText] = useState(true);

  // const [firstText, setFirstText] = useState("");
  slideText2.setValue(50); // Starting slightly lower (or from 0 = middle)

  // setFirstText(
  //   "Before we begin, let's find the ideal environment for deep relaxation. We'll analyze the surrounding sound levels and energy to ensure a calm, balanced space."
  // );
  useEffect(() => {
    // Step 1: Fade in Text 1
    Animated.timing(fadeText1, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start(() => {
      // Step 2: Fade in Text 2
      Animated.timing(fadeText2, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start(() => {
        // Step 3: Wait 2 seconds, then fade both out in parallel
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(fadeText1, {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(fadeText2, {
              toValue: 0,
              duration: 1200,
              useNativeDriver: true,
            }),
          ]).start(() => {
            // Step 4: Slide in Text 1, then slide/fade in Text 2
            Animated.sequence([
              Animated.timing(slideText1, {
                toValue: 250,
                duration: 2000,
                useNativeDriver: true,
              }),
              Animated.parallel([
                Animated.timing(slideText2, {
                  toValue: -150,
                  duration: 1500,
                  useNativeDriver: true,
                }),
                Animated.timing(fadeSlideText2, {
                  toValue: 1,
                  duration: 1500,
                  useNativeDriver: true,
                }),
              ]),
            ]).start(() => {
              Animated.timing(imageFade, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
              }).start();
            });
          });
        }, 2000);
      });
    });
  }, []);

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

  // const swipeGesture = Gesture.Pan().onEnd((event) => {
  //   if (event.translationX < 50 && event.velocityX < 0) {
  //     // Swipe left → Go forward
  //     runOnJS(goToNextScreen)();
  //   } else if (event.translationX > 50 && event.velocityX > 0) {
  //     // Swipe right → Go back
  //     runOnJS(goBack)();
  //   }
  // });

  const options = [
    {
      name: "meditate",
      label: "Your meditation experience",
      description: `To begin, let's find the best environment for deep relaxation. We’ll analyze the sound levels and environmental energy around you to ensure a calm and balanced space. Once the perfect spot is found, move on to a guided meditation session designed to center your mind and body. Afterward, explore a range of healing frequencies to enhance your meditation and elevate your vibrational state.`,
    },
  ];

  return (
    <View style={globalStyles.container}>
      {/* <GestureDetector gesture={swipeGesture}> */}
      <View
        style={{ flex: 1, width: "100%", height: "100%" }}
        className="items-center"
      >
        <TouchableOpacity
          style={{ flex: 1, height: "50%", width: "100%" }}
          activeOpacity={1}
          onPress={goToNextScreen}
        >
          <ImageBackground
            style={{ flex: 1, width: "100%", height: "100%" }}
            source={require("@assets/images/backgroundMeditation.webp")}
            resizeMode="cover"
          >
            <HomeButton />
            <View
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Animated.Text
                style={{
                  opacity: fadeText1,
                  position: "absolute",
                  top: "10%",
                  fontFamily: "AppTitleFont",
                  fontSize: 24,
                  width: "90%",
                  textAlign: "center",
                  color: "#362819",
                }}
              >
                Before we begin, let's find the ideal environment for deep
                relaxation. We'll analyze the surrounding sound levels and
                energy to ensure a calm, balanced space.
              </Animated.Text>

              <Animated.Text
                style={{
                  opacity: fadeText2,
                  position: "absolute",
                  top: "43%",
                  //   fontWeight: "bold",
                  fontFamily: "AppTitleFont",
                  fontSize: 24,
                  width: "90%",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Once we find the perfect spot, you can begin a guided meditation
                session designed to center your mind, restore your energy, and
                bring you into a state of peace.
              </Animated.Text>
              <Animated.Text
                style={{
                  transform: [{ translateY: slideText1 }],
                  position: "absolute",
                  top: -100,
                  //   left: 0,
                  //   right: 0,
                  alignItems: "center",
                  fontFamily: "AppTitleFont",
                  fontSize: 24,
                  width: "90%",
                  textAlign: "center",
                  color: "#362819",
                }}
              >
                Take a deep breath....
              </Animated.Text>
              <Animated.Text
                style={{
                  transform: [{ translateY: slideText2 }],
                  opacity: fadeSlideText2,
                  fontFamily: "AppTitleFont",
                  position: "absolute",
                  top: "45%",
                  // left: 0,
                  // right: 0,
                  alignItems: "center",
                  fontSize: 24,
                  width: "90%",
                  textAlign: "center",
                  color: "#362819",
                }}
              >
                Your journey to mindfulness starts now
              </Animated.Text>
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
                  }}
                />
              </Animated.View>
            </View>

            <TouchableOpacity
              className="p-4 rounded-2xl items-center shadow-md"
              onPress={() => navigation.navigate(item.screen)}
            />
            {/* Text on the same line */}
            {/* ✅ Use the progress dots, passing the state-based currentIndex */}
          </ImageBackground>
        </TouchableOpacity>
      </View>
      {/* </GestureDetector> */}
    </View>
  );
};
