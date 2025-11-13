import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type ThemeName =
  | "default"
  | "blackwhite"
  | "sakura"
  | "navy"
  | "matrix"
  | "starry";

export interface Theme {
  name: ThemeName;
  displayName: string;
  colors: {
    background: string;
    text: string;
    textSecondary: string;
    correct: string;
    incorrect: string;
    accent: string;
    cardBg: string;
  };
  previewColors: string[];
}

export const themes: Record<ThemeName, Theme> = {
  default: {
    name: "default",
    displayName: "Default",
    colors: {
      background: "#1e1810",
      text: "#d1d5db",
      textSecondary: "#9ca3af",
      correct: "#10b981",
      incorrect: "#ef4444",
      accent: "#f59e0b",
      cardBg: "#2d2416",
    },
    previewColors: ["#1e1810", "#f59e0b", "#2d2416"],
  },
  blackwhite: {
    name: "blackwhite",
    displayName: "Black & White",
    colors: {
      background: "#000000",
      text: "#ffffff",
      textSecondary: "#a0a0a0",
      correct: "#ffffff",
      incorrect: "#666666",
      accent: "#ffffff",
      cardBg: "#1a1a1a",
    },
    previewColors: ["#000000", "#ffffff", "#1a1a1a"],
  },
  sakura: {
    name: "sakura",
    displayName: "Sakura",
    colors: {
      background: "#ffe0e9",
      text: "#5c2e3e",
      textSecondary: "#8b5a6a",
      correct: "#e91e63",
      incorrect: "#c62828",
      accent: "#ff80ab",
      cardBg: "#ffc1d4",
    },
    previewColors: ["#ffe0e9", "#e91e63", "#ff80ab"],
  },
  navy: {
    name: "navy",
    displayName: "Navy",
    colors: {
      background: "#0a192f",
      text: "#ccd6f6",
      textSecondary: "#8892b0",
      correct: "#64ffda",
      incorrect: "#ff5370",
      accent: "#64ffda",
      cardBg: "#112240",
    },
    previewColors: ["#0a192f", "#64ffda", "#112240"],
  },
  matrix: {
    name: "matrix",
    displayName: "Matrix",
    colors: {
      background: "#0d0d0d",
      text: "#00ff00",
      textSecondary: "#008000",
      correct: "#00ff00",
      incorrect: "#ff0000",
      accent: "#00ff00",
      cardBg: "#1a1a1a",
    },
    previewColors: ["#0d0d0d", "#00ff00", "#1a1a1a"],
  },
  starry: {
    name: "starry",
    displayName: "Starry",
    colors: {
      background: "#0f0f23",
      text: "#cccccc",
      textSecondary: "#999999",
      correct: "#00cc00",
      incorrect: "#cc0000",
      accent: "#ffff66",
      cardBg: "#1a1a2e",
    },
    previewColors: ["#0f0f23", "#ffff66", "#1a1a2e"],
  },
};

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeName: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return themes[(saved as ThemeName) || "default"];
  });

  useEffect(() => {
    localStorage.setItem("theme", currentTheme.name);

    document.documentElement.style.setProperty(
      "--bg-primary",
      currentTheme.colors.background,
    );
    document.documentElement.style.setProperty(
      "--text-primary",
      currentTheme.colors.text,
    );
    document.documentElement.style.setProperty(
      "--text-secondary",
      currentTheme.colors.textSecondary,
    );
    document.documentElement.style.setProperty(
      "--color-correct",
      currentTheme.colors.correct,
    );
    document.documentElement.style.setProperty(
      "--color-incorrect",
      currentTheme.colors.incorrect,
    );
    document.documentElement.style.setProperty(
      "--color-accent",
      currentTheme.colors.accent,
    );
    document.documentElement.style.setProperty(
      "--bg-card",
      currentTheme.colors.cardBg,
    );
  }, [currentTheme]);

  const setTheme = (themeName: ThemeName) => {
    setCurrentTheme(themes[themeName]);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
