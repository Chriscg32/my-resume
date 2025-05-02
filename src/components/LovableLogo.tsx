
import React from 'react';
import { useTheme } from './ThemeProvider';

const LovableLogo: React.FC = () => {
  const { theme } = useTheme();
  
  // Define theme-specific colors
  const primaryColor = theme === 'dark' ? '#9b87f5' : (theme === 'colorBlind' ? '#1e40af' : '#7c3aed');
  const secondaryColor = theme === 'dark' ? '#6d28d9' : (theme === 'colorBlind' ? '#2563eb' : '#8b5cf6');
  const accentColor = theme === 'dark' ? '#e9d5ff' : (theme === 'colorBlind' ? '#93c5fd' : '#d8b4fe');
  const textColor = theme === 'dark' ? '#f9fafb' : (theme === 'colorBlind' ? '#f8fafc' : '#1e293b');
  
  return (
    <div className="w-full h-full min-h-[150px] bg-black flex items-center justify-center overflow-hidden p-4">
      <svg 
        viewBox="0 0 400 150" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-labelledby="lovableLogoTitle lovableLogoDesc"
        role="img"
      >
        <title id="lovableLogoTitle">Lovable AI Logo</title>
        <desc id="lovableLogoDesc">A stylized logo for Lovable AI featuring a heart shape and AI elements</desc>
        
        {/* Background radial gradient */}
        <defs>
          <radialGradient id="bgGradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Background circle */}
        <circle cx="200" cy="75" r="130" fill="url(#bgGradient)" />
        
        {/* Heart shape */}
        <path 
          d="M200 110 Q160 80 160 50 Q160 20 190 20 Q215 20 200 50 Q185 20 210 20 Q240 20 240 50 Q240 80 200 110" 
          fill={primaryColor}
          stroke={secondaryColor}
          strokeWidth="2"
          className="animate-pulse"
          style={{animationDuration: '3s'}}
        />
        
        {/* AI circuit lines */}
        <g stroke={accentColor} strokeWidth="1.5">
          <path d="M120 75 L160 75" className="animate-pulse" style={{animationDuration: '2s', animationDelay: '0.5s'}} />
          <path d="M240 75 L280 75" className="animate-pulse" style={{animationDuration: '2s', animationDelay: '0.7s'}} />
          <path d="M200 110 L200 130" className="animate-pulse" style={{animationDuration: '2s', animationDelay: '0.3s'}} />
          <path d="M180 50 L140 30" className="animate-pulse" style={{animationDuration: '2s', animationDelay: '0.9s'}} />
          <path d="M220 50 L260 30" className="animate-pulse" style={{animationDuration: '2s', animationDelay: '0.1s'}} />
        </g>
        
        {/* Digital nodes */}
        <circle cx="160" cy="75" r="3" fill={accentColor} />
        <circle cx="240" cy="75" r="3" fill={accentColor} />
        <circle cx="200" cy="110" r="3" fill={accentColor} />
        <circle cx="180" cy="50" r="3" fill={accentColor} />
        <circle cx="220" cy="50" r="3" fill={accentColor} />
        
        {/* Text */}
        <text 
          x="200" 
          y="130" 
          textAnchor="middle" 
          fill={textColor} 
          fontFamily="sans-serif" 
          fontWeight="bold" 
          fontSize="18"
          className="select-none"
        >
          LOVABLE AI
        </text>
      </svg>
    </div>
  );
};

export default LovableLogo;
