
import React from 'react';
import { Github, Mail, ExternalLink, Database, Accessibility } from 'lucide-react';
import ViewCounter from './ViewCounter';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-12 w-12 border-2 border-accent">
                <AvatarImage src="/lovable-uploads/fc437bb6-de8c-484e-947e-1aed7bf61f5d.png" alt="Chris Gates" />
                <AvatarFallback>CG</AvatarFallback>
              </Avatar>
              <p className="text-xl font-semibold gradient-text">Chris Gates</p>
            </div>
            <p className="text-sm opacity-70 max-w-md">
              Senior Technical Specialist transforming 9+ years of expertise into AI automation innovation.
            </p>
            <div className="mt-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-accent hover:bg-accent/10 px-2 py-1 h-auto text-xs flex items-center gap-1"
                    onClick={() => {
                      // Trigger the accessibility intro
                      const event = new KeyboardEvent('keydown', { 
                        key: 'a', 
                        altKey: true,
                        bubbles: true
                      });
                      document.dispatchEvent(event);
                    }}
                  >
                    <Accessibility size={14} />
                    <span>Accessibility Mode (Alt+A)</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Press Alt+A to activate accessibility features</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="bg-slate-800 p-2 px-4 rounded-full mb-4 shadow-lg border border-slate-700">
              <ViewCounter />
            </div>
            <div className="flex space-x-4 mt-2 mb-4">
              <a 
                href="https://github.com/chrisgates32" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={24} />
              </a>
              <a 
                href="mailto:chrisgates32@gmail.com" 
                className="text-white hover:text-accent transition-colors"
                aria-label="Send Email"
              >
                <Mail size={24} />
              </a>
              <a 
                href="https://resume.butterflybluecreations.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors"
                aria-label="Resume Website"
              >
                <ExternalLink size={24} />
              </a>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white opacity-0 w-0 h-0 p-0 hover:bg-transparent"
                onClick={() => {
                  // Hidden admin functionality
                  const adminView = document.querySelector('[data-admin-toggle]');
                  if (adminView) {
                    (adminView as HTMLElement).click();
                  }
                }}
              >
                <Database className="w-0 h-0" />
              </Button>
            </div>
            <p className="text-sm opacity-70">&copy; {currentYear} Chris Gates. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
