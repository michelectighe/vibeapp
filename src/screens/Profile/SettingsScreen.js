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
import { globalStyles } from "@styles";

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
      colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}
    >
      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={globalStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Settings</Text>

        <CustomSpiritualButton
          label="Update Profile"
          onPress={() => navigation.navigate("UpdateProfileScreen")}
          color={Colors.buttonBackground}
          textColor={Colors.lightText}
        />

        <CustomSpiritualButton
          label="Profile Setup"
          onPress={() => navigation.navigate("ProfileSetupScreen")}
          color={Colors.buttonBackground}
          textColor={Colors.lightText}
        />
        {!user && (
          <CustomSpiritualButton
            label="Sign In"
            onPress={handleSignIn}
            color={Colors.buttonBackground}
            textColor={Colors.lightText}
          />
        )}
        <CustomSpiritualButton
          label="Sign Out"
          onPress={handleSignOut}
          color={Colors.buttonBackground}
          textColor={Colors.lightText}
        />
      </ScrollView>
    </GradientBackground>
  );
};
