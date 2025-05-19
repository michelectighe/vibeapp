import { appleAuth } from "@invertase/react-native-apple-authentication";
import { OAuthProvider, signInWithCredential, updateProfile, getAuth } from "firebase/auth";

export const signInWithApple = async () => {
  try {
    const auth = getAuth();

    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const { identityToken, nonce, fullName } = appleAuthRequestResponse;

    if (!identityToken) {
      throw new Error("Apple Sign-In failed: No identity token returned");
    }

    const provider = new OAuthProvider("apple.com");
    const credential = provider.credential({
      idToken: identityToken,
      rawNonce: nonce,
    });

    // Sign in with Firebase using Apple credentials
    const result = await signInWithCredential(auth, credential);
    const { user } = result;

    // Only update name if available and this is the FIRST login
    if (fullName?.givenName && user.displayName == null) {
      const displayName = fullName.givenName;
      await updateProfile(user, { displayName });
    }

    return { success: true };
  } catch (error) {
    //console.log("🍏 Apple Sign-In error:", error);

    // Detect cancel
    if (error?.message?.includes("AuthorizationError") && error?.message?.includes("1001")) {
      return { success: false, cancelled: true };
    }

    return {
      success: false,
      message: error?.message || "Apple sign-in failed",
    };
  }
};
