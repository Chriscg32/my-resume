import React from 'react';
import { ArrowDown, FileText, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Hero: React.FC = () => {
  const { toast } = useToast();
  
  const handleResumeDownload = () => {
    // Using Google Drive URL for the resume
    const resumeUrl = "https://drive.google.com/file/d/1_FtpB3QzzpJC-jZACdLnzNGpUyWVxtxh/view?usp=sharing";
    
    // Open Google Drive link in a new tab
    window.open(resumeUrl, '_blank');
    
    toast({
      title: "Resume access initiated",
      description: "Your resume should open in a new tab. Thank you for your interest!",
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent"></div>
      
      <div className="container text-center px-4 animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent mb-6">
            <img 
              src="/lovable-uploads/82c7fa89-e4d0-4f42-b952-6efd4b6a2005.png" 
              alt="Chris Gates"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Chris <span className="gradient-text">Gates</span>
          </h1>
          <div className="inline-block bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <p className="text-lg md:text-xl text-white">
              Senior Technical Support | Security Systems Specialist
            </p>
            <p className="text-accent mt-1">AI Automation Enthusiast</p>
          </div>
        </div>
        
        <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-10">
          Bridging <span className="text-accent font-semibold">9+ years</span> of technical expertise with a passion for <span className="text-accent font-semibold">AI automation</span>. 
          Embarking on a journey to transform security systems with <span className="text-accent font-semibold">intelligent workflows</span>.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-lg group">
            <a href="#projects" className="flex items-center gap-2">
              <span>Explore My Work</span>
              <Rocket className="group-hover:translate-x-1 transition-transform" size={18} />
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-white border-white hover:bg-white/10 text-lg"
            onClick={handleResumeDownload}
          >
            <span className="flex items-center gap-2">
              <span>Download Resume</span>
              <FileText size={18} />
            </span>
          </Button>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <a href="https://drive.google.com/file/d/1_FtpB3QzzpJC-jZACdLnzNGpUyWVxtxh/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              View Online Resume
            </a>
          </Button>
        </div>
        
        <a 
          href="#resume-connect" 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-sm text-white hover:text-accent animate-bounce"
        >
          <span className="mb-2">Scroll Down</span>
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
