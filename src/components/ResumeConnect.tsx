
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ResumeConnect: React.FC = () => {
  return (
    <section id="resume-connect" className="py-16 md:py-24 bg-gradient-to-r from-slate-900 to-purple-900/30">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Seamlessly <span className="gradient-text">Connected</span>
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              My professional journey extends beyond this portfolio. Discover my complete professional background, technical expertise, and career achievements through my comprehensive resume.
            </p>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">✓</span>
                <p className="text-white">9+ years of technical systems expertise</p>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">✓</span>
                <p className="text-white">Project Management certified (PMI)</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">✓</span>
                <p className="text-white">Self-driven AI automation exploration</p>
              </div>
            </div>
            <Button asChild size="lg" className="bg-white text-accent hover:bg-white/90">
              <a href="https://resume.butterflybluecreations.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Visit My Online Resume <ExternalLink size={18} />
              </a>
            </Button>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl rotate-3 hover:rotate-0 transition-transform duration-300">
              <img 
                src="/lovable-uploads/fc437bb6-de8c-484e-947e-1aed7bf61f5d.png"
                alt="Resume QR Code" 
                className="w-64 h-64 object-contain"
              />
              <p className="text-center mt-4 text-gray-700 font-medium">Scan to view my resume</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeConnect;
