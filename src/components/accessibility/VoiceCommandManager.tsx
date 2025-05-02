
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceCommandManagerProps {
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
  processVoiceCommand: (command: string) => void;
}

const VoiceCommandManager: React.FC<VoiceCommandManagerProps> = ({
  isListening,
  setIsListening,
  processVoiceCommand
}) => {
  const { toast } = useToast();

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
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognitionAPI();
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

  return (
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
  );
};

export default VoiceCommandManager;
