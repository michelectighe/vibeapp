import * as Linking from "expo-linking";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {  setMatchId } from "@/utils/matchLinkStore";
import { useAuth } from "@context";

export const DeepLinkHandler = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      const parsed = Linking.parse(url);
      const matchId = parsed?.queryParams?.id || parsed?.path?.split("/")[1];
      if (matchId) {
        console.log("📲 Live deep link detected:", matchId);
        setMatchId(matchId);

        if (user) {
          navigation.navigate("Tabs", {
            screen: "VibeMatch",
            params: { screen: "MatchScreen" },
          });
        } else {
          navigation.navigate("Tabs", {
            screen: "Settings",
            params: {
              screen: "SignInScreen",
              params: {
                returnTo: {
                  screen: "VibeMatch",
                  params: { screen: "MatchScreen" },
                },
              },
            },
          });
        }
      }
    };

    const sub = Linking.addEventListener("url", handleDeepLink);
    return () => sub.remove();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return null; // it's just a listener
};
