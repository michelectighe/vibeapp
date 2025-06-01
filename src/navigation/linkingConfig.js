// linkingConfig.js
import * as Linking from "expo-linking";
import { setMatchId } from "@/utils"; // your MatchLinkContext

export const linking = {
  prefixes: ["vibekey://"],
  config: {
    screens: {
      Tabs: {
        screens: {
          VibeMatch: {
            screens: {
              MatchScreen: {
                path: "match/:id",
                parse: {
                  id: (id) => `${id}`,
                },
              },
            },
          },
        },
      },
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url) {
      const parsed = Linking.parse(url);
      const matchId = parsed?.queryParams?.id || parsed?.path?.split("/")[1];
      console.log("Initial deep link:", url, "parsed matchId:", matchId);
      if (matchId) {
        setMatchId(matchId);
      }
    }
    return url;
  },
  subscribe(listener) {
    const onReceiveURL = ({ url }) => {
      const parsed = Linking.parse(url);
      const matchId = parsed?.queryParams?.id || parsed?.path?.split("/")[1];
      console.log("Live deep link:", url, "parsed matchId:", matchId);
      if (matchId) {
        setMatchId(matchId);
      }
      listener(url); // this triggers navigation
    };

    const subscription = Linking.addEventListener("url", onReceiveURL);
    return () => subscription.remove();
  },
};
