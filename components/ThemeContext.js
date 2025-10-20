import React, { createContext, useContext, useState } from "react";
import { StatusBar } from "react-native";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const themeStyles = {
    background: theme === "light" ? "#f9fafb" : "#0f172a",
    text: theme === "light" ? "#0f172a" : "#f9fafb",
    card: theme === "light" ? "#ffffff" : "#1e293b",
    statusBar: theme === "light" ? "dark-content" : "light-content",
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
      <StatusBar
        barStyle={themeStyles.statusBar}
        backgroundColor={themeStyles.background}
      />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
