import { StackActions , CommonActions} from "@react-navigation/native";
import { navigationRef } from "@/services";


export const resetStack = (screenName, route) => {
  console.log('screenName', screenName)
  console.log('route', route)
  if ((!screenName || !route)) return;
  const whereFrom = navigationRef.getCurrentRoute();

  if (!whereFrom.params || whereFrom.name === "MatchScreen") return;

  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: screenName }],
    }),
  );
};
