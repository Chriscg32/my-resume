
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'colorBlind';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Only run this code on client-side
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      // Check if user previously set a theme
      if (savedTheme && ['light', 'dark', 'colorBlind'].includes(savedTheme)) {
        return savedTheme as Theme;
      }
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      
      // Check if user has color blind preference (theoretical - browsers don't expose this)
      if (window.matchMedia && window.matchMedia('(prefers-contrast: more)').matches) {
        return 'colorBlind';
      }
    }
    return 'light';
  });

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply theme to document
    const root = window.document.documentElement;
    root.classList.remove('light-theme', 'dark-theme', 'colorblind-theme');
    root.classList.add(`${theme}-theme`);
    
    // Also set data-theme attribute for components that use it
    root.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      if (theme === 'dark') {
        metaThemeColor.setAttribute('content', '#0f172a'); // slate-900
      } else if (theme === 'colorBlind') {
        metaThemeColor.setAttribute('content', '#1e40af'); // blue-800
      } else {
        metaThemeColor.setAttribute('content', '#ffffff'); // white
      }
    }
    
    // Add announcement for screen readers when theme changes
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = `Theme changed to ${theme} mode.`;
    document.body.appendChild(announcement);
    
    // Clean up announcement after it's been read
    return () => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    };
  }, [theme]);

  const value = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
