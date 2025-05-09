import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { VibeHistoryScreen, StreakScreen } from "@screens";

export const StreakStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="VibeHistory"
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="StreakScreen"
        component={StreakScreen}
        options={{
          headerShown: false,
          tabBarVisible: true,
          tabBarStyle: { display: "flex" },
          title: "",
        }}
      />
      <Stack.Screen
        name="VibeHistory"
        component={VibeHistoryScreen}
        options={{
          headerShown: false,
          tabBarVisible: true,
          tabBarStyle: { display: "flex" },
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};
