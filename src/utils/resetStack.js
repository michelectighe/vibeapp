import { StackActions , CommonActions} from "@react-navigation/native";
import { navigationRef } from "@/services";

export const resetStack = (screenName) => {
  const whereFrom = navigationRef.getCurrentRoute();
  //console.log("where from :", whereFrom);

  // if (whereFrom === "MeditationSpace" || whereFrom === "VibeCheckScreen" || whereFrom === "Settings" || whereFrom === "Home" || whereFrom === "ShareScreen" || whereFrom === "VibeMatch" || whereFrom === "Goals")
  //
  if (!whereFrom.params || whereFrom.name === "MatchScreen") return;
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: screenName }],
    }),
  );
};
