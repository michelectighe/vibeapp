// MyTabs.js
import React from "react";
import { View, Easing } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CardStyleInterpolators,
  TransitionSpecs,
} from "@react-navigation/stack";
import {
  SettingsStack,
  VibeCheckStack,
  VibeMatchStack,
  MeditationStack,
} from "@navigation";
import { Ionicons } from "@expo/vector-icons";
import LinearGradient from "react-native-linear-gradient";
import { VibeKeyHome } from "@screens";
import { ProfileAvatar } from "@components";
import { Colors } from "@constants";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
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
        headerShown: false,
        tabBarBackground: () => (
          <LinearGradient
            colors={[Colors.VibeGradient1, Colors.VibeGradient2]}
            style={{ flex: 1, opacity: 0.8 }}
          />
        ),
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
          } else if (route.name === "Meditate") {
            iconName = focused ? "leaf" : "leaf-outline";
          } else if (route.name === "VibeMatch") {
            iconName = focused ? "heart" : "heart-outline";
          }

          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
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
          // transitionSpec: {
          //   open: {
          //     animation: "timing",
          //     config: {
          //       duration: 500, // 👈 slow this down
          //       easing: Easing.out(Easing.poly(4)),
          //     },
          //   },
          //   close: {
          //     animation: "timing",
          //     config: {
          //       duration: 500, // 👈 match for closing too
          //       easing: Easing.out(Easing.poly(4)),
          //     },
          //   },
          // },
        }}
        // options={{
        //   //   tabBarStyle: { display: "none" },
        //   headerShown: false,
        //   gestureEnabled: true,
        //   presentation: "modal",
        //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOSInverted,
        // }}
      />
      <Tab.Screen
        name="VibeCheck"
        component={VibeCheckStack}
        screenOptions={({ navigation }) => ({
          headerShown: false,
          tabBarStyle: { display: "none" },
        })}
      />
      <Tab.Screen name="Meditate" component={MeditationStack} />
      <Tab.Screen name="VibeMatch" component={VibeMatchStack} />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{ tabBarLabel: () => null }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
