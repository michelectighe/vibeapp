import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { styles } from "./FrequenciesScreen.styles";
import { GradientBackground } from "@components";
import { playTrack, stopTrack } from "@services";
import { frequencies } from "@data";
import { Colors } from "@constants";
import { globalStyles } from "@styles";

export const FrequenciesScreen = () => {
  const [isPlaying, setIsPlaying] = useState(null);

  const togglePlayback = async (frequencyHz, audio) => {
    const freqString = frequencyHz.toString();

    if (isPlaying === freqString) {
      await stopTrack();
      setIsPlaying(null);
    } else {
      await stopTrack();
      await playTrack({
        id: freqString,
        url: audio,
        title: `${frequencyHz} Hz`,
      });
      setIsPlaying(freqString);
    }
  };

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <View style={globalStyles.container}>
        <View style={globalStyles.titleWrapper}>
          <Text style={globalStyles.title}>Healing Journey</Text>
        </View>

        <ScrollView
          style={globalStyles.scrollView}
          contentContainerStyle={globalStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {frequencies.map(({ hz, image, audio, description }) => (
            <View key={hz}>
              <TouchableOpacity
                style={styles.touchableWrapper}
                onPress={() => togglePlayback(hz, audio)}
                activeOpacity={0.9}
              >
                <ImageBackground source={image} style={styles.backgroundImage} resizeMode="cover" />
              </TouchableOpacity>
              <View style={styles.labelWrapper}>
                <Text style={styles.freqText}>
                  {isPlaying === hz ? `Stop ${hz} Hz` : `${hz} Hz`}
                </Text>
                <Text style={styles.descriptionText}>{description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </GradientBackground>
  );
};
