import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  VibeMatchScreen,
  ShareScreen,
  MatchScreen,
  MatchComparisonScreen,
  SharedMatchIntroScreen,
} from "@screens";

export const VibeMatchStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="ShareScreen"
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="VibeMatchScreen"
        component={VibeMatchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ShareScreen"
        component={ShareScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SharedMatchIntro"
        component={SharedMatchIntroScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MatchScreen"
        component={MatchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MatchComparisonScreen"
        component={MatchComparisonScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
