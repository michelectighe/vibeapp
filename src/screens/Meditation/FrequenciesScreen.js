import React, { useState, useRef, useContext } from "react";

import { useWindowDimensions } from "react-native";
import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from "react-native";
import { playTrack, stopTrack, isPlayingTrack } from "@services";
import { ScrollContainer, GradientBackground } from "@components";
import { MEDITATION_SCREENS } from "@navigation";
import { useRoute } from "@react-navigation/native";
import { Fonts, Colors } from "@constants";

export default function FrequenciesScreen({ navigation }) {
  const [isPlaying, setIsPlaying] = useState(null);

  const { width } = useWindowDimensions();
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

  // const swipeGesture = Gesture.Pan().onEnd((event) => {
  //   if (event.translationX < 50 && event.velocityX < 0) {
  //     // Swipe left → Go forward
  //     runOnJS(goToNextScreen)();
  //   } else if (event.translationX > 50 && event.velocityX > 0) {
  //     // Swipe right → Go back
  //     runOnJS(goBack)();
  //   }
  // });

  const frequencyMap = {
    // 285: { audio: require('@assets/audio/285hz.mp3'), description: 'Healing physical pain' },
    396: {
      audio: require("@assets/audio/396hz.mp3"),
      description: "Release guilt and fear",
    },
    417: {
      audio: require("@assets/audio/417hz.mp3"),
      description: "Clear negative energy",
    },
    528: {
      audio: require("@assets/audio/528hz.mp3"),
      description: "Promote DNA repair",
    },
    639: {
      audio: require("@assets/audio/639hz.mp3"),
      description: "Foster relationships",
    },
    741: {
      audio: require("@assets/audio/741hz.mp3"),
      description: "Problem-solving",
    },
    852: {
      audio: require("@assets/audio/852hz.mp3"),
      description: "Open the third eye",
    },
    963: {
      audio: require("@assets/audio/963hz.mp3"),
      description: "Spiritual awakening",
    },
  };

  const imageMap = {
    285: require("@assets/images/285.jpg"),
    396: require("@assets/images/396.jpg"),
    417: require("@assets/images/417.jpg"),
    528: require("@assets/images/528.jpg"),
    639: require("@assets/images/639.jpg"),
    741: require("@assets/images/741.jpg"),
    852: require("@assets/images/852.jpg"),
    963: require("@assets/images/963.jpg"),
  };

  const togglePlayback = async (frequency) => {
    const freqString = frequency.toString();

    if (isPlaying === freqString) {
      await stopTrack();
      setIsPlaying(null);
    } else {
      await stopTrack(); // Stop any existing
      await playTrack({
        id: freqString,
        url: frequencyMap[freqString].audio,
        title: `${frequency} Hz`,
      });
      setIsPlaying(freqString);
    }
  };

  return (
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          marginTop: "10%",
          paddingTop: StatusBar.currentHeight || 20,
        }}
        className="flex-1 items-center"
      >
        {/* Title */}
        <View style={{ flex: 1, paddingBottom: 85 }} className="items-center">
          <Text
            style={{
              color: Colors.textPrimary,
              fontSize: 24,
              textAlign: "center",
            }}
            className="font-AppFont text-2xl font-bold text-center"
          >
            Healing Frequencies
          </Text>

          {/* Scrollable list of frequencies */}
          <View style={{ marginBottom: 20 }}>
            <ScrollContainer>
              {Object.keys(frequencyMap).map((freq) => (
                <View key={freq}>
                  <TouchableOpacity
                    key={freq}
                    style={{
                      width: "100%",
                      heigth: 48,
                      borderRadius: 20,
                      overflow: "hidden",
                      marginTop: 5,
                    }}
                    onPress={() => togglePlayback(parseInt(freq))}
                    activeOpacity={0.9}
                  >
                    <ImageBackground
                      source={imageMap[parseInt(freq)]}
                      style={{ flex: 1, justifyContent: "flex-end" }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: "transparent",
                      padding: 2,
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.textPrimary,
                        fontFamily: Fonts.AppFont,
                        fontSize: 24,
                        textAlign: "center",
                      }}
                    >
                      {isPlaying === parseInt(freq)
                        ? `Stop ${freq} Hz`
                        : `${freq} Hz`}
                    </Text>
                    <Text
                      style={{
                        color: Colors.textPrimary,
                        fontFamily: Fonts.AppFont,
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                      {frequencyMap[freq].description}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollContainer>
          </View>
        </View>
        {/* <ProgressDots
            currentIndex={currentIndex}
            totalScreens={MEDITATION_SCREENS.length}
          /> */}
      </View>
    </GradientBackground>
  );
}
