// MyTabs.js
import React, { useRef, useEffect, useCallback } from "react";
import { View, StyleSheet, Animated } from "react-native";
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
import { ProfileAvatar, TabBarIcon } from "@components";
import { Colors } from "@constants";
import { resetStack } from "@/utils";

const Tab = createBottomTabNavigator();

export const MyTabs = () => {
  // const navigationRef = useNavigationContainerRef();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // useFocusEffect(
  //   useCallback(() => {
  //     const currentRoute = navigationRef.getCurrentRoute();
  //     console.log("currentRoute:", currentRoute);
  //     if (currentRoute) {
  //       navigationRef.reset({
  //         index: 0,
  //         routes: [{ name: "Tabs", screen: "Home" }],
  //       });
  //     }
  //   }, []),
  // );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        unmountOnBlur: true,
        headerShown: false,
        tabBarBackground: () => (
          <View
            style={{
              flex: 1,
              overflow: "hidden",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            }}
          >
            <BlurView
              style={{ flex: 1 }}
              blurType="light"
              blurAmount={30}
              reducedTransparencyFallbackColor="rgba(40, 60, 50, 0.6)"
            />
            <LinearGradient
              colors={["rgba(255,255,255,0.05)", "rgba(255,255,255,0.15)"]}
              style={{ ...StyleSheet.absoluteFillObject }}
            />
          </View>
        ),
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 0,
          height: 70,
          borderRadius: 24,
          borderTopWidth: 0,
          backgroundColor: "transparent",
          elevation: 10, // Android shadow
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 8,
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
              }}
            >
              <TabBarIcon name={iconName} size={size} color={color} focused={focused} />
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
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            resetStack("Home");
          },
        })}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          gestureEnabled: true,
          presentation: "modal",
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
      <Tab.Screen
        name="VibeCheck"
        component={VibeCheckStack}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            resetStack("VibeCheck");
          },
        })}
        options={{
          tabBarLabel: "Check",
          unmountOnBlur: true,
        }}
        screenOptions={() => ({
          headerShown: false,
          tabBarStyle: { display: "none" },
        })}
      />
      <Tab.Screen
        name="Scan"
        component={MeditationStack}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            resetStack("Scan");
          },
        })}
      />
      <Tab.Screen
        name="VibeMatch"
        component={VibeMatchStack}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            resetStack("ShareScreen");
          },
        })}
        options={{ tabBarLabel: "Match" }}
      />
      <Tab.Screen
        name="InnerWork"
        component={ToolsStack}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            resetStack("InnerWork");
          },
        })}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{ tabBarLabel: () => null }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            resetStack();
          },
        })}
      />
      <Tab.Screen
        name="StreakStack"
        component={StreakStack}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            resetStack();
          },
        })}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};
