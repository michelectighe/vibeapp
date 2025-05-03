import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  SettingsScreen,
  SignInScreen,
  SignUpScreen,
  ProfileSetupScreen,
  ForgotPasswordScreen,
  SubscriptionScreen,
  UpdateProfileScreen,
} from "@screens";


export const SettingsStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={({ navigation }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarVisible: true,
          tabBarStyle: { display: "flex" },
          title: "",
        }}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileSetupScreen"
        component={ProfileSetupScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdateProfileScreen"
        component={UpdateProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
