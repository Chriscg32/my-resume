
import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { type Project } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <div 
      className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden h-48 md:h-64">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <Button asChild size="sm" variant="default">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <ExternalLink size={16} /> Live Demo
            </a>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <Github size={16} /> Code
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
