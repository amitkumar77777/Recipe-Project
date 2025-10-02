import React, { createContext, useState } from "react";

export const RecipesContext = createContext(null);

export const RecipeProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem("recipe");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  return (
    <RecipesContext.Provider value={{ data, setData }}>
      {children}
    </RecipesContext.Provider>
  );
};