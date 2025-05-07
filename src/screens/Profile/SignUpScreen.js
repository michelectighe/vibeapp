import React, { useState} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { auth, db } from "@config/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getFriendlyError, signInWithApple } from "@utils";
import { styles } from "./SignUpScreen.style";
import { globalStyles } from "@styles";
import { GradientBackground, SectionLayout, CustomSpiritualButton } from "@components";
import { Colors, Fonts } from "@constants";
import { useAmbientControlForScreen } from "@hooks";

export const SignUpScreen = ({ navigation }) => {
  useAmbientControlForScreen(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleSignUpWithApple = async () => {
    signInWithApple();
  };
  const handleSignUp = async () => {
    //console.log("handlesignup");
    setError("");
    try {
      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      if (!/[A-Z]/.test(password)) {
        setError("Password must include at least one uppercase letter.");
        return;
      }

      if (!/[0-9]/.test(password)) {
        setError("Password must include at least one number.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      //console.log("afterUserCredential");
      const user = userCredential.user;
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      // 2. Create Firestore user doc
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        createdAt: serverTimestamp(),
        goals: "", // add anything you want to customize later
      });

      //console.log("✅ User signed up:", name);
      navigation.replace("ProfileSetupScreen");

      //navigation.navigate("SignInScreen");
    } catch (err) {
      console.error(err);
      const friendly = getFriendlyError(err.code);
      setError(friendly);
    }
  };

  return (
    <GradientBackground colors={[Colors.gradient1, Colors.gradient2, Colors.gradient1]}>
      <SectionLayout
        topFlex={1}
        middleFlex={3}
        bottomFlex={0}
        topContent={
          <View style={globalStyles.titleWrapper}>
            <Text style={globalStyles.title}>Create Account</Text>
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
                <View style={globalStyles.formContainer}>
                  <TouchableOpacity
                    style={styles.link}
                    onPress={() => navigation.navigate("SignInScreen")}
                  >
                    <Text style={[styles.link, { textAlign: "center" }]}>
                      Already have an account? Sign In
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.formContainer}>
                    <TextInput
                      style={globalStyles.input}
                      placeholder="Name"
                      placeholderTextColor="#999"
                      value={name}
                      onChangeText={setName}
                    />
                    <TextInput
                      style={globalStyles.input}
                      placeholder="Email"
                      placeholderTextColor="#999"
                      autoComplete="email"
                      textContentType="emailAddress"
                      value={email}
                      onChangeText={setEmail}
                    />
                    <View style={globalStyles.passwordContainer}>
                      <TextInput
                        style={globalStyles.passwordInput}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        autoComplete="password"
                        textContentType="password"
                        secureTextEntry={!passwordVisible}
                        value={password}
                        onChangeText={setPassword}
                      />
                      <TouchableOpacity
                        onPress={() => setPasswordVisible(!passwordVisible)}
                        style={styles.eyeIcon}
                      >
                        {passwordVisible ? (
                          <MaterialIcons name="visibility-off" size={24} color="#888" />
                        ) : (
                          <MaterialIcons name="visibility" size={24} color="#888" />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <CustomSpiritualButton
                      label="Sign Up"
                      onPress={handleSignUp}
                      color={Colors.buttonBackground}
                      textColor={Colors.lightText}
                    />
                    <Text
                      style={{
                        marginTop: 5,
                        textAlign: "center",
                        color: "white",
                        fontSize: 18,
                      }}
                    >
                      {error}
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 30, alignItems: "center" }}>
                  <AppleButton
                    buttonStyle={AppleButton.Style.WHITE}
                    buttonType={AppleButton.Type.SIGN_UP}
                    style={{
                      width: 200,
                      height: 44,
                    }}
                    onPress={() => {
                      handleSignUpWithApple();
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
