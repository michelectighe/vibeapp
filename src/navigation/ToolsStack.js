import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  BreathWorksScreen,
  EntangledSelfScreen,
  FrequenciesScreen,
  GuidedMeditationScreen,
  QuantumJournalScreen,
  JournalListScreen,
  GoalsByDayScreen,
  VibeHistoryScreen,
  EnergyResetScreen,
  MotivationMirrorScreen,
} from "@screens";

export const ToolsStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: false,
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
        name="GoalsByDayScreen"
        component={GoalsByDayScreen}
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
        name="JournalListScreen"
        component={JournalListScreen}
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
      <Stack.Screen
        name="EnergyResetScreen"
        component={EnergyResetScreen}
        options={{
          headerShown: false,
          tabBarVisible: true,
          tabBarStyle: { display: "flex" },
          title: "",
        }}
      />
      <Stack.Group screenOptions={{ presentation: "modal", gestureEnabled: false }}>
        <Stack.Screen
          name="MotivationMirrorScreen"
          component={MotivationMirrorScreen}
          options={{
            headerShown: false,
            tabBarVisible: true,
            gestureEnabled: false,
            presentation: "modal",
            stackPresentation: "modal",
            tabBarStyle: { display: "flex" },
            title: "",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
