
import React from 'react';
import { VolumeX, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SpeechControlsProps {
  speaking: boolean;
  rate: number;
  setRate: (rate: number) => void;
  pitch: number;
  setPitch: (pitch: number) => void;
  speak: (text: string, rate?: number, pitch?: number) => void;
  stop: () => void;
  voices: SpeechSynthesisVoice[];
  currentVoice: SpeechSynthesisVoice | null;
  changeVoice: (voice: SpeechSynthesisVoice) => void;
}

const SpeechControls: React.FC<SpeechControlsProps> = ({
  speaking,
  rate,
  setRate,
  pitch,
  setPitch,
  speak,
  stop,
  voices,
  currentVoice,
  changeVoice
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Accessibility Controls</h3>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => speaking ? stop() : speak("Text to Speech is now active. Use voice commands or tap buttons to navigate.")}
          aria-label={speaking ? "Stop speaking" : "Start speaking"}
        >
          {speaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </div>

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

      {voices.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Voice Selection:</Label>
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
      )}
    </div>
  );
};

export default SpeechControls;
