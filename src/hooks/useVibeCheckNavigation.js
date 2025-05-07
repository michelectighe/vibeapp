import { useNavigation, useRoute } from "@react-navigation/native";
import { VIBE_CHECK_SCREENS } from "@navigation/screens";

export const useVibeCheckNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentIndex = VIBE_CHECK_SCREENS.indexOf(route.name);

  const goToNextScreen = () => {
    if (currentIndex < VIBE_CHECK_SCREENS.length - 1) {
      navigation.navigate(VIBE_CHECK_SCREENS[currentIndex + 1]);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      navigation.navigate(VIBE_CHECK_SCREENS[currentIndex - 1]);
    } else {
      navigation.goBack();
    }
  };

  return { goToNextScreen, goBack };
};
