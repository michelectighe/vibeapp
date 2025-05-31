import { StackActions , CommonActions} from "@react-navigation/native";
import { navigationRef } from "@/services";


export const resetStack = (screenName) => {
  return;
  if (!screenName) return;
  const whereFrom = navigationRef.getCurrentRoute();
  console.log('WHEREFROM:', wherefrom)
  if (!whereFrom.params || whereFrom.name === "MatchScreen") return;

  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: screenName }],
    }),
  );
};
