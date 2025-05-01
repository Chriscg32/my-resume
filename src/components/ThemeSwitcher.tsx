
import React from 'react';
import { useTheme } from './ThemeProvider';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Eye } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full dark-theme:bg-transparent dark-theme:border-white/20 light-theme:bg-white light-theme:border-gray-200 colorblind-theme:bg-white colorblind-theme:border-blue-700"
          aria-label="Toggle theme"
        >
          {theme === 'light' && <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500" />}
          {theme === 'dark' && <Moon className="h-[1.2rem] w-[1.2rem] text-slate-200" />}
          {theme === 'colorBlind' && <Eye className="h-[1.2rem] w-[1.2rem] text-blue-700" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')} className="flex items-center gap-2 cursor-pointer">
          <Sun className="h-4 w-4 text-yellow-500" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className="flex items-center gap-2 cursor-pointer">
          <Moon className="h-4 w-4 text-slate-500" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('colorBlind')} className="flex items-center gap-2 cursor-pointer">
          <Eye className="h-4 w-4 text-blue-700" />
          <span>Color Blind (High Contrast)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
