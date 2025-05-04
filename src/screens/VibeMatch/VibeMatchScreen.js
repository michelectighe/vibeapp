import React, { useState } from "react";
import { ImageBackground, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { VIBE_MATCH_SCREENS } from "@navigation/screens";
import { HomeButton } from "@components";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./VibeMatchScreen.styles";
import { globalStyles } from "@styles";

export const VibeMatchScreen = ({ navigation }) => {
  useAmbientControlForScreen(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const route = useRoute();
  const currentIndex = VIBE_MATCH_SCREENS.indexOf(route.name);
  const backgroundImage = require("@assets/images/backgroundVibeMatch.webp");

  const goToNextScreen = () => {
    if (currentIndex < VIBE_MATCH_SCREENS.length - 1) {
      navigation.navigate(VIBE_MATCH_SCREENS[currentIndex + 1]);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      navigation.goBack();
    }
  };

  return (
    <View style={globalStyles.container}>
      <ImageBackground
        style={styles.background}
        source={backgroundImage}
        resizeMode="cover"
      >
        <HomeButton />
      </ImageBackground>
    </View>
  );
};
