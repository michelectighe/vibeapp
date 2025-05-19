import { createStackNavigator } from "@react-navigation/stack";
import { MeditationScreen, MeditationSpaceScreen, MeditationSpotFinder } from "@screens";
import { EnvironmentProvider } from "@context";

// ✅ Stack Navigator for 'Meditation' section
export const MeditationStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Meditation"
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
          tabBarStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="MeditationSpotFinder"
        component={MeditationSpotFinder}
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
