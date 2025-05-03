import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { VibeHistoryScreen } from "@screens";

export const StreakStack =() => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="VibeHistory"
      screenOptions={({ navigation }) => ({
        headerShown: false,
      })}
    >
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
}
