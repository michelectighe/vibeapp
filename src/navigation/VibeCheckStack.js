//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Easing } from "react-native";

import {
  VibeCheckScreen,
  HeartRateScreen,
  EmotionalStateScreen,
  ResultsScreen,
  EmotionTransitionScreen,
  ResultDetailScreen,
  ResultsBreakdownScreen,
  ChakraScreen,
  EnergyCleanseScreen,
  MetricInfoScreen,
  AudioPerceptionScreen,
  JournalScreen,
} from "@screens";

// ✅ Stack Navigator for Analysis-related screens
export const VibeCheckStack = () => {
  //const Stack = createNativeStackNavigator();
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="VibeCheckScreen"
      screenOptions={() => ({
        headerShown: false,
        unmountOnBlur: true, 
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
          unmountOnBlur: true, 
          //   tabBarStyle: { display: "none" },
          headerShown: false,
          gestureEnabled: true,
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
          unmountOnBlur: true, 
          tabBarStyle: { display: "none" },
          headerShown: false,
          gestureEnabled: true,
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
        name="AudioPerceptionScreen"
        component={AudioPerceptionScreen}
        options={{
          //   tabBarStyle: { display: "none" },
          headerShown: false,
          gestureEnabled: true,
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
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          transitionSpec: {
            open: {
              animation: "timing",
              config: {
                duration: 500, // 👈 slow this down
                easing: Easing.out(Easing.poly(4)),
              },
            },
            // close: {
            //   animation: "timing",
            //   config: {
            //     duration: 500, // 👈 match for closing too
            //     easing: Easing.out(Easing.poly(4)),
            //   },
            // },
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
        name="ResultsBreakdown"
        component={ResultsBreakdownScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
          gestureEnabled: true,
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

      <Stack.Screen
        name="JournalScreen"
        component={JournalScreen}
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
};
