
import React from 'react';
import { ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ResumeConnect: React.FC = () => {
  const { toast } = useToast();
  
  const handleResumeDownload = () => {
    // Using the correct file path
    const resumeUrl = "/lovable-uploads/Chris-Gates-CV.pdf";
    
    // Create an anchor element and trigger download
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = "Chris-Gates-CV.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Resume download initiated",
      description: "Your download should begin shortly. Thank you for your interest!",
    });
  };

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
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-accent hover:bg-white/90" onClick={handleResumeDownload}>
                <span className="flex items-center gap-2">Download My Resume <FileText size={18} /></span>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <a href="/lovable-uploads/Chris-Gates-CV.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  View Online <ExternalLink size={18} />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl rotate-3 hover:rotate-0 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded">PDF</div>
              <img 
                src="/lovable-uploads/86657619-8eb4-4532-b945-5e7e99fbcf25.png"
                alt="Resume Preview" 
                className="w-64 h-auto object-cover rounded border border-gray-200"
              />
              <div className="mt-3 text-center">
                <p className="text-gray-700 font-medium">Chris Gates</p>
                <p className="text-gray-500 text-sm">Developer & Automation Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeConnect;
