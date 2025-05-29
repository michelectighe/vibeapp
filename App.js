import "react-native-reanimated";
import "./src/styles/CustomText"; // must be imported before any screens load
import React, { useRef, useEffect, useState, Linking } from "react";
//import { setJSExceptionHandler } from "react-native-exception-handler";
// import crashlytics from "@react-native-firebase/crashlytics";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { navigationRef } from "@services";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initApp } from "@utils";

import { LogBox, Text } from "react-native";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MyTabs, StreakStack } from "@navigation";
import {
  UserProfileProvider,
  ModelProvider,
  EnvironmentProvider,
  AuthProvider,
  AnalysisProvider,
  MyResultsProvider,
} from "@context";
import { MusicManager } from "@utils";
import { SplashScreen, WelcomeScreen, ChakraDetailModal, GoodNewsScreen } from "@screens";
import { DevOnly } from "./devOnlyScreen";
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

const linking = {
  prefixes: ["vibekey://"],
  config: {
    screens: {
      Tabs: {
        screens: {
          VibeMatch: {
            screens: {
              MatchScreen: {
                path: "match",
                parse: {
                  id: (id) => `${id}`,
                },
              },
            },
          },
        },
      },
    },
  },
};

const Stack = createNativeStackNavigator();
const AppInner = () => {
  const [isReady, setIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [initialLink, setInitialLink] = useState(null);
  const [checkForLink, setCheckForLink] = useState(false);

  useEffect(() => {
    const init = async () => {
      //console.log("linking:", linking);
      try {
        await initializeRevenueCat();

        // await initApp();
        // // const url = await Linking.getInitialURL();
        // //   setInitialLink(url); // <--- store the deep link if present
        // setCheckForLink(true);
        //    setInitialLink(url);
        // setIsReady(true);
      } catch (err) {
        console.error("Failed to init app:", err);
      }
    };

    init();
  }, [linking]);

  // const handleHomeReady = () => {
  //   setShowSplash(false);
  // };

  // if (!isReady) {
  //   return <SplashScreen />;
  // }
  return (
    <AnalysisProvider>
      <MusicManager />
      <NavigationContainer linking={linking} ref={navigationRef}>
        <ModelProvider>
          <Stack.Navigator
            initialRouteName="Splash" // maybe change later to welcome screen
            screenOptions={() => ({
              headerShown: false,
              animation: "fade",
            })}
          >
            {/* SplashScreen sits on top of everything until cleared */}

            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}>
            </Stack.Screen>
              <Stack.Screen name="Tabs" component={MyTabs} options={{ headerShown: false }} />

              <Stack.Screen
                name="ChakraDetailModal"
                component={ChakraDetailModal}
                options={{
                  presentation: "transparentModal", // or "modal"
                  headerShown: false,
                }}
              />
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Streaks" component={StreakStack} />
              <Stack.Screen name="GoodNews" component={GoodNewsScreen} />
              <Stack.Screen name="DevOnly" component={DevOnly} />

          </Stack.Navigator>
        </ModelProvider>
      </NavigationContainer>
    </AnalysisProvider>
  );
};

export const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <UserProfileProvider>
            <MyResultsProvider>
            <AppInner />
            </MyResultsProvider>
          </UserProfileProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
