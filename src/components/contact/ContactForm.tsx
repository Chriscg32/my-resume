
import React, { useState, useRef } from 'react';
import { Send, BuildingIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface CompanyInfo {
  domain: string;
  name?: string;
  industry?: string;
  confidence: number;
}

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<CompanyInfo | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const detectCompanyInfo = (email: string): CompanyInfo | null => {
    if (!email || !email.includes('@') || email.includes('@gmail.com') || 
        email.includes('@hotmail.com') || email.includes('@yahoo.com') ||
        email.includes('@outlook.com')) {
      return null;
    }
    
    const domain = email.split('@')[1];
    // Basic company detection
    return {
      domain: domain,
      name: domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1),
      confidence: 0.7
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Company domain detection for admin purposes
    if (name === 'email') {
      const detected = detectCompanyInfo(value);
      setCompanyDetails(detected);
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
      
      // For admin: Log the message with company details to console
      console.log('[ADMIN] New contact message with company details:', companyDetails);
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

  return (
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
          <div className="flex flex-col gap-1 text-xs p-2 bg-accent/5 rounded border border-accent/10">
            <div className="flex items-center">
              <BuildingIcon size={12} className="text-accent mr-1" />
              <span className="font-medium">Company detected</span>
              <Badge variant="outline" className="ml-auto text-[10px] bg-accent/10">
                Admin Only
              </Badge>
            </div>
            <div className="text-accent italic">
              Domain: {companyDetails.domain}
              {companyDetails.name && <span> • Possible name: {companyDetails.name}</span>}
            </div>
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
  );
};

export default ContactForm;
