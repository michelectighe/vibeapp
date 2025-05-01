import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BreathWorksScreen } from "@screens";

export default function ToolsStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="BreathWorksScreen"
      screenOptions={({ navigation }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="BreathWorksScreen"
        component={BreathWorksScreen}
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
