
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AIJourney from '@/components/AIJourney';
import ResumeConnect from '@/components/ResumeConnect';
import GitHubActivity from '@/components/GitHubActivity';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Header />
      <main>
        <Hero />
        <ResumeConnect />
        <AIJourney />
        <GitHubActivity />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
