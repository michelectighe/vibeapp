import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Button,
  InteractionManager,
} from "react-native";
import {
  AppleButton,
  appleAuth,
} from "@invertase/react-native-apple-authentication";
import { MaterialIcons } from "@expo/vector-icons";

import {
  getAuth,
  signInWithCredential,
  OAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useAuth } from "@context";
import { GradientBackground, CustomSpiritualButton } from "@components";
import { Fonts, Colors } from "@constants";
import { profileStyles, profileAssets } from "@styles/StylesProfile";
import {
  getBiometricOptIn,
  saveBiometricOptIn,
  saveCredentials,
  getSavedCredentials,
  getFriendlyError,
} from "@utils";

// GoogleSignin.configure({
//   webClientId:
//     "273448011711-7v67pqidt0qhl9n73h9153qghvpqfm2u.apps.googleusercontent.com",
//   iosClientId:
//     "104401126316-qlr796caoj090l9h1f402e42ljdf5qvs.apps.googleusercontent.com",
// });

const SignInScreen = ({ navigation, returnTo }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const tryFaceID = async () => {
      try {
        //console.log("🔍 Checking biometric opt-in...");
        const optedIn = await getBiometricOptIn();
        //console.log("🔐 Biometric opt-in value:", optedIn);

        if (optedIn) {
          //console.log("🔑 Fetching credentials...");
          const { email: savedEmail, password: savedPassword } =
            await getSavedCredentials();
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
  }, []);

  const signInWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      if (appleAuthRequestResponse.fullName) {
        const { givenName } = appleAuthRequestResponse.fullName;
        const displayName = `${givenName ?? ""}`.trim();
        const { identityToken, nonce } = appleAuthRequestResponse;

        if (!identityToken) {
          throw new Error("Apple Sign-In failed - no identity token returned");
        }

        const provider = new OAuthProvider("apple.com");
        const credential = provider.credential({
          idToken: identityToken,
          rawNonce: nonce,
        });

        await signInWithCredential(auth, credential);
        console.log("after signinwithcred");
        if (displayName && auth.currentUser) {
          await updateProfile(auth.currentUser, { displayName });
        }
        setError("");
        resetAndLeave();
      }
    } catch (error) {
      //  console.error("❌ iOS sign-in error:", error);
      // 👇 Check for Apple native cancellation
      if (
        error?.message?.includes("AuthorizationError") &&
        error?.message?.includes("1001")
      ) {
        setError("You cancelled Apple sign-in.");
      } else {
        const friendly = getFriendlyError(error.code);
        setError(friendly || "There was a problem signing in with Apple.");
      }
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
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };
  return (
    // <ImageBackground
    //   source={profileAssets.background}
    //   style={profileStyles.bg}
    //   resizeMode="cover"
    // >
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <View style={profileStyles.container}>
        <Text style={profileStyles.heading}>Sign In</Text>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80} // tweak if needed for your layout
          >
            {signInError ? (
              <Text style={profileStyles.error}>{signInError}</Text>
            ) : null}

            <View style={profileStyles.formContainer}>
              <TextInput
                style={profileStyles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                autoComplete="email"
                textContentType="emailAddress"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <View style={profileStyles.passwordContainer}>
                <TextInput
                  style={profileStyles.passwordInput}
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
                  style={profileStyles.eyeIcon}
                >
                  {passwordVisible ? (
                    <MaterialIcons
                      name="visibility-off"
                      size={24}
                      color="#888"
                    />
                  ) : (
                    <MaterialIcons name="visibility" size={24} color="#888" />
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPasswordScreen")}
              >
                <Text style={profileStyles.forgot}>Forgot Password?</Text>
              </TouchableOpacity>
              <CustomSpiritualButton
                label="Sign In"
                onPress={handleSignIn}
                color={Colors.vcButtonColor}
                textColor={Colors.vcButtonTextColor}
              />

              <TouchableOpacity
                onPress={() => navigation.navigate("SignUpScreen")}
              >
                <Text style={[profileStyles.link, { textAlign: "center" }]}>
                  Don't have an account?
                </Text>
                <Text style={[profileStyles.link, { textAlign: "center" }]}>
                  Sign Up or Sign in with Apple
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 30, alignItems: "center" }}>
              <AppleButton
                buttonStyle={AppleButton.Style.WHITE}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{
                  width: 200,
                  height: 44,
                }}
                onPress={() => {
                  signInWithApple();
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({});

export default SignInScreen;
