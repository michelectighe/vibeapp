import { useNavigation, useRoute } from "@react-navigation/native";
import { MEDITATION_SCREENS } from "@navigation/screens";

export const useMeditationNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentIndex = MEDITATION_SCREENS.indexOf(route.name);

  const goToNextScreen = () => {
    if (currentIndex < MEDITATION_SCREENS.length - 1) {
      navigation.navigate(MEDITATION_SCREENS[currentIndex + 1]);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      navigation.navigate(MEDITATION_SCREENS[currentIndex - 1]);
    } else {
      navigation.goBack();
    }
  };

  return { goToNextScreen, goBack };
};
