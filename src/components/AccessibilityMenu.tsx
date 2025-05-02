
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
  ArrowRight
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const AccessibilityMenu: React.FC = () => {
  const { speak, stop, speaking, supported, voices, currentVoice, changeVoice } = useTextToSpeech();
  const [open, setOpen] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  
  // Get navigation links (same as in the Header component)
  const navLinks = [
    { name: "About", href: "#resume-connect" },
    { name: "Journey", href: "#journey" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ];

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
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [speak, rate, pitch, navLinks]);

  if (!supported) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50" aria-label="Accessibility options">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-12 w-12 bg-accent hover:bg-accent/80 text-white border-accent/50 shadow-lg"
            aria-label="Accessibility Menu"
          >
            <Accessibility className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" side="top">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">Accessibility Controls</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => speaking ? stop() : speak("Text to Speech is now active. Press Alt+A to toggle this menu. Press Alt+R to read the current page. Press Alt+N for navigation options.")}
                aria-label={speaking ? "Stop speaking" : "Start speaking"}
              >
                {speaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
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
                />
              </div>
            </div>

            <Separator />
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Keyboard Shortcuts:</h4>
              <ul className="text-sm space-y-1">
                <li>Alt+A: Toggle accessibility menu</li>
                <li>Alt+R: Read current page</li>
                <li>Alt+N: Navigation options</li>
                <li>Alt+[First letter]: Jump to section</li>
              </ul>
            </div>

            <Separator />
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Navigation:</h4>
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
