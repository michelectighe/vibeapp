import React, { useState, useEffect, useContext } from "react";

import { ImageBackground, View, Text } from "react-native";
//import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { ProgressDots, HomeButton } from "@components";
import { VIBE_MATCH_SCREENS } from "@navigation"; // ✅ Import once, use everywhere
import { useRoute } from "@react-navigation/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH, getSubscriptionStatus } from "@utils";

const VibeMatchScreen = ({ navigation }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const route = useRoute();
  const currentIndex = VIBE_MATCH_SCREENS.indexOf(route.name);
  const backgroundImage = require("@assets/images/backgroundVibeMatch.webp");

  const goToNextScreen = () => {
    if (currentIndex < VIBE_MATCH_SCREENS.length - 1) {
      const nextScreen = VIBE_MATCH_SCREENS[currentIndex + 1];
      //console.log("next screen:", nextScreen);
      navigation.navigate(nextScreen);
    }
  };
  const goBack = () => {
    if (currentIndex > 0) {
      navigation.goBack();
    }
  };

  // const swipeGesture = Gesture.Pan().onEnd((event) => {
  //   if (event.translationX < 50 && event.velocityX < 0) {
  //     // Swipe left → Go forward
  //     runOnJS(goToNextScreen)();
  //   } else if (event.translationX > 50 && event.velocityX > 0) {
  //     // Swipe right → Go back
  //     runOnJS(goBack)();
  //   }
  // });

  return (

    < View
      style={{ flex: 1, width: "100%", height: "100%", alignItems: "center" }
      }
    >
      <ImageBackground
        style={{ flex: 1, width: "100%", height: "100%" }}
        source={backgroundImage}
        resizeMode="cover"
      >
        <HomeButton />
      </ImageBackground>
    </View >

  );
};

export default VibeMatchScreen;
