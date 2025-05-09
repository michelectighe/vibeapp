import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MeditationScreen, MeditationSpaceScreen } from "@screens";
import { EnvironmentProvider } from "@context";

// ✅ Stack Navigator for 'Meditation' section
export const MeditationStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="MeditationSpace"
    screenOptions={() => ({
        headerShown: false,
         tabBarStyle: { display: "none" },
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
    </Stack.Navigator>
  );
};
