
import React from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { type Project } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { toast } = useToast();
  
  // Determine if the project is a GitHub project
  const isGithubProject = project.type === 'github';
  
  // For non-GitHub projects, determine if demo is available
  const isDemoAvailable = !isGithubProject && project.demoUrl && !project.demoUrl.includes('resume.butterflybluecreations.com');
  
  // Check if the project has a web preview URL
  const hasWebPreview = !isGithubProject && project.webPreviewUrl && project.webPreviewUrl.length > 0;

  return (
    <Card className="group bg-slate-800/60 rounded-lg overflow-hidden shadow-xl hover:shadow-accent/10 transition-all duration-300 backdrop-blur-sm border border-slate-700 hover:border-accent/50 h-full flex flex-col">
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
        
        {(isDemoAvailable || hasWebPreview) && !isGithubProject && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button asChild size="sm" variant="default" className="bg-accent/90 hover:bg-accent">
              <a 
                href={hasWebPreview ? project.webPreviewUrl : project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2"
              >
                <Play size={16} /> {project.status === 'in-progress' ? 'Web Preview' : 'Live Demo'}
              </a>
            </Button>
          </div>
        )}
      </div>
      
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-xl font-bold text-white">{project.title}</CardTitle>
        <CardDescription className="text-white/70 line-clamp-3">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 flex-grow">
        <div className="flex flex-wrap gap-2 mt-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-slate-700/70 hover:bg-slate-600 text-white text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {isGithubProject ? (
          <div className="w-full text-center py-2 px-3 bg-slate-700/60 rounded-md border border-slate-600">
            <p className="text-white/70 text-sm italic">Code is still baking - Dev in progress</p>
          </div>
        ) : (
          (isDemoAvailable || hasWebPreview) && (
            <Button 
              asChild={true} 
              size="sm" 
              variant="default" 
              className="bg-accent hover:bg-accent/80 w-full"
            >
              <a href={hasWebPreview ? project.webPreviewUrl : project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                <ExternalLink size={14} /> 
                {project.status === 'in-progress' ? "Web Preview" : "View Project"}
              </a>
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
