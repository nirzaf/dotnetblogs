'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  
  useEffect(() => {
    // Get theme from localStorage or default to system
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    // Apply theme to document
    applyTheme(savedTheme || 'system');
  }, []);
  
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    root.classList.remove('dark');
    
    if (newTheme === 'dark' || 
        (newTheme === 'system' && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    }
    
    // Save to localStorage
    if (newTheme !== 'system') {
      localStorage.setItem('theme', newTheme);
    } else {
      localStorage.removeItem('theme');
    }
  };
  
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
