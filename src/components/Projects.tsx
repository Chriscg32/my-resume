
import React, { useState } from 'react';
import { projects, ProjectType } from '@/data/projects';
import ProjectCard from './ProjectCard';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectType | 'all'>('all');
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.type === activeCategory);

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iIzIxMjEyMSIgZmlsbC1vcGFjaXR5PSIwLjMiPgogICAgICAgICAgICA8cGF0aCBkPSJNMzAgMzBhMSAxIDAgMSAxIDAtMiAxIDEgMCAwIDEgMCAyWiIgLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==')] opacity-10 z-0"></div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">My <span className="gradient-text">Projects</span></h2>
          <p className="text-white/70 mb-6">
            A showcase of my work built with Lovable and GitHub - demonstrating my exploration of AI automation, development tools, and practical applications.
          </p>
          
          <Card className="bg-slate-800/40 border-slate-700 backdrop-blur-sm p-4 mb-8">
            <CardContent className="p-2">
              <div className="flex flex-col md:flex-row items-center gap-4 text-left">
                <div className="rounded-lg overflow-hidden border border-purple-500/30 w-full md:w-1/3">
                  <img 
                    src="/lovable-uploads/lovable-editor.png" 
                    alt="Lovable AI Editor" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Built with <span className="gradient-text">Lovable AI</span></h3>
                  <p className="text-white/70 text-sm mb-4">
                    Many of these projects were built using Lovable's AI editor - a revolutionary platform for creating web applications through natural language. 
                    The projects marked with "Lovable" showcase what's possible with AI assistance.
                  </p>
                  <Button asChild size="sm" variant="secondary">
                    <a href="https://lovable.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <span>Learn about Lovable</span>
                      <ExternalLink size={14} />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-slate-800/60 border border-slate-700">
            <TabsTrigger value="all" onClick={() => setActiveCategory('all')}>All</TabsTrigger>
            <TabsTrigger value="lovable" onClick={() => setActiveCategory('lovable')}>Lovable</TabsTrigger>
            <TabsTrigger value="github" onClick={() => setActiveCategory('github')}>GitHub</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
