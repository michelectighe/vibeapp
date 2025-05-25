import { useNavigation, useRoute } from "@react-navigation/native";

export const useSimpleNav = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const goHome = () => {
      navigation.navigate("Home");
  };

  const goBack = () => {
    if (currentIndex > 0) {
      goHome();
    } else {
      navigation.goBack();
    }
  };

  return { goHome, goBack };
};
