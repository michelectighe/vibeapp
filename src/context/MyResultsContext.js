// in @context/MyResultsContext.js
import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getResultsForUser } from "@/database";

export const MyResultsContext = createContext();

export const MyResultsProvider = ({ children }) => {
  const [myResults, setMyResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, authLoading} = useAuth(); 

  useEffect(() => {
      console.log("🟡 user:", user?.uid);
      console.log("🟡 authLoading:", authLoading);
    const loadResults = async () => {

  if (authLoading || !user?.uid) {
        console.log("⏳ Waiting for auth...");
        return;}
        console.log("✅ Fetching results for UID:", user.uid);
        const results = (await getResultsForUser(user.uid)) ?? [];
        setMyResults(results);
      //  console.log('results from getResultsForUser:', results)


      setLoading(false);
      console.log('set loading')
    };

    loadResults();
  }, [user?.uid, authLoading]);

  return (
    <MyResultsContext.Provider value={{ myResults, loading }}>{children}</MyResultsContext.Provider>
  );
};
