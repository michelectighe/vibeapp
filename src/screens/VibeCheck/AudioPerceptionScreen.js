import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { playTrack } from "@/services";
import { styles } from "./AudioPerceptionScreen.style";
import { CustomSpiritualButton, GradientBackground } from "@/components";
import { SectionLayout } from "@/components/SectionLayout";
import { Colors } from "@/constants";
import { VIBE_CHECK_SCREENS } from "@/navigation";
import { audioPerceptionTracks } from "@data/audioPerceptionData";

export const AudioPerceptionScreen = () => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [wordsRevealed, setWordsRevealed] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const currentIndex = VIBE_CHECK_SCREENS.indexOf(route.name);

  const goToNextScreen = () => {
    if (currentIndex < VIBE_CHECK_SCREENS.length - 1) {
      navigation.navigate(VIBE_CHECK_SCREENS[currentIndex + 1]);
    }
  };

  const playRandomSound = async () => {
    const track =
      audioPerceptionTracks[
        Math.floor(Math.random() * audioPerceptionTracks.length)
      ];
    setSelectedTrack(track);
    setSelectedWord(null);
    setWordsRevealed(false);
    setShowOptions(true);

    await playTrack(track.id, track.file, track.title, "VibeKey", 1, false);
  };

  const replayCurrentSound = async () => {
    if (selectedTrack) {
      await playTrack(
        selectedTrack.id,
        selectedTrack.file,
        selectedTrack.title,
        "VibeKey",
        1,
        false
      );
    }
  };

  const handleSelection = (word) => {
    setSelectedWord(word);
  };

  return (
    <GradientBackground
      colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}
    >
      <SectionLayout
        topFlex={1}
        middleFlex={4}
        bottomFlex={2}
        topContent={<Text style={styles.title}>What word did you hear?</Text>}
        middleContent={
          <View style={styles.middle}>
            <CustomSpiritualButton
              label="Play New Sound"
              onPress={playRandomSound}
              color={Colors.buttonBackground}
              textColor={Colors.lightText}
            />

            {selectedTrack && (
              <CustomSpiritualButton
                label="Replay Sound"
                onPress={replayCurrentSound}
                color={Colors.buttonBackground}
                textColor={Colors.lightText}
              />
            )}

            {showOptions && !wordsRevealed && (
              <CustomSpiritualButton
                label="Reveal Words"
                onPress={() => setWordsRevealed(true)}
                color={Colors.buttonBackground}
                textColor={Colors.lightText}
              />
            )}

            {showOptions && wordsRevealed && selectedTrack && (
              <FlatList
                data={selectedTrack.words}
                keyExtractor={(item) => item.word}
                contentContainerStyle={{ gap: 5 }}
                style={{ flex: 1, width: "100%", marginTop: 16 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => handleSelection(item)}
                  >
                    <Text style={styles.optionText}>{item.word}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        }
        bottomContent={
          <View style={styles.bottom}>
            {selectedWord && (
              <View style={styles.resultCard}>
                <Text style={styles.resultTitle}>
                  You heard: {selectedWord.word}
                </Text>
                <Text style={styles.resultFrequency}>
                  Frequency: {selectedWord.frequency} Hz
                </Text>
                <Text style={styles.resultMeaning}>{selectedWord.meaning}</Text>
              </View>
            )}
            <View style={styles.bottomButton}>
              <CustomSpiritualButton
                label="Continue"
                onPress={goToNextScreen}
                color={Colors.buttonBackground}
                textColor={Colors.lightText}
              />
            </View>
          </View>
        }
      />
    </GradientBackground>
  );
};
