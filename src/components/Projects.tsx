
import React from 'react';
import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground">
            Here are some of my recent development projects. Each one presented unique challenges and opportunities to grow my skills.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
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
