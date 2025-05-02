
import React, { useState, useEffect } from 'react';
import { useTextToSpeech } from '@/hooks/use-text-to-speech';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Accessibility,
  VolumeX, 
  Volume2
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useTheme } from './ThemeProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import VoiceCommandManager from './accessibility/VoiceCommandManager';
import SpeechControls from './accessibility/SpeechControls';
import AccessibilityNavigation from './accessibility/AccessibilityNavigation';
import AccessibilityShortcuts from './accessibility/AccessibilityShortcuts';

const AccessibilityMenu: React.FC = () => {
  const { speak, stop, speaking, supported, voices, currentVoice, changeVoice } = useTextToSpeech();
  const [open, setOpen] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { theme, colorBlindType } = useTheme();
  const isMobile = useIsMobile();
  
  // Get navigation links (same as in the Header component)
  const navLinks = [
    { name: "About", href: "#resume-connect" },
    { name: "Journey", href: "#journey" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ];

  // Process voice commands
  const processVoiceCommand = (command) => {
    // Navigation commands
    if (command.includes('go to') || command.includes('navigate to')) {
      for (const link of navLinks) {
        if (command.includes(link.name.toLowerCase())) {
          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
          speak(`Navigating to ${link.name} section`, rate, pitch);
          setOpen(false);
          return;
        }
      }
    }

    // Read page command
    if (command.includes('read page') || command.includes('read this page')) {
      const pageTitle = document.title;
      const mainContent = document.querySelector('main')?.textContent;
      const textToRead = `Page title: ${pageTitle}. ${mainContent?.substring(0, 200)}...`;
      speak(textToRead, rate, pitch);
      return;
    }

    // Help command
    if (command.includes('help') || command.includes('what can you do')) {
      speak("Available voice commands: Go to section name, Read page, Help", rate, pitch);
      return;
    }

    // Toggle color settings
    if (command.includes('color settings') || command.includes('accessibility settings')) {
      setAccessibilityOpen(true);
      speak("Opening color accessibility settings", rate, pitch);
      return;
    }

    // Stop speaking
    if (command.includes('stop speaking') || command.includes('be quiet')) {
      stop();
      speak("Stopped speaking", rate, pitch);
      return;
    }

    // Command not recognized
    speak("Sorry, I didn't understand that command. Try saying Help for assistance.", rate, pitch);
  };

  // Handle key presses for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle menu with Alt+A
      if (e.altKey && e.key === 'a') {
        setOpen(prevOpen => !prevOpen);
      }
      
      // Read the current page with Alt+R
      if (e.altKey && e.key === 'r') {
        const pageTitle = document.title;
        const mainContent = document.querySelector('main')?.textContent;
        const textToRead = `Page title: ${pageTitle}. ${mainContent?.substring(0, 200)}... Press Alt+N to hear navigation options.`;
        speak(textToRead, rate, pitch);
      }
      
      // Read navigation options with Alt+N
      if (e.altKey && e.key === 'n') {
        const navText = `Navigation menu: ${navLinks.map(link => link.name).join(', ')}. Press Alt plus the first letter of a section to navigate.`;
        speak(navText, rate, pitch);
      }
      
      // Navigate to sections with Alt+first letter
      if (e.altKey) {
        const link = navLinks.find(l => l.name.toLowerCase().startsWith(e.key.toLowerCase()));
        if (link) {
          e.preventDefault();
          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
          speak(`Navigating to ${link.name} section`, rate, pitch);
        }
      }

      // Toggle color accessibility settings with Alt+C
      if (e.altKey && e.key === 'c') {
        setAccessibilityOpen(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [speak, rate, pitch, navLinks]);

  // When the menu is opened, announce instructions for screen readers
  useEffect(() => {
    if (open) {
      const timeoutId = setTimeout(() => {
        const instructions = isMobile 
          ? "Voice commands are available. Tap the microphone button to start speaking."
          : "Keyboard shortcuts are available. Press Alt+R to read the page.";
        speak(instructions, rate, pitch);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [open, speak, rate, pitch, isMobile]);

  if (!supported) return null;

  // Determine button size based on device
  const buttonSize = isMobile ? "h-14 w-14" : "h-12 w-12";
  const iconSize = isMobile ? "h-7 w-7" : "h-6 w-6";

  return (
    <div className="fixed bottom-4 right-4 z-50" aria-label="Accessibility options">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className={`rounded-full ${buttonSize} bg-accent hover:bg-accent/80 text-white border-accent/50 shadow-lg`}
            aria-label="Accessibility Menu"
          >
            <Accessibility className={iconSize} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" side="top">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">Accessibility Controls</h3>
              <div className="flex gap-2">
                {isMobile && (
                  <VoiceCommandManager 
                    isListening={isListening}
                    setIsListening={setIsListening}
                    processVoiceCommand={processVoiceCommand}
                  />
                )}
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => speaking ? stop() : speak("Text to Speech is now active. Use voice commands or tap buttons to navigate.")}
                  aria-label={speaking ? "Stop speaking" : "Start speaking"}
                >
                  {speaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <SpeechControls 
              speaking={speaking}
              rate={rate}
              setRate={setRate}
              pitch={pitch}
              setPitch={setPitch}
              speak={speak}
              stop={stop}
              voices={voices}
              currentVoice={currentVoice}
              changeVoice={changeVoice}
            />
            
            <Separator />
            
            <AccessibilityShortcuts isMobile={isMobile} />
            
            <Separator />
            
            <AccessibilityNavigation 
              navLinks={navLinks}
              rate={rate}
              pitch={pitch}
              speak={speak}
              setOpen={setOpen}
              accessibilityOpen={accessibilityOpen}
              setAccessibilityOpen={setAccessibilityOpen}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AccessibilityMenu;
