import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { StatusBar } from "react-native";
import { playTrack, stopTrack } from "@services";
import { ScrollContainer, GradientBackground } from "@components";
import { MEDITATION_SCREENS } from "@navigation/screens";
import { useRoute } from "@react-navigation/native";
import { styles } from "./FrequenciesScreen.styles";
import { Colors } from "@constants";

export const FrequenciesScreen = ({ navigation }) => {
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

  const frequencyMap = {
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
      await stopTrack();
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
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Healing Frequencies</Text>
          <View style={styles.frequencyList}>
            <ScrollContainer>
              {Object.keys(frequencyMap).map((freq) => (
                <View key={freq}>
                  <TouchableOpacity
                    style={styles.touchableWrapper}
                    onPress={() => togglePlayback(parseInt(freq))}
                    activeOpacity={0.9}
                  >
                    <ImageBackground
                      source={imageMap[parseInt(freq)]}
                      style={styles.backgroundImage}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <View style={styles.labelWrapper}>
                    <Text style={styles.freqText}>
                      {isPlaying === parseInt(freq)
                        ? `Stop ${freq} Hz`
                        : `${freq} Hz`}
                    </Text>
                    <Text style={styles.descriptionText}>
                      {frequencyMap[freq].description}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollContainer>
          </View>
        </View>
      </View>
    </GradientBackground>
  );
};
