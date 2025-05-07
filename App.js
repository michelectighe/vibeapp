import "react-native-reanimated";
import "./src/styles/CustomText"; // must be imported before any screens load
import React, { useRef, useEffect } from "react";
//import { setJSExceptionHandler } from "react-native-exception-handler";
// import crashlytics from "@react-native-firebase/crashlytics";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MyTabs, StreakStack } from "@navigation";
import { UserProfileProvider, ModelProvider, AuthProvider, AnalysisProvider } from "@context";
import { MusicManager } from "@utils";
import { SplashScreen, WelcomeScreen } from "@screens";
import { initializeRevenueCat } from "@utils";

//setGlobalErrorHandler();
// setTimeout(() => {
//   throw new Error('Test global error handler!');
// }, 2000);

// Global error handler
// const globalErrorHandler = (error, isFatal) => {
//   crashlytics().recordError(error);
//   console.error("Global Error:", error); // optional
// };

// Register it
// if (!__DEV__) {
//   setJSExceptionHandler(globalErrorHandler, true);
// }

enableScreens();
LogBox.ignoreLogs([
  "Support for defaultProps will be removed",
  "Text strings must be rendered within a <Text> component",
  "Sending `playback-state` with no listeners registered",
  "Sending `playback-track-changed` with no listeners registered",
  "Sending `playback-active-track-changed` with no listeners registered",
  "Sending `playback-play-when-ready-changed` with no listeners registered",
]);

// const linking = {
//   prefixes: ["vibekey://"],
//   config: {
//     screens: {
//       Tabs: {
//         screens: {
//           VibeMatch: {
//             screens: {
//               MatchScreen: {
//                 path: "match",
//                 parse: {
//                   id: (id) => `${id}`,
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

const linking = {
  prefixes: ["vibekey://"],
  config: {
    screens: {
      Splash: {
        path: "match", // optional param for match ID
        parse: {
          id: (id) => `${id}`,
        },
      },
    },
  },
};

const Stack = createNativeStackNavigator();
const AppInner = () => {
  useEffect(() => {
    initializeRevenueCat();
  }, []);

  // useEffect(() => {
  //   const getInitialUrl = async () => {
  //     const url = await Linking.getInitialURL();
  //     //console.log("🔗 Initial URL:", url);
  //   };

  //   const sub = Linking.addEventListener("url", (event) => {
  //     //console.log("📡 Received link while app is open:", event.url);
  //   });

  //   getInitialUrl();
  //   Linking.openURL("vibekey://match?id=T30X4J");

  //   return () => sub.remove();
  // }, []);
  const navigationRef = useRef(); // Create a reference for navigation
  return (
    <AnalysisProvider>
      <MusicManager />
      <NavigationContainer linking={linking} ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={() => ({
            headerShown: false,
            animation: "fade",
          })}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen
            name="Tabs"
            component={MyTabs}
            options={{ headerShown: false, animation: "fade" }}
          />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Streaks" component={StreakStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </AnalysisProvider>
  );
};

export const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ModelProvider>
          <AuthProvider>
            <UserProfileProvider>
              <AppInner />
            </UserProfileProvider>
          </AuthProvider>
        </ModelProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
