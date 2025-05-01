import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@config/firebaseConfig";
import { useAuth } from "./AuthContext";

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const { user, authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.uid) {
        try {
          const ref = doc(db, "users", user.uid);
          const snap = await getDoc(ref);
          if (!snap.exists()) {
            const fallbackProfile = {
              name: user.displayName || "",
              email: user.email,
              createdAt: new Date(),
            };
            await setDoc(ref, fallbackProfile);
            setProfile(fallbackProfile);
          } else {
            setProfile(user);
          }
        } catch (err) {
          console.error("❌ Failed to load user profile:", err);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [user?.uid]);

  return (
    <UserProfileContext.Provider value={{ profile, setProfile, loading }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
