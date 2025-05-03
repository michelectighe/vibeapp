import React, { useRef, useCallback } from "react";
import { Animated, Text, View, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useUserProfile, useAuth } from "@context";
import { playTrack, isPlayingTrack } from "@services";
import { toolsCards } from "@data";
import {
  GradientBackground,
  CustomSpiritualButton,
  HomeCard,
} from "@components";
import { Colors } from "@constants";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./ToolsMainScreen.styles";

export const ToolsMainScreen = () => {
  useAmbientControlForScreen(true);
  const positionY = useRef(new Animated.Value(-100)).current;
  const navigation = useNavigation();
  const { profile, loading } = useUserProfile();
  const { user } = useAuth();

  if (loading) return <Text>Loading...</Text>;

  useFocusEffect(
    useCallback(() => {
      positionY.setValue(-30);
      Animated.timing(positionY, {
        toValue: 45,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, [])
  );

  return (
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <View style={styles.topContainer}>
        <Text style={styles.welcomeText}>Healing Journey</Text>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {toolsCards.map((card) => (
            <HomeCard
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              icon={card.icon}
              image={card.image}
              textColor={card.textColor}
              onPress={() => navigation.navigate(card.screen)}
            />
          ))}
        </ScrollView>
      </View>
    </GradientBackground>
  );
};
