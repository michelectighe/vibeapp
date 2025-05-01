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
  SafeAreaView
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useUserProfile, useAuth } from "@context";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils";
import { playTrack, isPlayingTrack } from "@services";
import {
  GradientBackground,
  AnimatedLogoSmall,
  CustomSpiritualButton,
} from "@components";
import { Colors } from "@constants";

const backgroundImage = require("@assets/images/backgroundVibeKey.webp");
const logoImage = require("@assets/images/VLogo.png");

export default function WelcomeScreen() {
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
  //     return () => { };
  //   }, [])
  // );

  // console.log(
  //   "🔧 New Architecture Enabled:",
  //   NativeModules?.PlatformConstants?.isNewArchEnabled
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
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      {/* <ImageBackground
        source={backgroundImage}
        style={styles.background}
        resizeMode="cover"
      > */}
      {/* <View style={{ flex: 1 }}> */}
      <GradientBackground
        colors={[
          Colors.VibeGradient1,
          Colors.VibeGradient2,
          Colors.VibeGradient1,
        ]}
      >
        <View style={styles.topContainer}>
          {/* <View style={{ position: "absolute", top: 5, left: -15 }}>
              <AnimatedLogoSmall />
            </View> */}
          <Text style={styles.welcomeText}>Welcome</Text>

          <Text style={styles.welcomeQuestion}>
            Wondering what your vibrational frequency is?
          </Text>
          {/* <Image source={logoImage} style={styles.logo} resizeMode="contain" /> */}
        </View>
        {/* {__DEV__ && (
          <Button
            title="TEST"
            onPress={() => navigation.navigate("TestScreen")} // ✅ this is correct
          />
        )} */}
        <View
          style={{
            position: "absolute",
            bottom: 100,
            alignSelf: "center",
            width: "80%",
          }}
        >
          <CustomSpiritualButton
            label="Sign Up"
            onPress={() => {
              navigation.replace("Tabs", { screen: "Home" });
            }}
            color={Colors.vcButtonColor}
            textColor={Colors.vcButtonTextColor}
          />
          <CustomSpiritualButton
            label="Log In"
            onPress={() => {
              console.log("trying to leave");
              navigation.replace("Tabs", { screen: "Home" });
            }}
            color={Colors.vcButtonColor}
            textColor={Colors.vcButtonTextColor}
          />
        </View>
      </GradientBackground>
      {/* </View> */}
    </SafeAreaView>
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
  },
  welcomeText: {
    position: "absolute",
    top: 0,
    marginBottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 28,
    color: "white",
    fontWeight: "600",
  },
  welcomeQuestion: {
    position: "absolute",
    top: 100,
    marginBottom: 10,
    width: "80%",
    // left: 0,
    // right: 0,
    textAlign: "center",
    fontSize: 24,
    color: "white",
    fontWeight: "600",
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
