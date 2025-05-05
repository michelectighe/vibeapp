import {
  AppleButton,
  appleAuth,
} from "@invertase/react-native-apple-authentication";

export const signInWithApple = async () => {
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
