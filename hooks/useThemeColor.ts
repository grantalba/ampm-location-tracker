import { darkColors, lightColors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";

export const useThemeColors = () => {
  const { theme } = useTheme();
  return theme === "dark" ? darkColors : lightColors;
};
