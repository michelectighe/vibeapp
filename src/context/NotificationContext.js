import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { dbFs } from "@config/firebaseConfig"; // adjust path as needed
import { useAuth } from "@/context"; // or however you get the current user

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth(); // adjust to your auth context
  const [newMatchesCount, setNewMatchesCount] = useState(0);

  useEffect(() => {
    if (!user?.uid) return;
    // Your query: adjust fields as needed
  const q = query(
    collection(dbFs, "matchLinks"),
    where("senderUserId", "==", user.uid),
    where("completed", "==", true),
    where("read", "==", false),
  );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNewMatchesCount(snapshot.size); // auto-updates in real time
    });
    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <NotificationContext.Provider value={{ newMatchesCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
