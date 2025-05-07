import React from "react";
import { ImageBackground, View } from "react-native";
import { HomeButton } from "@components";
import { useAmbientControlForScreen } from "@hooks";
import { styles } from "./VibeMatchScreen.styles";
import { globalStyles } from "@styles";

export const VibeMatchScreen = () => {
  useAmbientControlForScreen(true);
  const backgroundImage = require("@assets/images/backgroundVibeMatch.webp");

  return (
    <View style={globalStyles.container}>
      <ImageBackground style={styles.background} source={backgroundImage} resizeMode="cover">
        <HomeButton />
      </ImageBackground>
    </View>
  );
};
