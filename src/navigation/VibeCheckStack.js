//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from "@react-navigation/stack";
import { Easing } from "react-native";

import {
  VibeCheckScreen,
  VibeCheckDetailsScreen,
  HeartRateScreen,
  EmotionalStateScreen,
  ResultsScreen,
  EmotionTransitionScreen,
  ResultDetailScreen,
  ChakraScreen,
  ChakraDetailModal,
  EnergyCleanseScreen,
  MetricInfoScreen,
} from "@screens";

// ✅ Stack Navigator for Analysis-related screens
export const VibeCheckStack = () => {
  //const Stack = createNativeStackNavigator();
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="VibeCheckScreen"
      screenOptions={({ navigation }) => ({
        headerShown: false,
        // tabBarStyle: { display: "none" },
      })}
    >
      <Stack.Screen
        name="MetricInfoScreen"
        component={MetricInfoScreen}
        options={{
          headerShown: false,
          presentation: "modal", // this gives it the 'from bottom' behavior
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          transitionSpec: {
            open: {
              animation: "timing",
              config: { duration: 1500 },
            },
            close: {
              animation: "timing",
              config: { duration: 1000 },
            },
          },
        }}
      />
      <Stack.Screen
        name="VibeCheckScreen"
        component={VibeCheckScreen}
        options={{
          //   tabBarStyle: { display: "none" },
          headerShown: false,
          gestureEnabled: true,
          presentation: "modal",
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          transitionSpec: {
            open: {
              animation: "timing",
              config: {
                duration: 500, // 👈 slow this down
                easing: Easing.out(Easing.poly(4)),
              },
            },
            close: {
              animation: "timing",
              config: {
                duration: 500, // 👈 match for closing too
                easing: Easing.out(Easing.poly(4)),
              },
            },
          },
        }}
      />
      <Stack.Screen
        name="EmotionTransitionScreen"
        component={EmotionTransitionScreen}
        options={{
          tabBarStyle: { display: "none" },
          headerShown: false,
          gestureEnabled: true,
          presentation: "modal",
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          transitionSpec: {
            open: {
              animation: "timing",
              config: {
                duration: 1500, // 👈 slow this down
                easing: Easing.out(Easing.poly(4)),
              },
            },
            close: {
              animation: "timing",
              config: {
                duration: 1500, // 👈 match for closing too
                easing: Easing.out(Easing.poly(4)),
              },
            },
          },
        }}
      />
      <Stack.Screen
        name="VibeCheckDetails"
        component={VibeCheckDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VibeMetrics"
        component={VibeCheckDetailsScreen}
        options={{
          headerShown: false,
          animation: "fade",
          animationDuration: 1000,
        }}
      />

      <Stack.Screen
        name="HeartRate"
        component={HeartRateScreen}
        // options={{
        //   gestureEnabled: false,
        //   headerShown: false,
        //   tabBarStyle: { display: "none" },
        //   //mct may be needed for back swipe   presentation: "card", // 🧠 not modal
        // }}
        options={{
          tabBarStyle: { display: "none" },
          headerShown: false,
          gestureEnabled: true,
          presentation: "modal",
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          transitionSpec: {
            open: {
              animation: "timing",
              config: {
                duration: 1500, // 👈 slow this down
                easing: Easing.out(Easing.poly(4)),
              },
            },
            close: {
              animation: "timing",
              config: {
                duration: 500, // 👈 match for closing too
                easing: Easing.out(Easing.poly(4)),
              },
            },
          },
        }}
      />

      <Stack.Screen
        name="Emotions"
        component={EmotionalStateScreen}
        options={{
          tabBarStyle: { display: "none" },
          headerShown: false,
          gestureEnabled: true,
          presentation: "modal",
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          transitionSpec: {
            open: {
              animation: "timing",
              config: {
                duration: 500, // 👈 slow this down
                easing: Easing.out(Easing.poly(4)),
              },
            },
            close: {
              animation: "timing",
              config: {
                duration: 500, // 👈 match for closing too
                easing: Easing.out(Easing.poly(4)),
              },
            },
          },
        }}
      />
      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
          gestureEnabled: true,
          presentation: "modal",
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          transitionSpec: {
            open: {
              animation: "timing",
              config: {
                duration: 1500,
                easing: Easing.out(Easing.poly(4)),
              },
            },
            close: {
              animation: "timing",
              config: {
                duration: 500,
                easing: Easing.out(Easing.poly(4)),
              },
            },
          },
        }}
      />

      <Stack.Screen
        name="ResultDetails"
        component={ResultDetailScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
          gestureEnabled: true,
          presentation: "modal",
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          transitionSpec: {
            open: {
              animation: "timing",
              config: {
                duration: 1000,
                easing: Easing.out(Easing.poly(4)),
              },
            },
            close: {
              animation: "timing",
              config: {
                duration: 1000,
                easing: Easing.out(Easing.poly(4)),
              },
            },
          },
        }}
      />

      <Stack.Screen
        name="ChakraScreen"
        component={ChakraScreen}
        options={{
          headerShown: false,
          gestureEnabled: true,
          presentation: "modal",
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          transitionSpec: {
            open: {
              animation: "timing",
              config: {
                duration: 1000, // 👈 slow this down
                easing: Easing.out(Easing.poly(4)),
              },
            },
            close: {
              animation: "timing",
              config: {
                duration: 1000, // 👈 match for closing too
                easing: Easing.out(Easing.poly(4)),
              },
            },
          },
        }}
      />

      {/* <Stack.Screen
        name="ChakraScreen"
        component={ChakraScreen}
        options={{
          presentation: "modal", // 👈 avoids background screen being pushed
          animation: "fade_from_bottom", // or use custom interpolator for "slide_from_top"
        }}
        // options={{
        //   presentation: "modal",
        //   //    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, // 👈 this comes from top to bottom
        //   cardStyleInterpolators: CardStyleInterpolators.forFadeFromCenter,
        //   headerShown: false,
        // }}
      /> */}
      <Stack.Screen
        name="ChakraDetail"
        component={ChakraDetailModal}
        options={{ headerShown: false, presentation: "transparentModal" }}
      />

      <Stack.Screen
        name="EnergyCleanseScreen"
        component={EnergyCleanseScreen}
        options={{
          headerShown: false,
          gestureEnabled: true,
          presentation: "modal",
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          transitionSpec: {
            open: {
              animation: "timing",
              config: {
                duration: 1500, // 👈 slow this down
                easing: Easing.out(Easing.poly(4)),
              },
            },
            close: {
              animation: "timing",
              config: {
                duration: 500, // 👈 match for closing too
                easing: Easing.out(Easing.poly(4)),
              },
            },
          },
        }}
      />
    </Stack.Navigator>
  );
}
