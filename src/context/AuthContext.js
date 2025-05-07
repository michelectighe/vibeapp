import React, { createContext, useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@config/firebaseConfig";
import Purchases from "react-native-purchases"; // 👈 RevenueCat import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [premiumDetails, setPremiumDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setAuthLoading(false);

      if (user) {
        try {
          await Purchases.logIn(user.uid);

          const customerInfo = await Purchases.getCustomerInfo();
     //     console.log("📦 RevenueCat customerInfo:", customerInfo); // Optional: debug log

          const entitlement = customerInfo?.entitlements?.active?.Premium_Access;

          if (entitlement) {
            setIsPremium(true);
            setPremiumDetails({
              productIdentifier: entitlement.productIdentifier,
              expiresDate: entitlement.expiresDate,
              willRenew: entitlement.willRenew,
              periodType: entitlement.periodType, // trial, normal, intro
            });
          } else {
            setIsPremium(false);
            setPremiumDetails(null);

            // if (__DEV__) {
            // setIsPremium(true);
            // setPremiumDetails({
            //   productIdentifier: "debug_product",
            //   expiresDate: "2099-12-31",
            //   willRenew: true,
            //   periodType: "debug",
            // });
            // }
          }
        } catch (e) {
          console.error("RevenueCat error:", e);
          setIsPremium(false);
          setPremiumDetails(null);
        }
      } else {
        await Purchases.logOut();
        setIsPremium(false);
        setPremiumDetails(null);
      }
    });

    return unsubscribe;
  }, []);

  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Sign Up Error:", error);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Sign In Error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);

      // Try logging out of RevenueCat if initialized properly
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        const hasSubscription = Object.keys(customerInfo.entitlements.active).length > 0;

        if (hasSubscription || customerInfo.originalAppUserId) {
          await Purchases.logOut();
        }
      } catch (revCatError) {
        console.warn("RevenueCat logout skipped:", revCatError.message);
      }
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  const updateProfile = async (updates) => {
    if (auth.currentUser) {
      try {
        await firebaseUpdateProfile(auth.currentUser, updates);
      } catch (error) {
        console.error("Update Profile Error:", error);
        throw error;
      }
    }
  };

  const updateEmail = async (newEmail) => {
    if (auth.currentUser) {
      try {
        await firebaseUpdateEmail(auth.currentUser, newEmail);
      } catch (error) {
        console.error("Update Email Error:", error);
        throw error;
      }
    }
  };

  const updatePassword = async (newPassword) => {
    if (auth.currentUser) {
      try {
        await firebaseUpdatePassword(auth.currentUser, newPassword);
      } catch (error) {
        console.error("Update Password Error:", error);
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        isPremium,
        premiumDetails, // 🆕
        updateEmail,
        updatePassword,
        updateProfile,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
