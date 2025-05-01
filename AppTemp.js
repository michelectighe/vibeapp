import "react-native-reanimated";
// import "./global.css";
import React, { useRef, useEffect } from "react";
//import { setJSExceptionHandler } from "react-native-exception-handler";
// import crashlytics from "@react-native-firebase/crashlytics";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox, Linking } from "react-native";
import { enableScreens } from "react-native-screens";
import { MyTabs } from "@navigation";
import {
  UserProfileProvider,
  ModelProvider,
  AuthProvider,
  AnalysisProvider,
} from "@context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MusicManager } from "@utils";
import { SplashScreen, WelcomeScreen } from "@screens";

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
const fadeTransition = ({ current }) => ({
  cardStyle: {
    opacity: current.progress, //  Fades in based on transition progress
  },
});

const AppInner = () => {
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
  const fadeTransition = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <AnalysisProvider>
      <MusicManager />
      <NavigationContainer linking={linking} ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={({ navigation }) => ({
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
        </Stack.Navigator>
      </NavigationContainer>
    </AnalysisProvider>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ModelProvider>
          <AuthProvider>
            <UserProfileProvider>
              <AppInner />
            </UserProfileProvider>
          </AuthProvider>
        </ModelProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
