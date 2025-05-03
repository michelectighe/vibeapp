import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  BreathWorksScreen,
  EntangledSelfScreen,
  FrequenciesScreen,
  GuidedMeditationScreen,
  QuantumJournalScreen,
  ToolsMainScreen,
} from "@screens";

export const ToolsStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="ToolsMainScreen"
      screenOptions={({ navigation }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="ToolsMainScreen"
        component={ToolsMainScreen}
        options={{
          headerShown: false,
          tabBarVisible: true,
          tabBarStyle: { display: "flex" },
          title: "",
        }}
      />
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
      <Stack.Screen
        name="EntangledSelfScreen"
        component={EntangledSelfScreen}
        options={{
          headerShown: false,
          tabBarVisible: true,
          tabBarStyle: { display: "flex" },
          title: "",
        }}
      />
      <Stack.Screen
        name="FrequenciesScreen"
        component={FrequenciesScreen}
        options={{
          headerShown: false,
          tabBarVisible: true,
          tabBarStyle: { display: "flex" },
          title: "",
        }}
      />
      <Stack.Screen
        name="GuidedMeditationScreen"
        component={GuidedMeditationScreen}
        options={{
          headerShown: false,
          tabBarVisible: true,
          tabBarStyle: { display: "flex" },
          title: "",
        }}
      />
      <Stack.Screen
        name="QuantumJournalScreen"
        component={QuantumJournalScreen}
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
