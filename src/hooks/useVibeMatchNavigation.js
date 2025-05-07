import { useNavigation, useRoute } from "@react-navigation/native";
import { VIBE_MATCH_SCREENS } from "@navigation/screens";

export const useVibeMatchNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentIndex = VIBE_MATCH_SCREENS.indexOf(route.name);

  const goToNextScreen = () => {
    if (currentIndex < VIBE_MATCH_SCREENS.length - 1) {
      navigation.navigate(VIBE_MATCH_SCREENS[currentIndex + 1]);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      navigation.navigate(VIBE_MATCH_SCREENS[currentIndex - 1]);
    } else {
      navigation.goBack();
    }
  };

  return { goToNextScreen, goBack };
};
