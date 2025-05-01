import React, { useRef, useCallback } from "react";
import {
  Platform,
  NativeModules,
  Animated,
  Button,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useUserProfile, useAuth } from "@context";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";
import { playTrack, isPlayingTrack } from "@services";
import { vibeHomeCards } from "@data";
import { Fonts } from "@constants";
import {
  GradientBackground,
  AnimatedLogoSmall,
  CustomSpiritualButton,
  HomeCard,
  ScrollContainer,
} from "@components";
import { Colors } from "@constants";

const backgroundImage = require("@assets/images/backgroundVibeKey.webp");
const logoImage = require("@assets/images/VLogo.png");

export default function VibeKeyHome() {
  const positionY = useRef(new Animated.Value(-100)).current;
  const navigation = useNavigation();
  const { profile, loading } = useUserProfile();
  const { user } = useAuth();

  if (loading) return <Text>Loading...</Text>;

  // useFocusEffect(
  //   useCallback(() => {
  //     const playing = isPlayingTrack();
  //     console.log("ist it playing?: ", playing);
  //     if (playing === "stopped" || "none") {
  //       playTrack({
  //         id: 1,
  //         url: require("@assets/audio/Enchantment.mp3"),
  //         title: "Enchantment",
  //       });
  //     }
  //     return () => {};
  //   }, [])
  // );

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
      // logo={false}
    >
      {/* <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}> */}

      <View style={styles.topContainer}>
        <Text style={styles.welcomeText}>
          Welcome Back, {profile?.displayName || "friend"}
        </Text>

        <ScrollView
          style={{ paddingHorizontal: 16, marginTop: 50 }}
          contentContainerStyle={{ paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
        >
          {vibeHomeCards.map((card) => (
            <HomeCard
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              icon={card.icon}
              image={card.image}
              onPress={() => navigation.navigate(card.screen)}
            />
          ))}
        </ScrollView>
      </View>

      {/* </View> */}
    </GradientBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  fullScreenContainer: {
    flex: 1,
  },
  topContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
  },
  welcomeText: {
    position: "absolute",
    top: -30,
    marginBottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 36,
    color: "white",
    fontWeight: "600",
    fontFamily: Fonts.Script,
  },
  logo: {
    position: "absolute",
    top: 10,
    left: 10,
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.25, // slightly smaller
    marginTop: "10%",
    marginBottom: 0, // reduce spacing below
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: SCREEN_HEIGHT * 0.03, // add a bit of breathing room
    paddingHorizontal: 16,
  },
  buttonContainer: {
    width: "30%",
    alignItems: "center",
  },
  buttonWrapper: {
    alignItems: "center",
    position: "relative",
  },
});
