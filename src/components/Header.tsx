
import React, { useState, useEffect } from 'react';
import { Menu, X, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ThemeSwitcher from './ThemeSwitcher';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ColorAccessibilityPanel from './ColorAccessibilityPanel';
import { useTheme } from './ThemeProvider';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const { colorBlindType } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure the journey link works correctly
  const handleJourneyClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close mobile menu if open
    }
  };

  const navLinks = [
    { name: "About", href: "#resume-connect" },
    { name: "Journey", href: "#journey" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header className={cn(
      "fixed w-full top-0 left-0 z-50 transition-all duration-300",
      scrolled ? "bg-slate-900/90 shadow-md shadow-accent/5 backdrop-blur-sm dark-theme:bg-background/90 colorblind-theme:bg-gray-900/90" : "bg-transparent"
    )}>
      <div className="container flex justify-between items-center py-4">
        <a href="#" className="text-2xl font-bold text-white">
          Chris<span className="text-accent">Gates</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleJourneyClick(e, link.href)}
              className="text-white hover:text-accent transition-colors duration-200 text-sm font-medium"
            >
              {link.name}
            </a>
          ))}

          <Dialog open={accessibilityOpen} onOpenChange={setAccessibilityOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="border-accent/50 text-accent hover:bg-accent/10 ml-1"
                aria-label="Color accessibility settings"
              >
                <Eye size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md p-0">
              <ColorAccessibilityPanel />
            </DialogContent>
          </Dialog>

          <ThemeSwitcher />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Dialog open={accessibilityOpen} onOpenChange={setAccessibilityOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="border-accent/50 text-white hover:bg-accent/10"
                aria-label="Color accessibility settings"
              >
                <Eye size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md p-0">
              <ColorAccessibilityPanel />
            </DialogContent>
          </Dialog>
          <ThemeSwitcher />
          <button
            className="p-2 focus:outline-none text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden py-4 px-6 bg-slate-900 shadow-md animate-fade-in dark-theme:bg-background colorblind-theme:bg-gray-900">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleJourneyClick(e, link.href)}
              className="block py-3 text-white hover:text-accent transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
