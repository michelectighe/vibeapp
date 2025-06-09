import React, { useState } from "react";
import { Text, View } from "react-native";
import { GradientBackground, CustomSpiritualButton, SectionLayout } from "@components";
import { useAuth } from "@context";
import { useAmbientControlForScreen } from "@hooks";
import { Fonts, Colors } from "@constants";
import { globalStyles } from "@styles";
import { styles } from "./SettingScreen.style";

export const SettingsScreen = ({ navigation }) => {
  useAmbientControlForScreen(true);
  const { signOut, user } = useAuth();
  const [signOutMessage, setSignOut] = useState("");

  const handleSignOut = async () => {
    signOut();
    ////console.log("signed out");
    setSignOut("Logout Successful");
    // navigation.navigate("SignInScreen");
  };

  const handleSignIn = async () => {
    navigation.navigate("SignInScreen");
  };

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient3]}>
      <SectionLayout
        topFlex={1}
        middleFlex={8}
        bottomFlex={1}
        topContent={
          <View style={globalStyles.titleWrapper}>
            <Text style={globalStyles.title}>Settings</Text>
          </View>
        }
        middleContent={
          <View style={styles.buttonWrapper}>
            {!user && (
              <CustomSpiritualButton
                label="Create Account"
                onPress={() => navigation.navigate("SignUpScreen")}
                color={Colors.buttonBackground}
                textColor={Colors.buttonText}
              />
            )}
            <CustomSpiritualButton
              label="Update Profile"
              onPress={() => navigation.navigate("UpdateProfileScreen")}
              color={Colors.buttonBackground}
              textColor={Colors.buttonText}
            />
            {!user && (
              <CustomSpiritualButton
                label="Sign In"
                onPress={handleSignIn}
                color={Colors.buttonBackground}
                textColor={Colors.buttonText}
              />
            )}
            <CustomSpiritualButton
              label="Subscription"
              onPress={() => navigation.navigate("SubscriptionScreen")}
              color={Colors.buttonBackground}
              textColor={Colors.buttonText}
            />
            {user && (
              <CustomSpiritualButton
                label="Sign Out"
                onPress={handleSignOut}
                color={Colors.buttonBackground}
                textColor={Colors.buttonText}
              />
            )}
            {__DEV__ && (
              <CustomSpiritualButton
                label="Dev Tools"
                onPress={() => navigation.navigate("DevOnly")}
                color={Colors.buttonBackground}
                textColor={Colors.buttonText}
              />
            )}
          </View>
        }
        bottomContent={<Text>{signOutMessage}</Text>}
      />
    </GradientBackground>
  );
};
