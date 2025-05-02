
import React from 'react';
import { Settings, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ColorAccessibilityPanel from './ColorAccessibilityPanel';
import { useTheme } from './ThemeProvider';
import { useIsMobile } from '@/hooks/use-mobile';

const AccessibilityMenu: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { colorBlindType } = useTheme();
  const isMobile = useIsMobile();
  
  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 flex flex-col items-end gap-3">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            className={cn(
              "rounded-full shadow-lg flex items-center justify-center", 
              "transition-all duration-300 hover:scale-105",
              isMobile ? "h-10 w-10" : "h-12 w-12",
              "bg-accent hover:bg-accent/80 text-white border-accent/50"
            )} 
            aria-label="Accessibility Settings"
          >
            <Eye size={isMobile ? 18 : 22} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md p-0">
          <ColorAccessibilityPanel />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccessibilityMenu;
