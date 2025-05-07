// ModelContext.js
import React, { createContext, useState, useContext } from "react";

const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [model, setModel] = useState(null);
  return <ModelContext.Provider value={{ model, setModel }}>{children}</ModelContext.Provider>;
};

export const useModel = () => useContext(ModelContext);
