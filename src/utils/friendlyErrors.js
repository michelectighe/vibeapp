export const getFriendlyError = (errorCode) => {
  console.log(errorCode)
  switch (errorCode) {
    // SIGN UP ERRORS
    case "auth/email-already-in-use":
      return "That email is already registered. Try signing in.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";

    // SIGN IN ERRORS
    case "auth/user-not-found":
      return "No account found with that email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    // PASSWORD RESET ERRORS
    case "auth/missing-email":
      return "Please enter your email address.";
    case "auth/user-disabled":
      return "This account has been disabled.";

    // GENERAL
    case "auth/internal-error":
      return "An internal error occurred. Please try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled.";
    case "auth/unauthorized-domain":
      return "This sign-in is not allowed from this domain.";

    // APPLE
    case "auth/missing-apple-client-id":
      return "Missing Apple client ID. Please contact support.";

    case "auth/missing-apple-auth-code":
      return "Missing Apple authorization code. Try signing in again.";

    case "auth/invalid-identity-token":
      return "Invalid identity token from Apple. Try signing in again.";

    case "auth/invalid-credential":
      return "Invalid Apple credential. Please try again.";

    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email but different sign-in method. Try using a different sign-in method.";

    case "auth/cancelled-popup-request":
    case "auth/popup-closed-by-user":
      return "Apple sign-in was cancelled before completion.";

    case "auth/user-cancelled" :
      return "You cancelled the Apple sign-in.";

    // BIOMETRIC
    case "ERR_CANCELED":
      return "Sign-in was cancelled.";

    default:
      return "Something went wrong. Please try again.";
  }
};
