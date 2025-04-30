import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, Send, Download, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Simple company domain detection for admin purposes
    if (name === 'email' && value.includes('@') && !value.includes('@gmail.com') && 
        !value.includes('@hotmail.com') && !value.includes('@yahoo.com')) {
      const domain = value.split('@')[1];
      try {
        setCompanyDetails(domain);
      } catch (error) {
        console.error('Error detecting company:', error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Store the message in localStorage for demo purposes
    try {
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      messages.push({
        ...formData,
        id: Date.now(),
        date: new Date().toISOString(),
        companyDetails: companyDetails
      });
      localStorage.setItem('contactMessages', JSON.stringify(messages));
    } catch (error) {
      console.error('Error storing message:', error);
    }
    
    // Simulate form submission with delay
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '', company: '' });
      setCompanyDetails(null);
      setIsSubmitting(false);
      
      // Reset form
      if (formRef.current) {
        formRef.current.reset();
      }
    }, 1500);
  };

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
            
            <div className="mt-8">
              <h4 className="font-medium mb-3">Connect with me:</h4>
              <div className="flex gap-4">
                <a href="https://github.com/chrisgates32" className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://resume.butterflybluecreations.com" className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/chris-gates-dev/" className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-200/20">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2" 
                  onClick={downloadResume}
                >
                  <FileText size={16} />
                  Download Resume
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="flex items-center gap-2"
                  onClick={() => window.open('https://resume.butterflybluecreations.com', '_blank')}
                >
                  <ExternalLink size={16} />
                  Visit Website
                </Button>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="bg-white p-3 rounded-lg rotate-3 shadow-lg hover:rotate-0 transition-all duration-300">
                <img 
                  src="/qr-code.png" 
                  alt="QR Code to resume website" 
                  className="w-[120px] h-[120px] object-contain"
                />
                <div className="text-black text-xs font-medium mt-2 text-center">
                  Scan to visit
                </div>
              </div>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="bg-card p-6 rounded-lg shadow-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-semibold mb-4">Send Me a Message</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1">Company (optional)</label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message"
                  className="min-h-[120px]"
                />
              </div>
              {companyDetails && (
                <div className="text-xs text-accent italic p-2 bg-accent/5 rounded border border-accent/10">
                  Company domain detected: {companyDetails} (only visible to you)
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full bg-accent hover:bg-accent/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
