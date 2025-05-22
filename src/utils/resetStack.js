import { StackActions , CommonActions} from "@react-navigation/native";
import { navigationRef } from "@/services";

export const resetStack = (screenName) => {

const whereFrom = navigationRef.getCurrentRoute().name;
if (whereFrom === "Meditation" || whereFrom === "VibeCheckScreen" || whereFrom === "Home" || whereFrom === "ShareScreen")
    return;
    navigationRef.dispatch(
    CommonActions.reset({
    index: 0,
    routes: [
      { name: screenName },
    ],
  }),
);
    
};
