
import { useState, useEffect, useCallback } from 'react';

export function useTextToSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Check if the browser supports speech synthesis
  useEffect(() => {
    const speechSynthesis = window.speechSynthesis;
    const supported = 'speechSynthesis' in window && speechSynthesis !== undefined;
    setSupported(supported);

    if (supported) {
      // Load available voices
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        // Try to set an English voice as the default
        const englishVoice = availableVoices.find(
          (voice) => voice.lang.includes('en') && !voice.name.includes('Google')
        );
        
        // If no English voice, use the first available voice
        setCurrentVoice(englishVoice || (availableVoices.length > 0 ? availableVoices[0] : null));
      };

      // Chrome loads voices asynchronously
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
      
      loadVoices();

      // Clean up
      return () => {
        if (speaking) {
          speechSynthesis.cancel();
        }
      };
    }
  }, [speaking]);

  // Speak text function
  const speak = useCallback((text: string, rate = 1, pitch = 1) => {
    if (!supported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (currentVoice) {
      utterance.voice = currentVoice;
    }
    
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 1;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [supported, currentVoice]);

  // Stop speaking function
  const stop = useCallback(() => {
    if (supported) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [supported]);

  // Change voice function
  const changeVoice = useCallback((voice: SpeechSynthesisVoice) => {
    setCurrentVoice(voice);
  }, []);

  return {
    speak,
    stop,
    speaking,
    supported,
    voices,
    currentVoice,
    changeVoice
  };
}
