// MyTabs.js
import React from "react";
import { View } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { SettingsStack } from "./SettingsStack";
import { VibeCheckStack } from "./VibeCheckStack";
import { VibeMatchStack } from "./VibeMatchStack";
import { MeditationStack } from "./MeditationStack";
import { StreakStack } from "./StreakStack";
import { ToolsStack } from "./ToolsStack";
import { Ionicons } from "@expo/vector-icons";
import LinearGradient from "react-native-linear-gradient";
import { VibeKeyHome } from "@screens";
import { ProfileAvatar } from "@components";
import { Colors } from "@constants";
import { StackActions } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        unmountOnBlur: true,
        headerShown: false,
tabBarBackground: () => (
  <BlurView
    style={{ flex: 1 }}
    blurType="light"
    blurAmount={15}
    reducedTransparencyFallbackColor="rgba(40, 60, 50, 0.6)"
  />
),
tabBarStyle: {
  backgroundColor: "rgba(255,255,255,0.1)", // very subtle fallback
  position: "absolute", // allows it to float over content
  borderTopWidth: 0,
  elevation: 0,
},
        tabBarIconStyle: {
          marginTop: 2, // pushes icon up
          //   marginBottom: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Settings") {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <ProfileAvatar />
              </View>
            );
          }

          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "VibeCheck") {
            iconName = focused ? "pulse" : "pulse-outline";
          } else if (route.name === "Scan") {
            iconName = focused ? "scan" : "scan-circle-outline";
          } else if (route.name === "VibeMatch") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "InnerWork") {
            iconName = focused ? "footsteps" : "footsteps-outline";
          }

          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                //   marginTop: 10,
              }}
            >
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: Colors.activeTab,
        tabBarInactiveTintColor: Colors.inactiveTab,
      })}
    >
      <Tab.Screen
        name="Home"
        component={VibeKeyHome}
        options={{
          unmountOnBlur: true,
          //   tabBarStyle: { display: "none" },
          headerShown: false,
          gestureEnabled: true,
          presentation: "modal",
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            const isFocused = navigation.isFocused();

            if (isFocused && route?.state?.routes?.length > 1) {
              // Reset the nested stack when the tab is already focused
              navigation.reset({
                index: 0,
                routes: [{ name: "VibeKeyHome" }],
              })
              // navigation.navigate("Home", {
              //   screen: "VibeKeyHome", // change this to your actual root screen
              // });
            }
          },
        })}
      />
      <Tab.Screen
        name="VibeCheck"
        component={VibeCheckStack}
        options={{
          tabBarLabel: "Check",
          unmountOnBlur: true,
        }}
        screenOptions={() => ({
          headerShown: false,
          tabBarStyle: { display: "none" },
        })}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            const isFocused = navigation.isFocused();

            if (isFocused && route?.state?.routes?.length > 1) {
              // Reset the nested stack when the tab is already focused
              navigation.reset({
                index: 0,
                routes: [{ name: "VibeCheckScreen" }],
              })
            }
          },
        })}
      />
      <Tab.Screen name="Scan" component={MeditationStack}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            const isFocused = navigation.isFocused();

            if (isFocused && route?.state?.routes?.length > 1) {
              // Reset the nested stack when the tab is already focused
              navigation.reset({
                index: 0,
                routes: [{ name: "Scan" }],
              })
            }
          },
        })}
      />
      <Tab.Screen name="VibeMatch" component={VibeMatchStack} options={{ tabBarLabel: "Match" }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            const isFocused = navigation.isFocused();

            if (isFocused && route?.state?.routes?.length > 1) {
              // Reset the nested stack when the tab is already focused
              navigation.navigate("VibeMatch", {
                screen: "ShareScreen", // change this to your actual root screen
              });
            }
          },
        })}
      />
      <Tab.Screen name="InnerWork" component={ToolsStack}         
      options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null, // Hides button
          //   tabBarStyle: { display: "none" }, // Only use this if you want to hide the bar entirely
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            const isFocused = navigation.isFocused();

            if (isFocused && route?.state?.routes?.length > 1) {
              // Reset the nested stack when the tab is already focused
              navigation.navigate("InnerWork", {
                screen: "ToolsHome", // change this to your actual root screen
              });
            }
          },
        })}
      />
      <Tab.Screen name="Settings" component={SettingsStack} options={{ tabBarLabel: () => null }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            const isFocused = navigation.isFocused();

            if (isFocused && route?.state?.routes?.length > 1) {
              // Reset the nested stack when the tab is already focused
              navigation.navigate("Settings", {
                screen: "SettingsScreen", // change this to your actual root screen
              });
            }
          },
        })}
      />
      <Tab.Screen
        name="StreakStack"
        component={StreakStack}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null, // Hides button
          //   tabBarStyle: { display: "none" }, // Only use this if you want to hide the bar entirely
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            const isFocused = navigation.isFocused();

            if (isFocused && route?.state?.routes?.length > 1) {
              // Reset the nested stack when the tab is already focused
              navigation.navigate("StreakTab", {
                screen: "VibeHistoryScreen", // change this to your actual root screen
              });
            }
          },
        })}
      />
    </Tab.Navigator>
  );
};
