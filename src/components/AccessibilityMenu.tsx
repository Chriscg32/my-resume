
import React, { useState, useEffect } from 'react';
import { useTextToSpeech } from '@/hooks/use-text-to-speech';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Volume2, 
  VolumeX, 
  Accessibility,
  ArrowRight,
  Settings,
  Mic,
  MicOff
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ColorAccessibilityPanel from './ColorAccessibilityPanel';
import { useTheme } from './ThemeProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

const AccessibilityMenu: React.FC = () => {
  const { speak, stop, speaking, supported, voices, currentVoice, changeVoice } = useTextToSpeech();
  const [open, setOpen] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { theme, colorBlindType } = useTheme();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Get navigation links (same as in the Header component)
  const navLinks = [
    { name: "About", href: "#resume-connect" },
    { name: "Journey", href: "#journey" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ];

  // Voice recognition for touch devices
  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition. Please try using Chrome or Edge.",
        variant: "destructive"
      });
      return;
    }

    setIsListening(true);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      toast({
        title: "Listening...",
        description: "Try commands like 'go to projects', 'read page', or 'help'",
      });
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      processVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      toast({
        title: "Voice Recognition Error",
        description: `Error: ${event.error}. Try again.`,
        variant: "destructive"
      });
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

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
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={startVoiceRecognition}
                    aria-label={isListening ? "Listening for voice commands" : "Start voice command"}
                    disabled={isListening}
                    className={isListening ? "text-accent animate-pulse" : ""}
                  >
                    {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  </Button>
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
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Speech Rate</span>
                  <span className="text-sm">{rate.toFixed(1)}x</span>
                </div>
                <Slider 
                  value={[rate]} 
                  min={0.5} 
                  max={2} 
                  step={0.1}
                  onValueChange={(value) => setRate(value[0])}
                  aria-label="Adjust speech rate"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Speech Pitch</span>
                  <span className="text-sm">{pitch.toFixed(1)}</span>
                </div>
                <Slider 
                  value={[pitch]} 
                  min={0.5} 
                  max={2} 
                  step={0.1}
                  onValueChange={(value) => setPitch(value[0])}
                  aria-label="Adjust speech pitch"
                />
              </div>
            </div>

            <Separator />
            
            {!isMobile && (
              <>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Keyboard Shortcuts:</h4>
                  <ul className="text-sm space-y-1">
                    <li>Alt+A: Toggle accessibility menu</li>
                    <li>Alt+R: Read current page</li>
                    <li>Alt+N: Navigation options</li>
                    <li>Alt+C: Color settings</li>
                    <li>Alt+[First letter]: Jump to section</li>
                  </ul>
                </div>
                <Separator />
              </>
            )}
            
            {isMobile && (
              <>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Voice Commands:</h4>
                  <ul className="text-sm space-y-1">
                    <li>"Go to [Section Name]": Navigate to section</li>
                    <li>"Read page": Read current page content</li>
                    <li>"Help": List available commands</li>
                    <li>"Color settings": Open accessibility settings</li>
                    <li>"Stop speaking": Stop text-to-speech</li>
                  </ul>
                </div>
                <Separator />
              </>
            )}
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Navigation:</h4>
                <Dialog open={accessibilityOpen} onOpenChange={setAccessibilityOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex gap-1">
                      <Settings size={14} />
                      <span className="sr-only md:not-sr-only">Color Settings</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md p-0">
                    <ColorAccessibilityPanel />
                  </DialogContent>
                </Dialog>
              </div>
              <ScrollArea className="h-[100px] rounded-md border p-2">
                {navLinks.map((link, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    className="w-full justify-between mb-1"
                    onClick={() => {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                      speak(`Navigating to ${link.name} section`, rate, pitch);
                      setOpen(false);
                    }}
                  >
                    {link.name}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ))}
              </ScrollArea>
            </div>

            {voices.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Voice Selection:</h4>
                  <ScrollArea className="h-[100px] rounded-md border p-2">
                    {voices.map((voice, index) => (
                      <Button 
                        key={index} 
                        variant={currentVoice?.name === voice.name ? "secondary" : "ghost"} 
                        className="w-full justify-between mb-1 text-xs"
                        onClick={() => {
                          changeVoice(voice);
                          speak(`Voice changed to ${voice.name}`, rate, pitch);
                        }}
                      >
                        <div className="text-left">
                          <span>{voice.name}</span>
                          <span className="block text-xs opacity-70">{voice.lang}</span>
                        </div>
                      </Button>
                    ))}
                  </ScrollArea>
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AccessibilityMenu;
