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
import { auth } from "@config/firebaseConfig"; // adjust path if needed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
      //   //console.log("Auth state changed:", user ? "Logged in" : "Logged out");
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
      //console.log("signed in from cauth ontext:", email);
    } catch (error) {
      console.error("Sign In Error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  const updateProfile = async (updates) => {
    try {
      //console.log('updating')
      if (auth.currentUser) {
        await firebaseUpdateProfile(auth.currentUser, updates);
      }
    } catch (error) {
      console.error("Update Profile Error:", error);
      throw error;
    }
  };
  const updateEmail = async (newEmail) => {
    try {
      await firebaseUpdateEmail(auth.currentUser, newEmail);
    } catch (error) {
      console.error("Update Email Error:", error);
      throw error;
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      await firebaseUpdatePassword(auth.currentUser, newPassword);
    } catch (error) {
      console.error("Update Password Error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
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

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
