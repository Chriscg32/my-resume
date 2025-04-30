
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import ContactInfo from './contact/ContactInfo';
import ContactQRCode from './contact/ContactQRCode';
import ContactForm from './contact/ContactForm';

const Contact: React.FC = () => {
  const { toast } = useToast();
  
  const downloadResume = () => {
    toast({
      title: "Resume downloaded",
      description: "Thank you for your interest in my resume!",
    });
    // In a real scenario, this would trigger a download
    window.open('/Chris-Gates-CV.pdf', '_blank');
  };

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground">
            Interested in working together or have a question? Send me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="flex flex-col">
            <ContactInfo downloadResume={downloadResume} />
            <ContactQRCode />
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
