
import React from 'react';
import { Mail, Phone, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ContactInfoProps {
  downloadResume: () => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ downloadResume }) => {
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
    <div className="bg-card p-6 rounded-lg shadow-md animate-slide-up">
      <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="text-accent" />
          <a href="mailto:chrisgates32@gmail.com" className="hover:text-accent transition-colors">chrisgates32@gmail.com</a>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="text-accent" />
          <a href="tel:+27617594520" className="hover:text-accent transition-colors">+27 61 759 4520</a>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-slate-200/20">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={handleResumeDownload}
          >
            <FileText size={16} />
            Download Resume
          </Button>
          
          <Button 
            variant="secondary" 
            className="flex items-center gap-2"
            onClick={() => window.open('https://drive.google.com/file/d/1_FtpB3QzzpJC-jZACdLnzNGpUyWVxtxh/view?usp=sharing', '_blank')}
          >
            <ExternalLink size={16} />
            Visit Website
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
