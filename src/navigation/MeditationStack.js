import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  MeditationScreen,
  MeditationSpaceScreen,
  GuidedMeditationScreen,
  FrequenciesScreen,
} from "@screens";
import { EnvironmentProvider } from "@context";

// ✅ Stack Navigator for 'Meditation' section
export default function MeditationStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="Meditation"
        component={MeditationScreen}
        options={{
          tabBarVisible: true,
          tabBarStyle: { display: "flex" },
        }}
      />
      <Stack.Screen
        name="MeditationSpace"
        // component={MeditationSpaceScreen}
        options={{
          tabBarVisible: true,
          tabBarStyle: { display: "flex" },
        }}
      >
        {(props) => (
          <EnvironmentProvider>
            <MeditationSpaceScreen {...props} />
          </EnvironmentProvider>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="GuidedMeditations"
        component={GuidedMeditationScreen}
        options={{
          //        /*headerShown: true*/,
          tabBarVisible: true,
          tabBarStyle: { display: "flex" },
        }}
      />
      <Stack.Screen
        name="Frequencies"
        component={FrequenciesScreen}
        options={{
          headerShown: false,
          tabBarVisible: true,
          tabBarStyle: { display: "flex" },
        }}
      />
    </Stack.Navigator>
  );
}
