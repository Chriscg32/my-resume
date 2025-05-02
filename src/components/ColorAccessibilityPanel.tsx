
import React from 'react';
import { useTheme } from './ThemeProvider';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EyeOff, Sun, Moon, Contrast } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ColorBlindTypeOption {
  value: 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia' | 'none';
  label: string;
  description: string;
  icon: React.ReactNode;
}

const colorBlindTypes: ColorBlindTypeOption[] = [
  { 
    value: 'none', 
    label: 'No Color Blindness', 
    description: 'Standard vision with no color adjustments',
    icon: <EyeOff className="h-4 w-4" />
  },
  { 
    value: 'protanopia', 
    label: 'Protanopia', 
    description: 'Red-blind (difficulty distinguishing red from green and blue)',
    icon: <Contrast className="h-4 w-4 text-red-500" /> 
  },
  { 
    value: 'deuteranopia', 
    label: 'Deuteranopia', 
    description: 'Green-blind (difficulty distinguishing green from red and blue)',
    icon: <Contrast className="h-4 w-4 text-green-500" />
  },
  { 
    value: 'tritanopia', 
    label: 'Tritanopia', 
    description: 'Blue-blind (difficulty distinguishing blue from green and seeing yellow)',
    icon: <Contrast className="h-4 w-4 text-blue-500" />
  },
  { 
    value: 'achromatopsia', 
    label: 'Achromatopsia', 
    description: 'Complete color blindness (seeing only in shades of gray)',
    icon: <Contrast className="h-4 w-4 text-gray-500" />
  }
];

const ColorAccessibilityPanel: React.FC = () => {
  const { 
    theme, 
    colorBlindType, 
    setColorBlindType, 
    colorIntensity, 
    setColorIntensity,
    brightness,
    setBrightness,
    contrast,
    setContrast,
  } = useTheme();
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Accessibility Settings</CardTitle>
        <CardDescription>Customize color and contrast settings for better visibility</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue={theme === 'colorBlind' ? 'colorblind' : 'display'}>
          <TabsList className="w-full">
            <TabsTrigger value="display" className="flex-1">Display</TabsTrigger>
            <TabsTrigger value="colorblind" className="flex-1">Color Blindness</TabsTrigger>
          </TabsList>
          
          {/* Display settings tab */}
          <TabsContent value="display" className="space-y-4 pt-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="brightness">Brightness</Label>
                <span className="text-xs text-muted-foreground">{brightness}%</span>
              </div>
              <Slider
                id="brightness"
                min={50}
                max={150}
                step={5}
                value={[brightness]}
                onValueChange={(value) => setBrightness(value[0])}
                className="py-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="contrast">Contrast</Label>
                <span className="text-xs text-muted-foreground">{contrast}%</span>
              </div>
              <Slider
                id="contrast"
                min={50}
                max={150}
                step={5}
                value={[contrast]}
                onValueChange={(value) => setContrast(value[0])}
                className="py-2"
              />
            </div>
            
            <div className="py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon size={16} className="text-slate-400" />
                <Label>Reduced Motion</Label>
              </div>
              <Switch 
                id="reduced-motion" 
                onCheckedChange={(checked) => {
                  document.documentElement.classList.toggle('reduce-motion', checked);
                }}
              />
            </div>
          </TabsContent>
          
          {/* Color blindness tab */}
          <TabsContent value="colorblind" className="space-y-4 pt-3">
            <div className="space-y-2">
              <Label htmlFor="color-blind-type">Color Blindness Type</Label>
              <ScrollArea className="h-[180px] rounded border">
                <div className="p-4 space-y-2">
                  {colorBlindTypes.map((type) => (
                    <div 
                      key={type.value}
                      className={`cursor-pointer flex items-start p-2 rounded-md ${
                        colorBlindType === type.value ? 
                        'bg-accent text-accent-foreground' : 
                        'hover:bg-muted'
                      }`}
                      onClick={() => setColorBlindType(type.value)}
                    >
                      <div className="mr-2 mt-0.5">{type.icon}</div>
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {type.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            {colorBlindType !== 'none' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="color-intensity">Filter Intensity</Label>
                  <span className="text-xs text-muted-foreground">{colorIntensity}%</span>
                </div>
                <Slider
                  id="color-intensity"
                  min={0}
                  max={100}
                  step={5}
                  value={[colorIntensity]}
                  onValueChange={(value) => setColorIntensity(value[0])}
                  className="py-2"
                />
              </div>
            )}
            
            <Separator className="my-2" />
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="color-test">Color Test</Label>
              <div className="flex space-x-1">
                <div className="w-6 h-6 rounded-full bg-red-500 border border-muted"></div>
                <div className="w-6 h-6 rounded-full bg-green-500 border border-muted"></div>
                <div className="w-6 h-6 rounded-full bg-blue-500 border border-muted"></div>
                <div className="w-6 h-6 rounded-full bg-yellow-500 border border-muted"></div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ColorAccessibilityPanel;
