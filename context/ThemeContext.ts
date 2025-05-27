import { createContext, useContext } from "react";

// Define the theme type
export type Theme = "light" | "dark";

// Define the context shape
interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

// Create the context with undefined as default
export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
