
import React from 'react';
import { Github, ExternalLink, Star } from 'lucide-react';
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
      className="group bg-slate-800/60 rounded-lg overflow-hidden shadow-xl hover:shadow-accent/10 transition-all duration-300 backdrop-blur-sm border border-slate-700 hover:border-accent/50"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden h-48">
        <div className="absolute top-3 right-3 z-10">
          <Badge variant={project.type === 'lovable' ? "default" : "outline"} className="capitalize">
            {project.type}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3 z-10">
          <Badge variant={project.status === 'completed' ? "default" : "secondary"} className="capitalize bg-slate-900/80 text-white">
            {project.status}
          </Badge>
        </div>
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <Star className="text-yellow-400" size={18} />
        </div>
        <p className="text-white/70 mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-slate-700/70 hover:bg-slate-600 text-white">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          {project.demoUrl && (
            <Button asChild size="sm" variant="default" className="bg-accent hover:bg-accent/80">
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                <ExternalLink size={16} /> Demo
              </a>
            </Button>
          )}
          <Button asChild size="sm" variant="outline" className="text-white border-white hover:bg-white/10">
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
