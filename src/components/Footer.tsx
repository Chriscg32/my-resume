
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">DevPortfolio</p>
            <p className="text-sm opacity-70">Building the web, one project at a time</p>
          </div>
          
          <div>
            <p className="text-sm opacity-70">&copy; {currentYear} Alex Johnson. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
