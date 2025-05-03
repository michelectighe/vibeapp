import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@config/firebaseConfig";
import { styles, profileAssets } from "./StylesProfile";
import { GradientBackground, CustomSpiritualButton } from "@components";
import { getFriendlyError } from "@utils";
import { Colors, Fonts } from "@constants";
import { useAmbientControlForScreen } from "@hooks";

export const ForgotPasswordScreen = ({ navigation }) => {
  useAmbientControlForScreen(true);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    setError("");
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(" Check your inbox for a password reset email.");
    } catch (err) {
      const friendly = getFriendlyError(err.code);
      setError(
        friendly || "There was a problem with the entered email address."
      );
      //  setError(err.message);
    }
  };

  return (
    // <ImageBackground
    //   source={profileAssets.background}
    //   style={styles.bg}
    //   resizeMode="cover"
    // >
    <GradientBackground
      colors={[
        Colors.VibeGradient1,
        Colors.VibeGradient2,
        Colors.VibeGradient1,
      ]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={80} // tweak if needed for your layout
        >
          <View style={styles.container}>
            <Text style={styles.title}>Reset Your Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}
            {message ? <Text style={styles.success}>{message}</Text> : null}

            <CustomSpiritualButton
              label="Send Reset Email"
              onPress={handleReset}
              color={Colors.vcButtonColor}
              textColor={Colors.vcButtonTextColor}
            />
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backLink}>← Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </GradientBackground>
    // </ImageBackground>
  );
};
