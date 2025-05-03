import React, { useRef, useCallback } from "react";
import { Animated, View, Text, SafeAreaView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useUserProfile, useAuth } from "@context";
import { GradientBackground, CustomSpiritualButton } from "@components";
import { Colors } from "@constants";
import { styles } from "./WelcomeScreen.styles";

export const WelcomeScreen = () => {
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
    <SafeAreaView style={styles.fullScreenContainer} edges={["bottom"]}>
      <GradientBackground
        colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}
      >
        <View style={styles.topContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.welcomeQuestion}>
            Wondering what your vibrational frequency is?
          </Text>
        </View>

        <View style={styles.buttonWrapper}>
          <CustomSpiritualButton
            label="Sign Up"
            onPress={() => navigation.replace("Tabs", { screen: "Home" })}
            color={Colors.buttonBackground}
            textColor={Colors.lightText}
          />
          <CustomSpiritualButton
            label="Log In"
            onPress={() => navigation.replace("Tabs", { screen: "Home" })}
            color={Colors.buttonBackground}
            textColor={Colors.lightText}
          />
        </View>
      </GradientBackground>
    </SafeAreaView>
  );
};
