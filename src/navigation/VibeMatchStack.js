import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  VibeMatchScreen,
  ShareScreen,
  MatchScreen,
  MatchComparisonScreen,
} from "@screens";

export const VibeMatchStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="VibeMatchScreen"
      screenOptions={({ navigation }) => ({
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
