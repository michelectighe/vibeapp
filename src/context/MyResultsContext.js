// in @context/MyResultsContext.js
import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { loadResults } from "@/utils";

export const MyResultsContext = createContext();

export const MyResultsProvider = ({ children }) => {
  const [myResults, setMyResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, authLoading } = useAuth();

  useEffect(() => {
    const loadUserResults = async () => {
      if (authLoading || !user?.uid) {
        console.log("⏳ Waiting for auth...");
        return;
      }
      const results = await loadResults(user.uid);
      //      console.log("IN CONTEXT _ RESULTS:", results)
      setMyResults(results);
      setLoading(false);
    };
    loadUserResults();
  }, [user?.uid, authLoading]);

  return (
    <MyResultsContext.Provider value={{ myResults, loading }}>{children}</MyResultsContext.Provider>
  );
};
