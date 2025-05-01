import React from "react";
import { AppleButton } from "@invertase/react-native-apple-authentication";

const SignInWithApple = () => {
  return (
    <AppleButton
      buttonStyle={AppleButton.Style.BLACK}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: 200,
        height: 44,
      }}
      onPress={() => {
        // handle Apple sign-in
      }}
    />
  );
};
