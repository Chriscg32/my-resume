
import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { trackPageView } from "./utils/viewTracking";
import { ThemeProvider } from "./components/ThemeProvider";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Track page view on application load
    trackPageView();
    
    // Add default theme class to ensure styles are applied on initial load
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(`${savedTheme}-theme`);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Add meta theme-color for mobile browsers
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    
    // Set initial theme color based on saved theme
    if (savedTheme === 'dark') {
      metaThemeColor.setAttribute('content', '#0f172a');
    } else if (savedTheme === 'colorBlind') {
      metaThemeColor.setAttribute('content', '#1e40af');
    } else {
      metaThemeColor.setAttribute('content', '#ffffff');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
