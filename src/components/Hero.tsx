
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-30"></div>
      
      <div className="container text-center px-4 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Hi, I'm <span className="gradient-text">Alex Johnson</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Full Stack Developer specializing in building exceptional digital experiences that are fast, accessible, and visually appealing.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
            <a href="#projects">View My Work</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#contact">Get In Touch</a>
          </Button>
        </div>
        
        <a 
          href="#projects" 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-sm text-muted-foreground hover:text-accent animate-bounce"
        >
          <span className="mb-2">Scroll Down</span>
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
