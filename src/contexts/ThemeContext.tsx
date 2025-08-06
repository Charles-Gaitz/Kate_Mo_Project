import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { themes, ThemeConfig } from '../config/themes';

// Define the theme type based on our themes config
export type ThemeKey = keyof typeof themes;
export type Theme = ThemeConfig;

interface ThemeContextType {
  currentTheme: ThemeKey;
  theme: Theme;
  setTheme: (themeKey: ThemeKey) => void;
  availableThemes: Array<{ key: ThemeKey; name: string; icon: string }>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('default');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('kate-theme') as ThemeKey;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage and update CSS custom properties
  const setTheme = (themeKey: ThemeKey) => {
    setCurrentTheme(themeKey);
    localStorage.setItem('kate-theme', themeKey);
    
    // Update CSS custom properties for instant theme switching
    const root = document.documentElement;
    
    // Set CSS custom properties for more efficient theme switching
    root.style.setProperty('--theme-transition', 'all 0.3s ease-in-out');
    
    // Set data attribute for CSS selectors
    document.body.setAttribute('data-theme', themeKey);
  };

  const availableThemes = Object.entries(themes).map(([key, theme]) => ({
    key: key as ThemeKey,
    name: theme.name,
    icon: theme.icon
  }));

  const theme = themes[currentTheme];

  const value: ThemeContextType = {
    currentTheme,
    theme,
    setTheme,
    availableThemes
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
