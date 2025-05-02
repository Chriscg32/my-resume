
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'colorBlind';
type ColorBlindType = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia' | 'none';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colorBlindType: ColorBlindType;
  setColorBlindType: (type: ColorBlindType) => void;
  colorIntensity: number;
  setColorIntensity: (intensity: number) => void;
  brightness: number;
  setBrightness: (brightness: number) => void;
  contrast: number;
  setContrast: (contrast: number) => void;
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

  const [colorBlindType, setColorBlindType] = useState<ColorBlindType>(() => {
    if (typeof window !== 'undefined') {
      const savedType = localStorage.getItem('colorBlindType');
      if (savedType && ['protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia', 'none'].includes(savedType)) {
        return savedType as ColorBlindType;
      }
    }
    return 'none';
  });

  const [colorIntensity, setColorIntensity] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const savedIntensity = localStorage.getItem('colorIntensity');
      if (savedIntensity) {
        const parsed = parseFloat(savedIntensity);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
          return parsed;
        }
      }
    }
    return 50;
  });

  const [brightness, setBrightness] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const savedBrightness = localStorage.getItem('brightness');
      if (savedBrightness) {
        const parsed = parseFloat(savedBrightness);
        if (!isNaN(parsed) && parsed >= 50 && parsed <= 150) {
          return parsed;
        }
      }
    }
    return 100;
  });

  const [contrast, setContrast] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const savedContrast = localStorage.getItem('contrast');
      if (savedContrast) {
        const parsed = parseFloat(savedContrast);
        if (!isNaN(parsed) && parsed >= 50 && parsed <= 150) {
          return parsed;
        }
      }
    }
    return 100;
  });

  useEffect(() => {
    // Save theme settings to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('colorBlindType', colorBlindType);
    localStorage.setItem('colorIntensity', colorIntensity.toString());
    localStorage.setItem('brightness', brightness.toString());
    localStorage.setItem('contrast', contrast.toString());
    
    // Apply theme to document
    const root = window.document.documentElement;
    root.classList.remove('light-theme', 'dark-theme', 'colorblind-theme');
    root.classList.add(`${theme}-theme`);
    
    // Also set data-theme attribute for components that use it
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-colorblind', colorBlindType);
    
    // Apply CSS filters for accessibility
    const filterValues = [];
    
    // Apply brightness and contrast
    filterValues.push(`brightness(${brightness}%)`);
    filterValues.push(`contrast(${contrast}%)`);
    
    // Apply color blind filters with intensity
    if (colorBlindType !== 'none' && theme === 'colorBlind') {
      // Calculate the intensity as a percentage (0.0 to 1.0)
      const intensityValue = colorIntensity / 100;
      
      switch (colorBlindType) {
        case 'protanopia': // Red-blind
          filterValues.push(`url(#protanopia-filter-${Math.round(colorIntensity)})`);
          break;
        case 'deuteranopia': // Green-blind
          filterValues.push(`url(#deuteranopia-filter-${Math.round(colorIntensity)})`);
          break;
        case 'tritanopia': // Blue-blind
          filterValues.push(`url(#tritanopia-filter-${Math.round(colorIntensity)})`);
          break;
        case 'achromatopsia': // Total color blindness
          filterValues.push(`grayscale(${intensityValue})`);
          break;
      }
      
      // Create SVG filters if they don't exist
      if (!document.getElementById('color-blind-filters')) {
        const svgFilters = document.createElement('div');
        svgFilters.id = 'color-blind-filters';
        svgFilters.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
            <filter id="protanopia-filter-50">
              <feColorMatrix
                type="matrix"
                values="0.567, 0.433, 0,     0, 0
                        0.558, 0.442, 0,     0, 0
                        0,     0.242, 0.758, 0, 0
                        0,     0,     0,     1, 0"/>
            </filter>
            <filter id="protanopia-filter-100">
              <feColorMatrix
                type="matrix"
                values="0.152, 0.848, 0,     0, 0
                        0.114, 0.886, 0,     0, 0
                        0,     0.184, 0.816, 0, 0
                        0,     0,     0,     1, 0"/>
            </filter>
            <filter id="deuteranopia-filter-50">
              <feColorMatrix
                type="matrix"
                values="0.625, 0.375, 0,   0, 0
                        0.7,   0.3,   0,   0, 0
                        0,     0.3,   0.7, 0, 0
                        0,     0,     0,   1, 0"/>
            </filter>
            <filter id="deuteranopia-filter-100">
              <feColorMatrix
                type="matrix"
                values="0.29, 0.71, 0,     0, 0
                        0.4,  0.6,  0,     0, 0
                        0,    0.26, 0.74,  0, 0
                        0,    0,    0,     1, 0"/>
            </filter>
            <filter id="tritanopia-filter-50">
              <feColorMatrix
                type="matrix"
                values="0.95, 0.05,  0,     0, 0
                        0,    0.433, 0.567, 0, 0
                        0,    0.475, 0.525, 0, 0
                        0,    0,     0,     1, 0"/>
            </filter>
            <filter id="tritanopia-filter-100">
              <feColorMatrix
                type="matrix"
                values="0.95, 0.05,  0,     0, 0
                        0,    0.03, 0.97,   0, 0
                        0,    0.18, 0.82,   0, 0
                        0,    0,     0,     1, 0"/>
            </filter>
          </svg>
        `;
        document.body.appendChild(svgFilters);
      }
    }
    
    // Apply the filters to the html element
    if (filterValues.length > 0) {
      document.documentElement.style.filter = filterValues.join(' ');
    } else {
      document.documentElement.style.filter = 'none';
    }
    
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
  }, [theme, colorBlindType, colorIntensity, brightness, contrast]);

  const value = {
    theme,
    setTheme,
    colorBlindType,
    setColorBlindType,
    colorIntensity,
    setColorIntensity,
    brightness,
    setBrightness,
    contrast,
    setContrast,
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
