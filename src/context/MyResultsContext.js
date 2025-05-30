import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getResultsForUser } from "@/database";

export const MyResultsContext = createContext();

export const MyResultsProvider = ({ children }) => {
  const [myResults, setMyResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, authLoading } = useAuth();

  useEffect(() => {
    const loadUserResults = async () => {
      if (authLoading || !user?.uid) {
        //console.log("⏳ Waiting for auth...");
        return;
      }
      setLoading(true);
      await loadResults();
      setLoading(false);
    };

    loadUserResults();
  }, [user?.uid, authLoading]);

  const loadResults = async (userId) => {
    try {
      if (!userId) {
        console.warn("User not logged in");
        return [];
      }
      // first try getting local results
      const results = getResultsForUser(userId);
        setMyResults(results);
    } catch (error) {
      console.error("Error loading results:", error);
      return [];
    }
  };

  return (
    <MyResultsContext.Provider value={{ myResults, loading,  setMyResults }}>
      {children}
    </MyResultsContext.Provider>
  );
};
