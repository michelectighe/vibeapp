// MyTabs.js
import React from "react";
import { View } from "react-native";
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

const Tab = createBottomTabNavigator();

export const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: "absolute",
          marginLeft: 0,
          borderTopWidth: 0,
          backgroundColor: "white",
          //    backgroundColor: "transparent", // make it transparent to see the image
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2, // pushes label down
        },
        headerShown: false,
        tabBarBackground: () => (
          <LinearGradient
            colors={[Colors.gradient2, Colors.gradient1]}
            style={{ flex: 1, opacity: 1 }}
          />
        ),
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
        tabBarActiveTintColor: Colors.activeTab, //"#E07A5F",
        tabBarInactiveTintColor: Colors.inactiveTab, // "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={VibeKeyHome}
        options={{
          //   tabBarStyle: { display: "none" },
          headerShown: false,
          gestureEnabled: true,
          presentation: "modal",
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
      <Tab.Screen
        name="VibeCheck"
        component={VibeCheckStack}
        options={{
          tabBarLabel: "Check",
        }}
        screenOptions={() => ({
          headerShown: false,
          tabBarStyle: { display: "none" },
        })}
      />
      <Tab.Screen name="Scan" component={MeditationStack} />
      <Tab.Screen name="VibeMatch" component={VibeMatchStack} options={{ tabBarLabel: "Match" }} />
      <Tab.Screen name="InnerWork" component={ToolsStack} options={{ tabBarLabel: "Journey" }} />
      <Tab.Screen name="Settings" component={SettingsStack} options={{ tabBarLabel: () => null }} />
      <Tab.Screen
        name="StreakStack"
        component={StreakStack}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null, // Hides button
          //   tabBarStyle: { display: "none" }, // Only use this if you want to hide the bar entirely
        }}
      />
    </Tab.Navigator>
  );
};
