import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { loadResults } from "@/utils";

export const MyResultsContext = createContext();

export const MyResultsProvider = ({ children }) => {
  const [myResults, setMyResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, authLoading } = useAuth();

  const refreshResults = async () => {
    if (!user?.uid) return;
    const results = await loadResults(user.uid);
    setMyResults(results);
  };

  useEffect(() => {
    const loadUserResults = async () => {
      if (authLoading || !user?.uid) {
        console.log("⏳ Waiting for auth...");
        return;
      }
      setLoading(true);
      await refreshResults();
      setLoading(false);
    };

    loadUserResults();
  }, [user?.uid, authLoading]);

  return (
    <MyResultsContext.Provider value={{ myResults, loading, refreshResults, setMyResults }}>
      {children}
    </MyResultsContext.Provider>
  );
};
