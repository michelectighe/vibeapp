import React, { useRef, useCallback } from "react";
import { Animated, View, Text, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useUserProfile, useAuth } from "@context";
import { playTrack, isPlayingTrack } from "@services";
import { vibeHomeCards } from "@data";
import { Colors } from "@constants";
import { GradientBackground, HomeCard } from "@components";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./VibeKeyHome.styles";
import { globalStyles } from "@styles";
import { SectionLayoutNotSafe } from "@/components";

export const VibeKeyHome = () => {
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
      colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}
    >
      <SectionLayoutNotSafe
        topFlex={1}
        middleFlex={0}
        bottomFlex={0}
        topContent={
          <>
            <View style={styles.titleWrapper}>
              <Text style={globalStyles.title}>
                Welcome Back, {profile?.displayName || "friend"}
              </Text>
            </View>

            <ScrollView
              style={globalStyles.scrollView}
              contentContainerStyle={globalStyles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {vibeHomeCards.map((card) => (
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
          </>
        }
      />
    </GradientBackground>
  );
};
