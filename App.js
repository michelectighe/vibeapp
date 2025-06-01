import "react-native-reanimated";
import "./src/styles/CustomText"; // must be imported before any screens load
import React, { useRef, useEffect, useState } from "react";
//import { setJSExceptionHandler } from "react-native-exception-handler";
// import crashlytics from "@react-native-firebase/crashlytics";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { linking } from "@/navigation/linkingConfig";

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
import { DeepLinkHandler } from "@components";

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

const Stack = createNativeStackNavigator();
const AppInner = () => {
  const [isReady, setIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [initialLink, setInitialLink] = useState(null);
  const [checkForLink, setCheckForLink] = useState(false);

  const navigationRef = useNavigationContainerRef();

  // useEffect(() => {
  //   const unsubscribe = navigationRef.addListener("state", () => {
  //     const currentRoute = navigationRef.getCurrentRoute();
  //     console.log("Navigated to:", currentRoute?.name);
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    const init = async () => {
      try {
        Purchases.setDebugLogsEnabled(false);
        await initializeRevenueCat();
      } catch (err) {
        console.error("Failed to init revenueCat:", err);
      }
    };
    init();
  }, []);

  return (
    <AnalysisProvider>
      <MusicManager />
      <NavigationContainer
        linking={linking}
        ref={navigationRef}
        // onStateChange={() => {
        //   const route = navigationRef.getCurrentRoute();
        //   console.log("Route changed to:", route.name);
        // }}
      >
        <ModelProvider>
          <DeepLinkHandler />
          <Stack.Navigator
            initialRouteName="Splash" // maybe change later to welcome screen
            screenOptions={() => ({
              headerShown: false,
              animation: "fade",
            })}
          >
            {/* SplashScreen sits on top of everything until cleared */}

            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
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
