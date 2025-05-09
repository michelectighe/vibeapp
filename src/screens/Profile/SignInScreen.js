import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useAmbientControlForScreen } from "@hooks";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import { useAuth } from "@context";
import { GradientBackground, CustomSpiritualButton, SectionLayout } from "@components";
import { Fonts, Colors } from "@constants";
import { styles } from "./SignInScreen.style";
import { globalStyles } from "@styles";
import { getBiometricOptIn, getSavedCredentials, getFriendlyError, signInWithApple } from "@utils";

// GoogleSignin.configure({
//   webClientId:
//     "273448011711-7v67pqidt0qhl9n73h9153qghvpqfm2u.apps.googleusercontent.com",
//   iosClientId:
//     "104401126316-qlr796caoj090l9h1f402e42ljdf5qvs.apps.googleusercontent.com",
// });

export const SignInScreen = ({ navigation, route }) => {
  const returnTo = route?.params?.returnTo;
  console.log("ReturnTo Value:", returnTo);
  useAmbientControlForScreen(true);
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const tryFaceID = async () => {
      try {
        //console.log("🔍 Checking biometric opt-in...");
        const optedIn = await getBiometricOptIn();
        //console.log("🔐 Biometric opt-in value:", optedIn);

        if (optedIn) {
          //console.log("🔑 Fetching credentials...");
          const { email: savedEmail, password: savedPassword } = await getSavedCredentials();
          //console.log("📧 Email:", savedEmail, "🔒 Password:", !!savedPassword);

          if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            await handleSignIn(savedEmail, savedPassword);
          }
        }
      } catch (error) {
        if (
          error.message?.includes("User canceled") ||
          error.message?.includes("Authentication was canceled") ||
          error.message?.includes("Canceled") ||
          error.code === "UserCancel" // platform-specific sometimes
        ) {
          //console.log("🔕 User canceled Face ID. Skipping biometric login.");
          return; // just silently exit
        }

        console.error("❌ Biometric error:", error);
        const friendly = getFriendlyError(error.code);
        setError(friendly);
      }
    };

    tryFaceID();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAppleLogin = async () => {
    const result = await signInWithApple();
    if (result.cancelled) {
      Alert.alert("Apple sign-in cancelled");
    } else if (!result.success) {
      Alert.alert("Sign-in Error", result.message);
    } else {
      resetAndLeave();
    }
  };

  const handleSignIn = async (providedEmail, providedPassword) => {
    setError("");

    const finalEmail = email;
    const finalPassword = providedPassword ?? password;
    //console.log(email)
    //console.log(finalPassword)
    if (!finalEmail || !finalPassword) {
      setError("Email and password are required.");
      return;
    }
    await signIn(finalEmail, finalPassword);
    resetAndLeave();
  };
  const resetAndLeave = () => {
    console.log("returnto:", returnTo);
    if (returnTo && typeof returnTo === "object") {
      console.log("object return:", returnTo);
      navigation.reset({
        index: 0,
        routes: [returnTo],
      });
    } else if (typeof returnTo === "string") {
      console.log("string return:", returnTo);
      navigation.reset({
        index: 0,
        routes: [{ name: returnTo }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Tabs", screen: "Home" }],
      });
    }
  };

  return (
    // <ImageBackground
    //   source={profileAssets.background}
    //   style={styles.bg}
    //   resizeMode="cover"
    // >
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}>
      <SectionLayout
        topFlex={1}
        middleFlex={3}
        bottomFlex={0}
        topContent={
          <View style={globalStyles.titleWrapper}>
            <Text style={globalStyles.title}>Sign In</Text>
          </View>
        }
        middleContent={
          <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={80} // tweak if needed for your layout
              >
                {signInError ? <Text style={styles.error}>{signInError}</Text> : null}

                <View style={globalStyles.formContainer}>
                  <TouchableOpacity
                    style={styles.link}
                    onPress={() => navigation.navigate("SignUpScreen")}
                  >
                    <Text style={[globalStyles.link, { alignSelf: "center", textAlign: "center" }]}>
                      Don&apos;t have an account? Sign Up
                    </Text>
                  </TouchableOpacity>
                  <TextInput
                    style={globalStyles.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    autoComplete="email"
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  <View style={globalStyles.passwordContainer}>
                    <TextInput
                      style={globalStyles.passwordInput}
                      placeholder="Enter Password"
                      placeholderTextColor="#999"
                      secureTextEntry={!passwordVisible}
                      autoComplete="password"
                      autoCapitalize="none"
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setPasswordVisible(!passwordVisible)}
                      style={styles.eyeIcon}
                    >
                      {passwordVisible ? (
                        <MaterialIcons name="visibility" size={24} color="#888" />
                      ) : (
                        <MaterialIcons name="visibility-off" size={24} color="#888" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={globalStyles.link}
                  onPress={() => navigation.navigate("ForgotPasswordScreen")}
                >
                  <Text style={globalStyles.link}>Forgot Password?</Text>
                </TouchableOpacity>
                <View>
                  <CustomSpiritualButton
                    label="Sign In"
                    onPress={handleSignIn}
                    color={Colors.buttonBackground}
                    textColor={Colors.lightText}
                  />
                </View>

                <Text
                  style={[
                    globalStyles.link,
                    { alignSelf: "center", textAlign: "center", marginTop: 20 },
                  ]}
                >
                  Or Sign in with Apple
                </Text>

                <View style={{ alignItems: "center" }}>
                  <AppleButton
                    buttonStyle={AppleButton.Style.WHITE}
                    buttonType={AppleButton.Type.SIGN_IN}
                    style={styles.appleButton}
                    onPress={() => {
                      handleAppleLogin();
                    }}
                  />
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </>
        }
      />
    </GradientBackground>
  );
};
