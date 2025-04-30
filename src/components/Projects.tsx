
import React, { useState } from 'react';
import { projects, ProjectType } from '@/data/projects';
import ProjectCard from './ProjectCard';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <p className="text-white/70">
            A showcase of my journey into AI automation and development - exploring tools, platforms, and concepts through practical applications.
          </p>
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
