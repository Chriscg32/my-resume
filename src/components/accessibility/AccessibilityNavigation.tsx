
import React from 'react';
import { ArrowRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ColorAccessibilityPanel from '../ColorAccessibilityPanel';

interface AccessibilityNavigationProps {
  navLinks: { name: string; href: string }[];
  rate: number;
  pitch: number;
  speak: (text: string, rate?: number, pitch?: number) => void;
  setOpen: (value: boolean) => void;
  accessibilityOpen: boolean;
  setAccessibilityOpen: (value: boolean) => void;
}

const AccessibilityNavigation: React.FC<AccessibilityNavigationProps> = ({
  navLinks,
  rate,
  pitch,
  speak,
  setOpen,
  accessibilityOpen,
  setAccessibilityOpen
}) => {
  return (
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
  );
};

export default AccessibilityNavigation;
