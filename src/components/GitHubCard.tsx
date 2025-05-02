
import React from 'react';
import { Github, GitBranch, Clock } from 'lucide-react';
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

interface GitHubCardProps {
  project: Project;
  index: number;
}

const GitHubCard: React.FC<GitHubCardProps> = ({ project, index }) => {
  return (
    <Card className="group bg-slate-800/60 rounded-lg overflow-hidden shadow-xl hover:shadow-accent/10 transition-all duration-300 backdrop-blur-sm border border-slate-700 hover:border-accent/50 h-full flex flex-col">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Github size={18} className="text-white" />
            <CardTitle className="text-xl font-bold text-white">{project.title}</CardTitle>
          </div>
          <Badge variant={project.status === 'completed' ? "default" : "secondary"} className="capitalize bg-slate-900/80 text-white">
            {project.status}
          </Badge>
        </div>
        <CardDescription className="text-white/70">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 flex-grow">
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-slate-700/70 hover:bg-slate-600 text-white text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="text-white/70 text-sm">
          <p className="flex items-center gap-1 mb-2">
            <Clock size={14} /> 
            <span>Status: {project.status === 'completed' ? 'Stable' : 'In Development'}</span>
          </p>
          
          {project.readmeSummary && (
            <div className="mt-3 p-3 bg-slate-900/60 rounded-md border border-slate-700">
              <h4 className="text-sm font-medium mb-1 text-white/90">README Summary:</h4>
              <p className="text-xs text-white/70">{project.readmeSummary}</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          asChild={true} 
          size="sm" 
          variant="default" 
          className="bg-slate-700 hover:bg-slate-600 w-full"
        >
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
            <Github size={14} /> 
            View on GitHub
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GitHubCard;
