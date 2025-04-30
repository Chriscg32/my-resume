
import React from 'react';
import { Github, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <p className="text-xl font-semibold gradient-text mb-2">Chris Gates</p>
            <p className="text-sm opacity-70 max-w-md">
              Senior Technical Specialist transforming 9+ years of expertise into AI automation innovation.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://github.com/chrisgates32" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors"
              >
                <Github size={24} />
              </a>
              <a 
                href="mailto:chrisgates32@gmail.com" 
                className="text-white hover:text-accent transition-colors"
              >
                <Mail size={24} />
              </a>
              <a 
                href="https://resume.butterflybluecreations.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors"
              >
                <ExternalLink size={24} />
              </a>
            </div>
            <p className="text-sm opacity-70">&copy; {currentYear} Chris Gates. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
