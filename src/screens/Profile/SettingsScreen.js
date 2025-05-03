import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { GradientBackground, CustomSpiritualButton } from "@components";
import { styles, profileAssets } from "./StylesProfile";
import { useAuth } from "@context";
import { useAmbientControlForScreen } from "@hooks";
import { Fonts, Colors } from "@constants";

export const SettingsScreen = ({ navigation }) => {
  useAmbientControlForScreen(true);
  const { signOut, user } = useAuth();
  const [signOutMessage, setSignOut] = useState("");

  const handleSignOut = async () => {
    signOut();
    //console.log("signed out");
    setSignOut("Logout Successful");
    navigation.navigate("SignInScreen");
  };

  const handleSignIn = async () => {
    navigation.navigate("SignInScreen");
  };

  return (
    // <ImageBackground
    //   source={profileAssets.background}
    //   style={styles.bg}
    //   resizeMode="cover"
    // >
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <ScrollView
        style={{ paddingHorizontal: 16, marginTop: 80 }}
        contentContainerStyle={{ paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Settings</Text>

        <CustomSpiritualButton
          label="Update Profile"
          onPress={() => navigation.navigate("UpdateProfileScreen")}
          color={Colors.vcButtonColor}
          textColor={Colors.vcButtonTextColor}
        />

        <CustomSpiritualButton
          label="Profile Setup"
          onPress={() => navigation.navigate("ProfileSetupScreen")}
          color={Colors.vcButtonColor}
          textColor={Colors.vcButtonTextColor}
        />
        {!user && (
          <CustomSpiritualButton
            label="Sign In"
            onPress={handleSignIn}
            color={Colors.vcButtonColor}
            textColor={Colors.vcButtonTextColor}
          />
        )}
        <CustomSpiritualButton
          label="Sign Out"
          onPress={handleSignOut}
          color={Colors.vcButtonColor}
          textColor={Colors.vcButtonTextColor}
        />
      </ScrollView>
    </GradientBackground>
  );
};
